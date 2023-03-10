import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type H3Props = PropsWithChildren<{
  className?: string;
}>;

export const H3 = (props: H3Props) => {
  return (
    <h3
      className={cn(
        "mt-8 mb-4 scroll-m-20 text-lg font-semibold tracking-tight",
        props.className
      )}
    >
      {props.children}
    </h3>
  );
};
