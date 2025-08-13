import { useInfiniteScroll as HeroUiUseInfiniteScroll } from "@heroui/use-infinite-scroll";
import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";

import { BaseInterface } from "@/types/bases";
import { PaginationInterface } from "@/types/responses";

export default function useInfiniteScroll<T extends BaseInterface>({
  Enabled,
  url,
}: {
  Enabled: boolean;
  url: string;
}) {
  const selectItemsLimit = 10;

  const getKey = (
    pageIndex: number,
    previousPageData: PaginationInterface<T> | null,
  ) => {
    if (!Enabled) return null;
    if (previousPageData && !previousPageData.next) return null;

    const offset = pageIndex * selectItemsLimit;

    return `${url}?limit=${selectItemsLimit}&offset=${offset}`;
  };

  const { data, isLoading, size, setSize } = useSWRInfinite<
    PaginationInterface<T>
  >(getKey, {
    revalidateFirstPage: false,
    keepPreviousData: true,
  });

  const items = useMemo(() => {
    if (!data) return [];

    const allItems = data.flatMap((page) => page.results);

    const uniqueItems: T[] = [];
    const seenIds = new Set();

    for (const item of allItems) {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        uniqueItems.push(item);
      }
    }

    return uniqueItems;
  }, [data]);

  const hasMore = data ? !!data[data.length - 1]?.next : true;

  const [, scrollerRef] = HeroUiUseInfiniteScroll({
    hasMore,
    isEnabled: Enabled,
    shouldUseLoader: false,
    onLoadMore: () => !isLoading && setSize(size + 1),
  });

  return { items, loading: isLoading, scrollerRef };
}
