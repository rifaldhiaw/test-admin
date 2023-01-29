import { cn } from "@/lib/utils";

type TrProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLTableRowElement>;

const Tr = ({ children, ...props }: TrProps) => {
  const { className, ...rest } = props;
  return (
    <tr
      className={cn(
        "m-0 border-t border-slate-200 p-0 even:bg-slate-50 dark:border-slate-700 dark:even:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700",
        className
      )}
      {...rest}
    >
      {children}
    </tr>
  );
};

type ThProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLTableHeaderCellElement>;

const Th = ({ children, ...props }: ThProps) => {
  const { className, ...rest } = props;
  return (
    <th
      className={cn(
        "border border-slate-200 px-4 py-2 text-left font-bold dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...rest}
    >
      {children}
    </th>
  );
};

type TdProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLTableDataCellElement>;

const Td = ({ children, ...props }: TdProps) => {
  const { className, ...rest } = props;
  return (
    <td
      className={cn(
        "border border-slate-200 px-4 py-2 text-left dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...rest}
    >
      {children}
    </td>
  );
};

export { Tr, Th, Td };
