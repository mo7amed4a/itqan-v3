"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

export default function LinkApp({children,href, className, breadcrumb=false}: {
    children: React.ReactNode
    href: string,
    className?: string,
    breadcrumb?: boolean
}) {
  console.log(breadcrumb);
  const {locale} = useParams()
  const lng = locale === "ar" ? null : locale
  return lng ? (
    <Link href={`/${lng}${href}`} className={className}>{children}</Link>
  ): (
    <Link href={`${href}`} className={className}>{children}</Link>
  )
}
