import React from "react";

import PaginateComponent from "@/components/utils/PaginateComponent";
import SearchInput from "@/components/utils/SearchInput";

type TableTopContentProps = {
  page: number;
  totalPages: number;
};

export default function TableTopContent({
  page,
  totalPages,
}: TableTopContentProps) {
  return (
    <div className="flex flex-col md:flex-row  max-w-full gap-2 items-center justify-between">
      <SearchInput />
      <PaginateComponent page={page} totalPages={totalPages} />
    </div>
  );
}
