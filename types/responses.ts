export interface ResponseInterface {
  status: number;
  data: any;
}

export interface PaginationInterface {
  count: number;
  next: string;
  previous: string;
  results: any[];
}
