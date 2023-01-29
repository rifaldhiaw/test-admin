import { Input } from "@/components/ui/Input";
import { useRouter } from "next/router";
import { useState } from "react";

export const MaxPriceInput = () => {
  const router = useRouter();
  const [maxPrice, setMaxPrice] = useState(router.query.maxPrice as string);

  const submit = () => {
    router.push({
      pathname: "/product",
      query: {
        ...router.query,
        maxPrice: maxPrice,
      },
    });
  };

  return (
    <Input
      className="w-24"
      type="number"
      value={maxPrice}
      onChange={(e) => setMaxPrice(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          submit();
        }
      }}
      onBlur={submit}
    />
  );
};
