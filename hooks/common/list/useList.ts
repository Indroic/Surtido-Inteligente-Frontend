import useSWR from "swr";

import usePaginationQueryParams from "@/hooks/utils/usePaginationQueryParams";
import { useSearchQueryParams } from "@/hooks/utils/useSearchQueryParams";
import { PaginationInterface } from "@/types/responses";

type UseListProps = {
  apiPath: string;
};

export default function useList<TEntity>({ apiPath }: UseListProps) {
  const { search } = useSearchQueryParams();
  const { offset, limit } = usePaginationQueryParams();

  const swrKey = `${apiPath}?limit=${limit}&offset=${offset}&${
    search ? `search=${search}` : ""
  }`;

  const { data, isLoading } = useSWR<PaginationInterface<TEntity>>(swrKey, {
    keepPreviousData: true,
  });

  const totalPages = data?.totalPages || 0;
  const page = data?.page || 1;

  return {
    data,
    isLoading,
    totalPages,
    page,
    search,
  };
}
