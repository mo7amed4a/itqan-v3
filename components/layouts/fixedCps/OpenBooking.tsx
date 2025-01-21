"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import LinkApp from "../../global/LinkApp";

export default function OpenBooking({
  children,
  data=null
}: {
  children: React.ReactNode;
  data?: {
    university_name: string
    program_language: string
    level: string
    program_name: string
  } | null
}) {
  const router = useRouter();
  const pathname = usePathname();

  const onPageChange = () => {
    
    let params
    if (data) {
      params = new URLSearchParams({
        program_language: data?.program_language,
        level: data?.level,
        university_name: data?.university_name ,
        program_name: data?.program_name
      });
    }else {
      params = new URLSearchParams(data || {});
    }
    params.set("register", "open");
    const url = `${pathname}?${params.toString()}`;
    router.push(url);
  };

  return <div>
    <div className="hidden md:block" onClick={onPageChange}>{children}</div>
    <LinkApp className="md:hidden" href={`/register`} >{children}</LinkApp>
  </div>;
}
