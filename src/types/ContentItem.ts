export interface ContentItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  category: string;
  source: string;
  publishedAt: string;
  type: 'news' | 'movie' | 'social' | 'music' | 'video' | 'crypto' | 'tech';
}
