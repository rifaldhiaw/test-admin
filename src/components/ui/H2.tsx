import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type H2Props = PropsWithChildren<{
  className?: string;
}>;

export const H2 = (props: H2Props) => {
  return (
    <h2
      className={cn(
        "mt-8 mb-4 scroll-m-20 text-2xl font-semibold tracking-tight",
        props.className
      )}
    >
      {props.children}
    </h2>
  );
};
