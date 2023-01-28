import { cartApi } from "@/apis/apis";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { EventPager } from "@/components/ui/Pagination";
import { Td, Th, Tr } from "@/components/ui/Table";
import { useState } from "react";

const cartsLoading = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  userId: "...",
  discountedTotal: "...",
  totalProducts: "...",
  totalQuantity: "...",
}));

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

        <div className="w-full">
          <table className="w-full">
            <thead>
              <Tr className="flex flex-row">
                <Th className="flex-1 text-center">User Id</Th>
                <Th className="flex-1 text-center">Discounted Total</Th>
                <Th className="flex-1 text-center">Total Products</Th>
                <Th className="flex-1 text-center">Total Quantity</Th>
              </Tr>
            </thead>
            <tbody>
              {(cartsQuery.data?.body.carts ?? cartsLoading).map((cart) => (
                <Tr key={cart.id} className="flex flex-row">
                  <Td className="flex-1 text-center">{cart.userId}</Td>
                  <Td className="flex-1 text-center">{cart.discountedTotal}</Td>
                  <Td className="flex-1 text-center">{cart.totalProducts}</Td>
                  <Td className="flex-1 text-center">{cart.totalQuantity}</Td>
                </Tr>
              ))}
            </tbody>
          </table>
        </div>

        <EventPager
          count={Math.ceil((cartsQuery.data?.body.total ?? 0) / count)}
          page={page}
          onChange={(e, page) => {
            setPage(page);
          }}
        />
      </div>
    </AdminLayout>
  );
}
