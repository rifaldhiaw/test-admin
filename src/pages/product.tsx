import { productApi } from "@/apis/apis";
import { EventPager } from "@/components/ui/Pagination";
import { Td, Tr } from "@/components/ui/Table";
import { useState } from "react";

export default function ProductPage() {
  const [page, setPage] = useState(1);
  const [count, _setCount] = useState(10);

  const productsQuery = productApi.getAllProducts.useQuery(
    ["products", page, count],
    {
      query: {
        limit: count,
        skip: (page - 1) * count,
      },
    }
  );

  return (
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
        count={productsQuery.data?.body.total ?? 0}
        page={page}
        onChange={(e, page) => {
          setPage(page);
        }}
      />
    </div>
  );
}
