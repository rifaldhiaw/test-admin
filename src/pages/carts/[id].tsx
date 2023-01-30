import { cartApi, userApi } from "@/apis/apis";
import { ProductInCart } from "@/apis/contracts/cartContract";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { H3 } from "@/components/ui/H3";
import { H4 } from "@/components/ui/H4";
import { Td, Th, Tr } from "@/components/ui/Table";
import { useRouter } from "next/router";

const count = 5;

const productsLoading: ProductInCart[] = Array.from(
  { length: count },
  (_, i) => ({
    id: i,
    title: "...",
    price: 0,
    discountedPrice: 0,
    discountPercentage: 0,
    quantity: 0,
    total: 0,
  })
);

export default function CartDetailPage() {
  const router = useRouter();

  const cartId = router.query.id as string;
  const cartsQuery = cartApi.getCartById.useQuery(["carts", "detail", cartId], {
    params: {
      id: cartId,
    },
  });

  const userQuery = userApi.getUserById.useQuery(
    ["users", cartsQuery.data?.body?.userId],
    {
      params: {
        id: cartsQuery.data?.body?.userId.toString() ?? "",
      },
    },
    {
      enabled: !!cartsQuery.data?.body?.userId,
    }
  );

  const userFullName = `${userQuery.data?.body?.firstName ?? ""} ${
    userQuery.data?.body?.lastName ?? ""
  }`;

  const detailData = [
    {
      label: "User",
      value: userQuery.isSuccess ? userFullName : "...",
    },
    {
      label: "# of items",
      value: cartsQuery.data?.body?.totalQuantity ?? "...",
    },
    {
      label: "Added On",
      value: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    {
      label: "Total",
      value: cartsQuery.data?.body?.total ?? "...",
    },
  ];

  return (
    <AdminLayout>
      <H3>Cart {cartId}</H3>

      {/* detail section */}
      <section>
        <H4>Details</H4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-12 py-4 bg-slate-100 rounded-xl">
          {detailData.map((item) => (
            <div key={item.label} className="flex">
              <div className="w-1/3 font-semibold">{item.label}</div>
              <div className="w-2/3">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* products section */}
      <section>
        <H4>Products</H4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <Tr className="flex flex-row">
                <Th className="w-14">Id</Th>
                <Th className="w-72 flex-auto">Product Name</Th>
                <Th className="w-24 flex-auto">Price</Th>
                <Th className="w-32 flex-auto">Discount %</Th>
                <Th className="w-24 flex-auto">Discount</Th>
                <Th className="w-24 flex-auto">Quantity</Th>
                <Th className="w-24 flex-auto">Total</Th>
              </Tr>
            </thead>
            <tbody className="w-full">
              {(cartsQuery.data?.body?.products ?? productsLoading).map(
                (product) => (
                  <Tr key={product.id} className="flex flex-row">
                    <Td className="w-14">{product.id}</Td>
                    <Td className="w-72 flex-auto">{product.title}</Td>
                    <Td className="w-24 flex-auto">{product.price}</Td>
                    <Td className="w-32 flex-auto">
                      {product.discountPercentage}
                    </Td>
                    <Td className="w-24 flex-auto">
                      {product.discountedPrice}
                    </Td>
                    <Td className="w-24 flex-auto">{product.quantity}</Td>
                    <Td className="w-24 flex-auto">{product.total}</Td>
                  </Tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="h-12"></div>
    </AdminLayout>
  );
}
