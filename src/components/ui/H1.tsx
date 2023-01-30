import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type H1Props = PropsWithChildren<{
  className?: string;
}>;

export const H1 = (props: H1Props) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        props.className
      )}
    >
      {props.children}
    </h1>
  );
};
