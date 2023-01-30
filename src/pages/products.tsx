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
  title: "Loading...",
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
      <div className="gap-5 items-center md:mt-6 lg:mt-12">
        {/* filter section */}
        <section className="w-full flex flex-col lg:flex-row gap-3 justify-between">
          <div className="grid gap-1.5">
            <Label>Search</Label>
            <SearchInput />
          </div>

          <div className="flex items-stretch flex-col md:flex-row gap-3">
            <div className="flex gap-3 md:w-32 lg:w-64 md:flex-auto">
              <div className="flex-1 grid gap-1.5">
                <Label>Min Price</Label>
                <MinPriceInput />
              </div>
              <div className="flex-1 grid gap-1.5">
                <Label>Max Price</Label>
                <MaxPriceInput />
              </div>
            </div>

            <div className="flex gap-3 md:w-64 lg:w-96 flex-auto">
              <div className="flex-1 grid gap-1.5">
                <Label>Brand</Label>
                <BrandsSelect />
              </div>
              <div className="flex-1 grid gap-1.5">
                <Label>Category</Label>
                <CategoriesSelect />
              </div>
            </div>
          </div>
        </section>

        {/* table section */}
        <section className="block mt-8 overflow-x-auto">
          <table className="w-full">
            <thead>
              <Tr className="flex flex-row">
                <Th className="w-64 flex-auto">Product Name</Th>
                <Th className="w-64 flex-auto">Brand</Th>
                <Th className="w-20">Price</Th>
                <Th className="w-20">Stock</Th>
                <Th className="w-52">Category</Th>
              </Tr>
            </thead>
            <tbody>
              {(productsQuery.data?.body.products ?? productsLoading).map(
                (product) => (
                  <Tr key={product.id} className="flex flex-row">
                    <Td className="w-64 flex-auto">{product.title}</Td>
                    <Td className="w-64 flex-auto">{product.brand}</Td>
                    <Td className="w-20">{product.price}</Td>
                    <Td className="w-20">{product.stock}</Td>
                    <Td className="w-52">{product.category}</Td>
                  </Tr>
                )
              )}
            </tbody>
          </table>
        </section>

        <section className="flex justify-center mt-4">
          <EventPager
            count={totalItems}
            page={page}
            onChange={(e, page) => {
              router.push({
                pathname: "/products",
                query: {
                  ...router.query,
                  page,
                },
              });
            }}
          />
        </section>
      </div>
    </AdminLayout>
  );
}
