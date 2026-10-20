export function createPageUrl(pageName: string): string {
  const pageRoutes: Record<string, string> = {
    'Subscribe': '/subscribe',
    'ResearchFeed': '/research',
    'Categories': '/categories',
    'About': '/about',
  };
  return pageRoutes[pageName] || '/';
}
