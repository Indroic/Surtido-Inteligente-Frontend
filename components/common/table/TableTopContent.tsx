import React from "react";

import PaginateComponent from "@/components/utils/PaginateComponent";
import SearchInput from "@/components/utils/SearchInput";
import { PaginationController, SearchController } from "@/types/list";

type TableTopContentProps = {
  page: number;
  totalPages: number;
  searchPlaceholder?: string;
  searchController?: SearchController;
  paginationController?: PaginationController;
};

export default function TableTopContent({
  page,
  totalPages,
  searchPlaceholder,
  searchController,
  paginationController,
}: TableTopContentProps) {
  return (
    <div className="flex flex-col md:flex-row  max-w-full gap-2 items-center justify-between">
      <SearchInput
        placeholder={searchPlaceholder}
        searchController={searchController}
      />
      <PaginateComponent
        page={page}
        paginationController={paginationController}
        totalPages={totalPages}
      />
    </div>
  );
}
