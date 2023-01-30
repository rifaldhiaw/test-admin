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
    <div>
      <div
        className={cn(
          "flex flex-row sm:flex-col items-center",
          "fixed bottom-0 sm:top-0 left-0",
          "h-14 sm:h-screen w-screen sm:w-24 lg:w-56",
          "border-t sm:border-r border-slate-200 dark:border-slate-700",
          "px-4",
          "bg-white dark:bg-slate-900"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center",
            "h-8 lg:h-16 my-14",
            "hidden sm:block"
          )}
        >
          <h1
            className="hidden lg:block text-xl font-bold cursor-pointer"
            onClick={() => router.push("/")}
          >
            Admin
          </h1>
          <h1
            className="lg:hidden text-3xl font-bold cursor-pointer"
            onClick={() => router.push("/")}
          >
            A
          </h1>
        </div>
        <div
          className={cn(
            "flex-1",
            "flex flex-row sm:flex-col gap-4",
            "justify-evenly sm:justify-start"
          )}
        >
          {menus.map((menu) => (
            <Link key={menu.name} href={menu.path} className={cn("w-full")}>
              <Button
                variant={activeMenu?.name === menu.name ? "subtle" : "link"}
                className={cn(
                  "flex flex-col lg:flex-row",
                  "h-auto w-full",
                  "py-0 md:py-4 px-2 lg:px-4",
                  "justify-start",
                  "rounded-lg",
                  activeMenu?.name === menu.name && "bg-slate-100"
                )}
              >
                <menu.icon className="w-4 md:w-8" />
                <span className="text-[8px] lg:text-base lg:ml-2">
                  {menu.name}
                </span>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className={cn("mb-24 md:mb-0", "sm:ml-24 lg:ml-56", "p-4 lg:p-8")}>
        {props.children}
      </div>
    </div>
  );
};

export { AdminLayout };
