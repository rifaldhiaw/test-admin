import { productApi } from "@/apis/apis";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useRouter } from "next/router";

export const CategoriesSelect = () => {
  const categoriesQuery = productApi.getCategories.useQuery(["categories"]);
  const router = useRouter();

  return (
    <Select
      value={router.query.category as string}
      onValueChange={(value) => {
        router.push({
          pathname: "/product",
          query: {
            ...router.query,
            category: value,
            page: 1,
          },
        });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="">All</SelectItem>
          {categoriesQuery.data?.body.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
