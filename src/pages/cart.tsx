import { cartApi } from "@/apis/apis";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { EventPager } from "@/components/ui/Pagination";
import { Td, Th, Tr } from "@/components/ui/Table";
import { useRouter } from "next/router";

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

  const cartsQuery = cartApi.getAllCarts.useQuery(["carts", page, count], {
    query: {
      limit: count,
      skip: (page - 1) * count,
    },
  });

  return (
    <AdminLayout>
      <div className="flex flex-col gap-5 justify-center items-center mt-16">
        <div className="w-full">
          <table className="w-full">
            <thead>
              <Tr className="flex flex-row">
                <Th className="w-24 text-center">Id</Th>
                <Th className="flex-1 text-center">User Id</Th>
                <Th className="flex-1 text-center">Discounted Total</Th>
                <Th className="flex-1 text-center">Total Products</Th>
                <Th className="flex-1 text-center">Total Quantity</Th>
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
                  <Td className="w-24 text-center">{cart.id}</Td>
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
            router.push(`/cart?page=${page}`);
          }}
        />
      </div>
    </AdminLayout>
  );
}
