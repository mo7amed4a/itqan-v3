"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

// @typescript-eslint/no-unused-vars
export default function LinkApp({children,href, className}: {
    children: React.ReactNode
    href: string,
    className?: string,
    // breadcrumb?: boolean
}) {
  const {locale} = useParams()
  const lng = locale === "ar" ? null : locale
  return lng ? (
    <Link href={`/${lng}${href}`} className={className}>{children}</Link>
  ): (
    <Link href={`${href}`} className={className}>{children}</Link>
  )
}
