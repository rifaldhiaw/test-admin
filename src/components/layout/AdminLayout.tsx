import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Box, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const menus = [
  {
    name: "Products",
    path: "/products",
    icon: Box,
  },
  {
    name: "Carts",
    path: "/carts",
    icon: ShoppingCart,
  },
];

const AdminLayout = (props: AdminLayoutProps) => {
  const router = useRouter();
  const activeMenu = menus.find((menu) => menu.path === router.pathname);

  return (
    <div className="flex flex-row">
      <div className="w-56 min-h-screen border-r border-slate-200 px-4">
        <div className="flex items-center justify-center h-16 my-14">
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => router.push("/")}
          >
            Admin
          </h1>
        </div>
        <div className="grid gap-4">
          {menus.map((menu) => (
            <Link key={menu.name} href={menu.path}>
              <Button
                variant={activeMenu?.name === menu.name ? "subtle" : "link"}
                className={cn(
                  "h-12 w-full justify-start rounded-lg",
                  activeMenu?.name === menu.name && "bg-slate-100"
                )}
              >
                <menu.icon className="w-8 mr-4" />
                {menu.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex-1 p-4">{props.children}</div>
    </div>
  );
};

export { AdminLayout };
