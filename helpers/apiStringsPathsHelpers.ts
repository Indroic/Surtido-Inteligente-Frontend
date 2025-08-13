export const addIDQuery: (url: string, id: string) => string = (
  url: string,
  id: string,
) => `${url}?id=${id}`;

export const addGetStatsQuery: (url: string, get?: boolean) => string = (
  url: string,
  get: boolean = true,
) => (get ? `${url}?getstats=true` : `${url}?getstats=false`);
