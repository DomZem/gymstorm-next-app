"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { UrlObject } from "url";

interface NavLinkProps extends LinkProps<unknown> {
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathName = usePathname();

  const isActive =
    pathName === href || pathName === (href as UrlObject).pathname;

  return (
    <Link
      className={`rounded-md p-2 text-sm font-medium duration-200 hover:bg-muted ${
        isActive ? "bg-muted" : "bg-transparent"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
