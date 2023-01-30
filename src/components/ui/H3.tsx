import { PropsWithChildren } from "react";

export const H3 = (props: PropsWithChildren<{}>) => {
  return (
    <h3 className="mt-8 mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
      {props.children}
    </h3>
  );
};
