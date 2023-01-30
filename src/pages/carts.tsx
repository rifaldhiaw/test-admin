import { cartApi } from "@/apis/apis";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { EventPager } from "@/components/ui/Pagination";
import { Td, Th, Tr } from "@/components/ui/Table";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { useState } from "react";

const count = 10;
const cartsLoading = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  userId: "Loading...",
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
      <section className={cn("overflow-x-auto", "md:mt-6 lg:mt-12")}>
        <table className="w-full">
          <thead>
            <Tr className="flex flex-row">
              <Th className="flex items-center w-12 md:w-24">Id</Th>
              <Th className="flex items-center w-24 md:flex-1">User Id</Th>
              <Th className="flex items-center w-32 md:flex-1">
                Discounted Total
              </Th>
              <Th className="flex items-center flex-1">Total Products</Th>
              <Th className="flex items-center flex-1">Total Quantity</Th>
            </Tr>
          </thead>
          <tbody>
            {(cartsQuery.data?.body.carts ?? cartsLoading).map((cart) => (
              <Tr
                key={cart.id}
                className="flex flex-row cursor-pointer"
                onClick={() => {
                  router.push(`/carts/${cart.id}`);
                }}
              >
                <Td className="w-12 md:w-24">{cart.id}</Td>
                <Td className="w-24 md:flex-1">{cart.userId}</Td>
                <Td className="w-32 md:flex-1">{cart.discountedTotal}</Td>
                <Td className="flex-1">{cart.totalProducts}</Td>
                <Td className="flex-1">{cart.totalQuantity}</Td>
              </Tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="flex justify-center mt-4">
        <EventPager
          count={totalItems}
          page={page}
          onChange={(e, page) => {
            router.push(`/carts?page=${page}`);
          }}
        />
      </section>
    </AdminLayout>
  );
}
