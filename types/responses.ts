export interface ResponseInterface {
  status: number;
  data: any;
}

export interface NextPaginationInterface {
  limit: number | null;
  offset: number | null;
}
//esta es la interfaz de paginacion que devuelve Django Rest
export interface PaginationResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

//Esta es la interfaz que se usa en el frontend al momento de procesar la interfaz de django
export interface PaginationInterface<T> {
  count: number;
  next: NextPaginationInterface | null;
  previous: NextPaginationInterface | null;
  results: T[];
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  limit: number;
  offset: number;
}
