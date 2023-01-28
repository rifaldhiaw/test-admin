import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const menus = [
  {
    name: "Product",
    path: "/product",
  },
  {
    name: "Cart",
    path: "/cart",
  },
];

const AdminLayout = (props: AdminLayoutProps) => {
  const router = useRouter();
  const activeMenu = menus.find((menu) => menu.path === router.pathname);

  return (
    <div className="flex flex-row">
      <div className="w-56 bg-slate-100 h-screen">
        <ul>
          {menus.map((menu) => (
            <Link key={menu.name} href={menu.path}>
              <li
                className={cn(
                  "cursor-pointer px-4 py-2 hover:bg-slate-200",
                  activeMenu?.name === menu.name && "bg-slate-200"
                )}
              >
                {menu.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-4">{props.children}</div>
    </div>
  );
};

export { AdminLayout };
