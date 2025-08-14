import { useMemo, useRef } from "react";
import useSWR from "swr";

import { PaginationInterface } from "@/types/responses";
import { PaginationController, SearchController } from "@/types/list";
import useDefaultSearchListController from "@/hooks/controllers/common/list/useDefaultSearchListController";
import useDefaultPaginationListController from "@/hooks/controllers/common/list/useDefaultPaginationListController";

type UseListProps<TEntity> = {
  apiPath?: string;
  items?: TEntity[];
  searchController?: SearchController;
  paginationController?: PaginationController;
};

export default function useList<TEntity extends object>({
  apiPath,
  items,
  searchController = useDefaultSearchListController,
  paginationController = useDefaultPaginationListController,
}: UseListProps<TEntity>) {
  const refSearchController = useRef(searchController);
  const { search, searchKey } = refSearchController.current();
  const refPaginationController = useRef(paginationController);
  const { limit, limitKey, offset, offsetKey } =
    refPaginationController.current();

  const isLocal = !!items;

  // --- Lógica para datos remotos (API) ---
  const swrKey =
    !isLocal && apiPath
      ? `${apiPath}?${limitKey}=${limit}&${offsetKey}=${offset}&${
          search ? `${searchKey}=${search}` : ""
        }`
      : null;

  const {
    data: remoteData,
    isLoading: remoteIsLoading,
    mutate,
  } = useSWR<PaginationInterface<TEntity>>(swrKey, {
    keepPreviousData: true,
  });

  // --- Lógica para datos locales (props) ---
  const localData = useMemo(() => {
    if (!isLocal || !items) return undefined;

    // 1. Filtrar por término de búsqueda
    const filteredItems = search
      ? items.filter((item) =>
          Object.values(item).some(
            (value) =>
              value &&
              String(value).toLowerCase().includes(search.toLowerCase()),
          ),
        )
      : items;

    const count = filteredItems.length;

    // 2. Paginar los resultados filtrados
    const totalPages = limit > 0 ? Math.ceil(count / limit) : 1;
    const page = limit > 0 ? Math.floor(offset / limit) + 1 : 1;
    const paginatedItems =
      limit > 0 ? filteredItems.slice(offset, offset + limit) : filteredItems;

    return {
      results: paginatedItems,
      count,
      page,
      totalPages,
      limit: limit || count,
      offset,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
      next: page < totalPages ? { limit, offset: offset + limit } : null,
      previous:
        page > 1 ? { limit, offset: Math.max(0, offset - limit) } : null,
    } as PaginationInterface<TEntity>;
  }, [isLocal, items, search, limit, offset]);

  // --- Unificar y devolver ---
  const data = isLocal ? localData : remoteData;
  const isLoading = !isLocal ? remoteIsLoading : false;

  const totalPages = data?.totalPages || 0;
  const page = data?.page || 1;

  return {
    data,
    isLoading,
    totalPages,
    page,
    search,
    mutate,
  };
}
