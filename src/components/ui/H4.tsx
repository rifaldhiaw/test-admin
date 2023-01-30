import { PropsWithChildren } from "react";

export const H4 = (props: PropsWithChildren<{}>) => {
  return (
    <h4 className="mt-8 mb-4 scroll-m-20 text-xl font-semibold tracking-tight">
      {props.children}
    </h4>
  );
};
