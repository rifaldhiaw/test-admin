import { productApi } from "@/apis/apis";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { EventPager } from "@/components/ui/Pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Td, Th, Tr } from "@/components/ui/Table";
import { useRouter } from "next/router";

const count = 10;

const productsLoading = Array.from({ length: count }, (_, i) => ({
  id: i,
  title: "...",
  brand: "...",
  price: "...",
  stock: "...",
  category: "...",
}));

export default function ProductPage() {
  const router = useRouter();

  const page = Number(router.query.page) || 1;

  const brand = router.query.brand as string;
  const category = router.query.category as string;
  const minPrice = Number(router.query.minPrice) || 0;
  const maxPrice = Number(router.query.maxPrice) || 1000000;
  const q = router.query.q as string;

  const productsQuery = productApi.getProducts.useQuery(
    ["products", page, count, brand, category, minPrice, maxPrice, q],
    {
      query: {
        brand,
        category,
        minPrice: minPrice.toString(),
        maxPrice: maxPrice.toString(),
        q,
        limit: count.toString(),
        skip: ((page - 1) * count).toString(),
      },
    }
  );

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push({
        pathname: "/product",
        query: {
          q: e.currentTarget.value,
        },
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-5 items-center mt-12">
        <div className="self-stretch flex flex-row justify-between">
          <div className="grid gap-1.5">
            <Label>Search</Label>
            <Input className="w-48" onKeyDown={onSearch} />
          </div>

          {/* right content */}
          <div className="flex flex-row gap-3">
            <div className="grid gap-1.5">
              <Label>Price Range</Label>
              <Button variant="outline">100-10000</Button>
            </div>
            <div className="grid gap-1.5">
              <Label>Brand</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label>Category</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="self-stretch">
          <table className="w-full">
            <thead>
              <Tr className="flex flex-row">
                <Th className="flex-1">Product Name</Th>
                <Th className="flex-1">Brand</Th>
                <Th className="w-24">Price</Th>
                <Th className="w-24">Stock</Th>
                <Th className="w-48">Category</Th>
              </Tr>
            </thead>
            <tbody>
              {(productsQuery.data?.body.products ?? productsLoading).map(
                (product) => (
                  <Tr key={product.id} className="flex flex-row">
                    <Td className="flex-1">{product.title}</Td>
                    <Td className="flex-1">{product.brand}</Td>
                    <Td className="w-24">{product.price}</Td>
                    <Td className="w-24">{product.stock}</Td>
                    <Td className="w-48">{product.category}</Td>
                  </Tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <EventPager
          count={Math.ceil((productsQuery.data?.body.total ?? 0) / count)}
          page={page}
          onChange={(e, page) => {
            router.push({
              pathname: "/product",
              query: {
                ...router.query,
                page,
              },
            });
          }}
        />
      </div>
    </AdminLayout>
  );
}
