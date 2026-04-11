// API client for backend - solo uso en server-side
const API = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080/api';

export interface ArticleResponse {
  id: string;
  title: string;
  slug: string;
  content: string;
  section: string | null;
  tags: string[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult {
  id: string;
  title: string;
  slug: string;
  snippet: string;
}

// Obtener todos los articulos
export async function getArticles(): Promise<ArticleResponse[]> {
  const res = await fetch(`${API}/articles`);
  if (!res.ok) throw new Error('Failed to fetch articles');
  return res.json();
}

// Obtener un articulo por slug
export async function getArticle(slug: string): Promise<ArticleResponse> {
  const res = await fetch(`${API}/articles/${slug}`);
  if (!res.ok) throw new Error('Article not found');
  return res.json();
}

// Obtener todas las secciones
export async function getSections(): Promise<string[]> {
  const res = await fetch(`${API}/sections`);
  if (!res.ok) throw new Error('Failed to fetch sections');
  return res.json();
}

// Obtener articulos por seccion
export async function getArticlesBySection(section: string): Promise<ArticleResponse[]> {
  const articles = await getArticles();
  return articles.filter(a => a.section === section);
}

// Buscar articulos
export async function searchArticles(q: string): Promise<SearchResult[]> {
  const res = await fetch(`${API}/articles/search?q=${encodeURIComponent(q)}&limit=10`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}
