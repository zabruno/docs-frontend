// Pipeline de procesamiento de Markdown
//usa remark para parsear y rehype para generar HTML
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';

// Schema de sanitizacion - permite tags necesarios para docs
const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    'img'
  ],
  attributes: {
    ...defaultSchema.attributes,
    '*': [...(defaultSchema.attributes?.['*'] || []), 'class', 'id'],
    a: ['href', 'title'],
    img: ['src', 'alt', 'title'],
    code: ['class'],
    pre: ['class'],
    span: ['class'],
  },
};

// Parser unificado: Markdown -> HTML seguro con highlighting
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSanitize, sanitizeSchema)
  .use(rehypeSlug)
  .use(rehypeShiki, { theme: 'github-light' })
  .use(rehypeStringify);

// Procesar markdown a HTML
export async function parseMarkdown(content: string): Promise<string> {
  const result = await processor.process(content);
  return String(result);
}

// Extraer headings del HTML renderizado para TOC
export function extractHeadings(html: string) {
  const regex = /<h([1-3])[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;
  const headings: { level: number; id: string; text: string }[] = [];
  
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, ''),
    });
  }
  
  return headings;
}

// Envolver tablas en contenedor scrollable para mobile
export function wrapTables(html: string): string {
  return html.replace(/<table>/g, '<div class="table-wrapper"><table>').replace(/<\/table>/g, '</table></div>');
}
