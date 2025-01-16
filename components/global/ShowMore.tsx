"use client";
import React from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ShowMoreBtn({
  page,
  text,
}: {
  page: string;
  text: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
 

  const onPageChange = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (page) {
        const p = parseInt(page) + 1;
        params.set("page", p.toString());
    }
    else {
        params.set("page", '2');
    }
    
    const url = `${pathname}?${params.toString()}`;
    router.push(url);
  };

  return (
    <Button
      color="primary"
      size={"xl"}
      onClick={onPageChange}
      className="w-64 py-2 font-bold bg-primary hover:bg-secondary hover:!scale-x-100 text-white"
    >
      {text}
    </Button>
  );
}
