import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/Button";
import { H1 } from "@/components/ui/H1";
import { H3 } from "@/components/ui/H3";
import { Github } from "lucide-react";

const techStack = [
  {
    name: "Framework",
    children: [
      {
        name: "Next.js",
        url: "https://nextjs.org/",
      },
      {
        name: "React",
        url: "https://reactjs.org/",
      },
    ],
  },
  {
    name: "UI Library",
    children: [
      {
        name: "Tailwind CSS",
        url: "https://tailwindcss.com/",
      },
      {
        name: "Radix UI",
        url: "https://radix-ui.com/",
      },
      {
        name: "Lucide React",
        url: "https://lucide.dev/",
      },
      {
        name: "Re-usable components",
        url: "https://ui.shadcn.com/",
      },
    ],
  },
  {
    name: "API and State Management",
    children: [
      {
        name: "TS-REST",
        url: "https://ts-rest.com/",
      },
      {
        name: "Zod",
        url: "https://zod.dev/",
      },
      {
        name: "TanStack Query",
        url: "https://tanstack.com/query/latest",
      },
    ],
  },
  {
    name: "Testing and CI/CD",
    children: [
      {
        name: "Playwright",
        url: "https://playwright.dev/",
      },
      {
        name: "Github Actions",
        url: "https://github.com/features/actions",
      },
      {
        name: "Vercel",
        url: "https://vercel.com/",
      },
    ],
  },
];

export default function Home() {
  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-8 mt-8">
        <H1>Test Admin</H1>
        <a
          href="https://github.com/rifaldhiaw/test-admin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="h-8">
            <Github />
            <span className="ml-2">View in Github</span>
          </Button>
        </a>
      </div>
      <p className="leading-7 mt-8 text-center sm:text-left">
        A simple and extensible admin app demo built with Next.js, Tailwind CSS,
        and TS-REST.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 mt-8">
        {techStack.map((item) => (
          <div key={item.name}>
            <H3 className="flex items-center">{item.name}</H3>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              {item.children.map((child) => (
                <li key={child.name}>
                  <span className="font-semibold">{child.name}</span>
                  {child.url && (
                    <a
                      href={child.url}
                      className="ml-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {child.url}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </AdminLayout>
  );
}
