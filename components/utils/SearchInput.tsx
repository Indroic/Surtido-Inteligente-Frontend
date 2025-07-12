"use client";

import { Input, InputProps } from "@heroui/input";
import { IconSearch } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import _ from "lodash";

import createQueryString from "@/helpers/createQueryString";

function SearchInput(props: InputProps) {
  const pathName = usePathname();
  const router = useRouter();

  const handleSearch = _.debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = createQueryString({
        search: event.target.value,
      });

      router.push(`${pathName}?${newQuery}`);
    },
    300,
  );

  return (
    <Input
      className="flex w-full"
      endContent={<IconSearch />}
      name="search"
      placeholder="Buscar por nombre, categoria..."
      variant="bordered"
      onChange={handleSearch}
      {...props}
    />
  );
}

export default SearchInput;
