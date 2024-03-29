import Link from "next/link";
import { Container } from "@/components/container";

const menuItems = [
  { label: "Experience", href: "/experience" },
  // { label: "Skills", href: "/skills" },
  // { label: "Articles", href: "/articles" },
  { label: "Snippets", href: "/snippets" },
  { label: "Uses", href: "/uses" },
];

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {menuItems.map((item, index) => (
                  <NavLink key={index} href={item.href}>
                    {item.label}
                  </NavLink>
                ))}
              </div>
              <p className="text-sm text-zinc-400">
                &copy; {new Date().getFullYear()} Justin Sorensen. All rights
                reserved.
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  );
}
