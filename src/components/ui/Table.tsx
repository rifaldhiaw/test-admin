type TrProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLTableRowElement>;

const Tr = ({ children, ...props }: TrProps) => {
  return (
    <tr
      className="m-0 border-t border-slate-200 p-0 even:bg-slate-100 dark:border-slate-700 dark:even:bg-slate-800"
      {...props}
    >
      {children}
    </tr>
  );
};

type ThProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLTableHeaderCellElement>;

const Th = ({ children, ...props }: ThProps) => {
  return (
    <th
      className="border border-slate-200 px-4 py-2 text-left font-bold dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    >
      {children}
    </th>
  );
};

type TdProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLTableDataCellElement>;

const Td = ({ children, ...props }: TdProps) => {
  return (
    <td
      className="border border-slate-200 px-4 py-2 text-left dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    >
      {children}
    </td>
  );
};

export { Tr, Th, Td };
