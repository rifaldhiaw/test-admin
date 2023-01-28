import { productApi } from "@/apis/apis";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Input } from "@/components/ui/Input";
import { EventPager } from "@/components/ui/Pagination";
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
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-4xl">Product Page</h1>

        <div className="self-end">
          <Input onKeyDown={onSearch} />
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
