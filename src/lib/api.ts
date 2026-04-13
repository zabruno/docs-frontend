// API client for backend - server-side data fetching
const API = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080/api';

export interface Section {
  id: string;
  name: string;
  position: number;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  section: Section | null;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult {
  id: string;
  title: string;
  slug: string;
  snippet: string;
}

export async function getSections(): Promise<Section[]> {
  const res = await fetch(`${API}/sections`);
  if (!res.ok) throw new Error('Failed to fetch sections');
  return res.json();
}

export async function getTags(): Promise<Tag[]> {
  const res = await fetch(`${API}/tags`);
  if (!res.ok) throw new Error('Failed to fetch tags');
  return res.json();
}

export async function getArticles(filters?: { sectionId?: string; tagId?: string }): Promise<Article[]> {
  let url = `${API}/articles`;
  const params = new URLSearchParams();
  
  if (filters?.sectionId) {
    params.set('sectionId', filters.sectionId);
  }
  if (filters?.tagId) {
    params.set('tagId', filters.tagId);
  }
  
  if (params.toString()) {
    url += '?' + params.toString();
  }
  
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch articles');
  return res.json();
}

export async function getArticle(slug: string): Promise<Article> {
  const res = await fetch(`${API}/articles/${slug}`);
  if (!res.ok) throw new Error('Article not found');
  return res.json();
}

export async function searchArticles(q: string): Promise<SearchResult[]> {
  const res = await fetch(`${API}/articles/search?q=${encodeURIComponent(q)}&limit=10`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}
