"use client";

import { Input, InputProps } from "@heroui/input";
import { IconSearch } from "@tabler/icons-react";
import _ from "lodash";
import { useRef } from "react";

import { SearchController } from "@/types/list";
import useDefaultSearchListController from "@/hooks/controllers/common/list/useDefaultSearchListController";

export type Props = {
  searchController?: SearchController;
} & InputProps;

function SearchInput({
  searchController = useDefaultSearchListController,
  ...props
}: Props) {
  const refSearchController = useRef(searchController);
  const { setSearch } = refSearchController.current();
  const handleSearch = _.debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value !== "") {
        setSearch(event.target.value);
      } else {
        setSearch("");
      }
    },
    300,
  );

  return (
    <Input
      className="flex w-full"
      color="primary"
      endContent={<IconSearch className="text-default-400" />}
      name="search"
      variant="bordered"
      onChange={handleSearch}
      {...props}
    />
  );
}

export default SearchInput;
