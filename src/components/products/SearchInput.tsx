import { Input } from "@/components/ui/Input";
import { useRouter } from "next/router";
import { useState } from "react";

// search input component
export const SearchInput = () => {
  const router = useRouter();
  const [search, setSearch] = useState(router.query.search as string);

  const submit = () => {
    router.push({
      pathname: "/products",
      query: {
        ...router.query,
        search: search,
        page: 1,
      },
    });
  };

  return (
    <Input
      data-testid="search-input"
      className="w-48"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          submit();
        }
      }}
      onBlur={submit}
    />
  );
};
