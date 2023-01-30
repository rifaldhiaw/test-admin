import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Box, ShoppingCart } from "lucide-react";
import Head from "next/head";
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
      <Head>
        <title>Test Admin</title>
      </Head>
      <MobilePortraitHeader />
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
        <TitleHeader />
        <div
          className={cn(
            "flex-1",
            "flex flex-row sm:flex-col gap-4",
            "justify-evenly sm:justify-start",
            "bg-white"
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

      <div className={cn("sm:ml-24 lg:ml-56", "px-4 lg:px-8", "py-20 md:py-4")}>
        {props.children}
      </div>
    </div>
  );
};

const MobilePortraitHeader = () => {
  const router = useRouter();

  return (
    <h1
      className={cn(
        "block sm:hidden fixed top-0 left-0 right-0 w-screen bg-white py-4 text-xl font-bold cursor-pointer",
        "border-b border-slate-200 dark:border-slate-700",
        "text-center"
      )}
      onClick={() => router.push("/")}
    >
      Admin
    </h1>
  );
};

const TitleHeader = () => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "h-8 lg:h-16 mt-20 mb-12",
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
  );
};

export { AdminLayout };
