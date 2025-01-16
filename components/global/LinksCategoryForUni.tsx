"use client";
import React from "react";
import LinkApp from "./LinkApp";
// import { useParams } from "next/navigation";

export default function LinksCategoryForUni({ links,category, href , allText, service=false}: { links: any, category?: string, href: string, allText: string, service?: boolean}) {  
  // const params = useParams() as any;

  return (
    <>
      {!service && <li
        className={
          !category
            ? "rounded-full bg-secondary text-white px-3 py-1.5"
            : "rounded-full bg-gray-100 border !border-gray-400 text-gray-500 px-3 py-1.5"
        }
      >
        <LinkApp href={`${href}`}>
          {allText}
        </LinkApp>
      </li>}
      {links.map((item: any) => {
        if (item.slug) {
          item.id = item.slug
        }
        return (
          <li
            key={item.id}
            className={
              category === `${item.id}`
                ? "rounded-full bg-secondary text-white px-3 py-1.5"
                : "rounded-full bg-gray-100 border !border-gray-400 text-gray-500 px-3 py-1.5"
            }
          >
            <LinkApp
            className="text-nowrap "
              href={`${href}/${item.id}`}
            >
              {item.name}
            </LinkApp>
          </li>
        );
      })}
    </>
  );
}
