"use client";

import { Input, InputProps } from "@heroui/input";
import { IconSearch } from "@tabler/icons-react";
import _ from "lodash";

import { useSearchQueryParams } from "@/hooks/utils/useSearchQueryParams";

function SearchInput(props: InputProps) {
  const { setSearch } = useSearchQueryParams();
  const handleSearch = _.debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value !== "") {
        setSearch(event.target.value);
      } else {
        setSearch(null);
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
      placeholder="Buscar por nombre, categoria..."
      variant="bordered"
      onChange={handleSearch}
      {...props}
    />
  );
}

export default SearchInput;
