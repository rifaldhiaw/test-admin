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
          pathname: "/products",
          query: {
            ...router.query,
            category: value,
            page: 1,
          },
        });
      }}
    >
      <SelectTrigger
        data-testid="categories-select"
        disabled={categoriesQuery.isLoading}
        className="w-[180px]"
      >
        <SelectValue
          placeholder={
            categoriesQuery.isLoading ? "Loading..." : "Select a category"
          }
        />
      </SelectTrigger>
      <SelectContent data-testid="categories-select-content">
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
