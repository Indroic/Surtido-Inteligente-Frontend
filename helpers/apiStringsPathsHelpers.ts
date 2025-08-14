export const addIDQuery: (url: string, id: string, key?: string) => string = (
  url: string,
  id: string,
  key: string = "id",
) => `${url}?${key}=${id}`;

export const addGetStatsQuery: (url: string, get?: boolean) => string = (
  url: string,
  get: boolean = true,
) => (get ? `${url}?getstats=true` : `${url}?getstats=false`);
