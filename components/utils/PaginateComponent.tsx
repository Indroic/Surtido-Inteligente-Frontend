import { Pagination } from "@heroui/pagination";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import createQueryString from "@/helpers/createQueryString";
type Props = {
  page: number;
  totalPages: number;
};

export default function PaginateComponent({ page, totalPages }: Props) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const handlePageChange = (page: number) => {
    let offset = (page - 1) * 10;
    const newQuery = createQueryString(searchParams, {
      offset: offset.toString(),
    });

    router.push(`${pathName}?${newQuery}`);
  };

  return totalPages > 0 ? (
    <div className="flex max-w-content justify-center">
      <Pagination
        isCompact
        loop
        showControls
        showShadow
        color="primary"
        initialPage={1}
        page={page}
        total={totalPages}
        onChange={handlePageChange}
      />
    </div>
  ) : null;
}
