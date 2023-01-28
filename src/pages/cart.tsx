import { cartApi } from "@/apis/apis";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { EventPager } from "@/components/ui/Pagination";
import { Td, Tr } from "@/components/ui/Table";
import { useState } from "react";

export default function CartPage() {
  const [page, setPage] = useState(1);
  const [count, _setCount] = useState(10);

  const cartsQuery = cartApi.getAllCarts.useQuery(["carts", page, count], {
    query: {
      limit: count,
      skip: (page - 1) * count,
    },
  });

  return (
    <AdminLayout>
      <div className="flex flex-col gap-5 justify-center items-center">
        <h1 className="text-4xl">Carts Page</h1>

        {cartsQuery.isLoading && <div>Loading...</div>}

        {cartsQuery.isError && (
          <div>Error: {JSON.stringify(cartsQuery.error.body)}</div>
        )}

        {cartsQuery.isSuccess && (
          <div>
            <table>
              <thead>
                <Tr>
                  <th>User Id</th>
                  <th>Discounted Total</th>
                  <th>Total Products</th>
                  <th>Total Quantity</th>
                </Tr>
              </thead>
              <tbody>
                {cartsQuery.data.body.carts.map((cart) => (
                  <Tr key={cart.id}>
                    <Td>{cart.userId}</Td>
                    <Td>{cart.discountedTotal}</Td>
                    <Td>{cart.totalProducts}</Td>
                    <Td>{cart.totalQuantity}</Td>
                  </Tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <EventPager
          count={(cartsQuery.data?.body.total ?? 0) / count}
          page={page}
          onChange={(e, page) => {
            setPage(page);
          }}
        />
      </div>
    </AdminLayout>
  );
}
