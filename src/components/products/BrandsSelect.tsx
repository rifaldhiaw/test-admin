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

export const BrandsSelect = () => {
  const brandsQuery = productApi.getBrands.useQuery(["brands"]);
  const router = useRouter();

  return (
    <Select
      value={router.query.brand as string}
      onValueChange={(value) => {
        router.push({
          pathname: "/products",
          query: {
            ...router.query,
            brand: value,
            page: 1,
          },
        });
      }}
    >
      <SelectTrigger
        data-testid="brands-select"
        disabled={brandsQuery.isLoading}
        className="w-[180px]"
      >
        <SelectValue
          placeholder={brandsQuery.isLoading ? "Loading..." : "Select a brand"}
        />
      </SelectTrigger>
      <SelectContent data-testid="brands-select-content">
        <SelectGroup>
          <SelectLabel>Brands</SelectLabel>
          <SelectItem value="">All</SelectItem>
          {brandsQuery.data?.body.map((brand) => (
            <SelectItem key={brand} value={brand}>
              {brand}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
