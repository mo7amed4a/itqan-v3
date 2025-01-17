'use client'

import { useParams, usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from '../ui/breadcrumb'
import React from 'react'
import LinkApp from './LinkApp'

export default function BreadcrumbApp({
  className,
  last,
  lang
}: {
  className?: string
  last?: string
  lang: any
}) {
  const pathname = usePathname()
  const { locale } = useParams()
  const segments = pathname
    .split('/')
    .filter(segment => segment !== locale && segment !== '')

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: lang.Home || 'Home',
        item: 'https://itqaneducation.com/'
      },
      ...segments.map((segment, index) => ({
        '@type': 'ListItem',
        position: index + 2, 
        name: index === segments.length - 1 && last ? last : lang[segment] || segment,
        item: `https://itqaneducation.com/${segments.slice(0, index + 1).join('/')}`
      }))
    ]
  }

  return (
    <Breadcrumb className={`mt-10 px-4 text-sm md:px-0 ${className}`}>
      <BreadcrumbList className='items-center'>
        <BreadcrumbItem>
          <LinkApp href={'/'}>{lang.Home}</LinkApp>
        </BreadcrumbItem>
        {segments.map((segment: string, index) => {
          const href = `/${segments.slice(0, index + 1).join('/')}`
          const isLast = index === segments.length - 1
          const isLastNotEmpty = last && last?.length > 0
          return (
            <React.Fragment key={href}>
              {isLast && isLastNotEmpty ? ' ' : <BreadcrumbSeparator />}
              <BreadcrumbItem
                className={`ml-2 ${
                  isLast
                    ? 'font-semibold text-primary'
                    : 'text-gray-500 transition-colors hover:text-primary'
                }`}
                aria-current={isLast ? 'page' : undefined}
              >
                <LinkApp href={href}>
                  {isLast && last ? (
                    <span className='font-semibold text-primary'>{last}</span>
                  ) : (
                    (lang[segment] as any)
                  )}
                </LinkApp>
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </Breadcrumb>
  )
}