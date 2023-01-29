import { cartApi } from "@/apis/apis";
import { ProductInCart } from "@/apis/contracts/cartContract";
import { AdminLayout } from "@/components/layout/AdminLayout";
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

  return (
    <AdminLayout>
      <div className="flex flex-col gap-5 justify-center mt-24">
        <div className="self-stretch">
          <table className="w-full">
            <thead>
              <Tr className="flex flex-row">
                <Th className="w-24">Id</Th>
                <Th className="flex-1">Product Name</Th>
                <Th className="w-36">Price</Th>
                <Th className="w-36">Discount %</Th>
                <Th className="w-36">Discount</Th>
                <Th className="w-36">Quantity</Th>
                <Th className="w-36">Total</Th>
              </Tr>
            </thead>
            <tbody className="w-full">
              {(cartsQuery.data?.body?.products ?? productsLoading).map(
                (product) => (
                  <Tr key={product.id} className="flex flex-row">
                    <Td className="w-24">{product.id}</Td>
                    <Td className="flex-1">{product.title}</Td>
                    <Td className="w-36">{product.price}</Td>
                    <Td className="w-36">{product.discountPercentage}</Td>
                    <Td className="w-36">{product.discountedPrice}</Td>
                    <Td className="w-36">{product.quantity}</Td>
                    <Td className="w-36">{product.total}</Td>
                  </Tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
