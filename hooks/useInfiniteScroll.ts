import { useInfiniteScroll as HeroUiUseInfiniteScroll } from "@heroui/use-infinite-scroll";
import { useCallback, useEffect, useState } from "react";

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
  const [items, setItems] = useState<T[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchMore = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${url}?offset=${offset}&limit=${selectItemsLimit}`,
      );
      const data: PaginationInterface<T> = await res.json();

      setItems((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const newItems = (data.results || []).filter(
          (item) => !existingIds.has(item.id),
        );

        return [...prev, ...newItems];
      });
      setHasMore(Boolean(data.next));
      setOffset((prev) => prev + selectItemsLimit);
    } finally {
      setLoading(false);
    }
  }, [offset]);

  const [, scrollerRef] = HeroUiUseInfiniteScroll({
    hasMore,
    isEnabled: Enabled,
    shouldUseLoader: false,
    onLoadMore: fetchMore,
  });

  useEffect(() => {
    fetchMore();
  }, []);

  return { items, loading, scrollerRef };
}
