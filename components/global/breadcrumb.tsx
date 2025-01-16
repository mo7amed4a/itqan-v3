"use client";

import { useParams, usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import React from "react";
import LinkApp from "./LinkApp";

export default function BreadcrumbApp({className , last, lang}: {className?: string , last?: string, lang: any}) {
  const pathname = usePathname();  
  const {locale} = useParams()
  const segments = pathname.split("/").filter((segment) => segment !== locale && segment !== "");
  return (
    <Breadcrumb className={`text-sm mt-10 px-4 md:px-0 ${className}`}>
      <BreadcrumbList className="items-center">
        <BreadcrumbItem>
          <LinkApp href={"/"} >{lang.Home}</LinkApp>
        </BreadcrumbItem>
        {segments.map((segment: string, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const isLastNotEmpty = last && last?.length > 0;
          return (
            <React.Fragment key={href}>
              {(isLast && isLastNotEmpty) ? " " : <BreadcrumbSeparator />}
              <BreadcrumbItem
                className={`ml-2 ${
                  isLast
                    ? "text-primary font-semibold"
                    : "text-gray-500 hover:text-primary transition-colors"
                }`}
                aria-current={isLast ? "page" : undefined}
              >
                <LinkApp href={href} breadcrumb>
                  {
                    (isLast && last) ? (
                      <span className="text-primary font-semibold">{last}</span>
                    ): lang[segment] as any
                  }
                </LinkApp>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
