import React from "react";

import PaginateComponent from "@/components/utils/PaginateComponent";
import SearchInput from "@/components/utils/SearchInput";

type TableTopContentProps = {
  page: number;
  totalPages: number;
  searchPlaceholder?: string;
};

export default function TableTopContent({
  page,
  totalPages,
  searchPlaceholder,
}: TableTopContentProps) {
  return (
    <div className="flex flex-col md:flex-row  max-w-full gap-2 items-center justify-between">
      <SearchInput placeholder={searchPlaceholder} />
      <PaginateComponent page={page} totalPages={totalPages} />
    </div>
  );
}
