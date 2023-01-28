import { productApi } from "@/apis/apis";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { EventPager } from "@/components/ui/Pagination";
import { Td, Tr } from "@/components/ui/Table";
import { useRouter } from "next/router";

export default function ProductPage() {
  const router = useRouter();

  const page = Number(router.query.page) || 1;
  const count = 10;

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

  return (
    <AdminLayout>
      <div className="flex flex-col gap-5 justify-center items-center">
        <h1 className="text-4xl">Product Page</h1>

        {productsQuery.isLoading && <div>Loading...</div>}

        {productsQuery.isError && (
          <div>Error: {JSON.stringify(productsQuery.error.body)}</div>
        )}

        {productsQuery.isSuccess && (
          <div>
            <table>
              <thead>
                <Tr>
                  <th>Product Name</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                </Tr>
              </thead>
              <tbody>
                {productsQuery.data.body.products.map((product) => (
                  <Tr key={product.id}>
                    <Td>{product.title}</Td>
                    <Td>{product.brand}</Td>
                    <Td>{product.price}</Td>
                    <Td>{product.stock}</Td>
                    <Td>{product.category}</Td>
                  </Tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <EventPager
          count={(productsQuery.data?.body.total ?? 0) / count}
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
