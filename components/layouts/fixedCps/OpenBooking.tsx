"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import LinkApp from "../../global/LinkApp";

export default function OpenBooking({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onPageChange = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("register", "open");
    const url = `${pathname}?${params.toString()}`;
    router.push(url);
  };

  return <div>
    <div className="hidden md:block" onClick={onPageChange}>{children}</div>
    <LinkApp className="md:hidden" href={`/register`} >{children}</LinkApp>
  </div>;
}
