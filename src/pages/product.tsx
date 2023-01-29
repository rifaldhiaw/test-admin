import { productApi } from "@/apis/apis";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { BrandsSelect } from "@/components/products/BrandsSelect";
import { CategoriesSelect } from "@/components/products/CategoriesSelect";
import { MaxPriceInput } from "@/components/products/MaxPriceInput";
import { MinPriceInput } from "@/components/products/MinPriceInput";
import { SearchInput } from "@/components/products/SearchInput";
import { Label } from "@/components/ui/Label";
import { EventPager } from "@/components/ui/Pagination";
import { Td, Th, Tr } from "@/components/ui/Table";
import { useRouter } from "next/router";
import { useState } from "react";

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
  const search = router.query.search as string;

  const [totalItems, setTotalItems] = useState(0);

  const productsQuery = productApi.getProducts.useQuery(
    ["products", page, count, brand, category, minPrice, maxPrice, search],
    {
      query: {
        brand,
        category,
        minPrice: minPrice.toString(),
        maxPrice: maxPrice.toString(),
        search: search,
        limit: count.toString(),
        skip: ((page - 1) * count).toString(),
      },
    },
    {
      onSuccess: (data) => {
        setTotalItems(Math.ceil((data?.body.total ?? 0) / count));
      },
    }
  );

  return (
    <AdminLayout>
      <div className="flex flex-col gap-5 items-center mt-12">
        <div className="self-stretch flex flex-row justify-between">
          <div className="grid gap-1.5">
            <Label>Search</Label>
            <SearchInput />
          </div>

          {/* right content */}
          <div className="flex flex-row gap-3">
            <div className="grid gap-1.5">
              <Label>Min Price</Label>
              <MinPriceInput />
            </div>
            <div className="grid gap-1.5">
              <Label>Max Price</Label>
              <MaxPriceInput />
            </div>
            <div className="grid gap-1.5">
              <Label>Brand</Label>
              <BrandsSelect />
            </div>
            <div className="grid gap-1.5">
              <Label>Category</Label>
              <CategoriesSelect />
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
          count={totalItems}
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
