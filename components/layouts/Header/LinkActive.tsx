"use client";
import { NavbarLink } from "flowbite-react";
import { usePathname } from "next/navigation";
import React from "react";

export default function LinkActive({
  as,
  locale,
  text,
  url,
  className
}: {
  as: React.ElementType;
  locale?: string;
  text: string;
  url?: string;
  className?: string
}) {
  const pathname = usePathname();
  const isActive = (url: string): boolean => {
    return pathname.endsWith(`${url}`) ? true : false;
  };

  const activeClass = "!border-b-2 border-secondary text-secondary";

  return (
    <NavbarLink
      as={as}
      href={locale === "ar" || !locale ? `/${url}` : `/${locale}/${url}`}
      className={isActive(`/${locale}/${url}`) ? activeClass : (url===""&& pathname.endsWith(`/${locale}`) ? activeClass : '') + " " + className}
    >
      {text}
    </NavbarLink>
  );
}
