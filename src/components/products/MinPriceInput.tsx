import { Input } from "@/components/ui/Input";
import { useRouter } from "next/router";
import { useState } from "react";

export const MinPriceInput = () => {
  const router = useRouter();
  const [minPrice, setMinPrice] = useState(router.query.minPrice as string);

  const submit = () => {
    router.push({
      pathname: "/products",
      query: {
        ...router.query,
        minPrice: minPrice,
        page: 1,
      },
    });
  };

  return (
    <Input
      data-testid="min-price-input"
      className="w-24"
      type="number"
      value={minPrice}
      onChange={(e) => setMinPrice(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          submit();
        }
      }}
      onBlur={submit}
    />
  );
};
