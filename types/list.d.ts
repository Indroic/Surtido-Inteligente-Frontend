export type SearchControllerProps = {
  search?: string;
  setSearch: (value: string) => void;
  searchKey: string;
};

export type SearchController = () => SearchControllerProps;

export type PaginationControllerProps = {
  limit: number;
  offset: number;
  setLimit: (value: number) => void;
  setOffset: (value: number) => void;
  limitKey: string;
  offsetKey: string;
};

export type PaginationController = () => PaginationControllerProps;
