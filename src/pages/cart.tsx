import { cartApi } from "@/apis/apis";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { EventPager } from "@/components/ui/Pagination";
import { Td, Th, Tr } from "@/components/ui/Table";
import { useRouter } from "next/router";
import { useState } from "react";

const count = 10;
const cartsLoading = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  userId: "...",
  discountedTotal: "...",
  totalProducts: "...",
  totalQuantity: "...",
}));

export default function CartPage() {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const [totalItems, setTotalItems] = useState(0);

  const cartsQuery = cartApi.getAllCarts.useQuery(
    ["carts", page, count],
    {
      query: {
        limit: count,
        skip: (page - 1) * count,
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
      <div className="flex flex-col gap-5 items-center mt-16">
        <div className="w-full">
          <table className="w-full">
            <thead>
              <Tr className="flex flex-row">
                <Th className="w-24">Id</Th>
                <Th className="flex-1">User Id</Th>
                <Th className="flex-1">Discounted Total</Th>
                <Th className="flex-1">Total Products</Th>
                <Th className="flex-1">Total Quantity</Th>
              </Tr>
            </thead>
            <tbody>
              {(cartsQuery.data?.body.carts ?? cartsLoading).map((cart) => (
                <Tr
                  key={cart.id}
                  className="flex flex-row cursor-pointer"
                  onClick={() => {
                    router.push(`/cart/${cart.id}`);
                  }}
                >
                  <Td className="w-24">{cart.id}</Td>
                  <Td className="flex-1">{cart.userId}</Td>
                  <Td className="flex-1">{cart.discountedTotal}</Td>
                  <Td className="flex-1">{cart.totalProducts}</Td>
                  <Td className="flex-1">{cart.totalQuantity}</Td>
                </Tr>
              ))}
            </tbody>
          </table>
        </div>

        <EventPager
          count={totalItems}
          page={page}
          onChange={(e, page) => {
            router.push(`/cart?page=${page}`);
          }}
        />
      </div>
    </AdminLayout>
  );
}
