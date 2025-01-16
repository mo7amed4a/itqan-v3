'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

import { i18n } from '@/i18n.config'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function LocaleSwitcher() {
  const pathName = usePathname()
  const { locale } = useParams() as { locale: string }

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'

    const pathnameIsMissingLocale = i18n.locales.every(
      locale => !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
      if (locale === i18n.defaultLocale) return pathName
      return `/${locale}${pathName}`
    } else {
      if (locale === i18n.defaultLocale) {
        const segments = pathName.split('/')
        const isHome = segments.length === 2
        if (isHome) return '/'
        segments.splice(1, 1)
        return segments.join('/')
      }

      const segments = pathName.split('/')
      segments[1] = locale

      return segments.join('/')
    }
  }

  return (
    // @ts-ignore
    <Select defaultValue={locale} className='flex gap-x-3'>
      <SelectTrigger
        className='h-8 w-[55px] bg-transparent !text-white focus:border-none focus:outline-none focus:ring-0 focus-visible:ring-0 md:h-9 md:w-[70px]'
        aria-label={'Select a locale'}
      >
        <div className='!text-white'>
          <SelectValue placeholder='Select language' />
        </div>
      </SelectTrigger>
      <SelectContent>
        {i18n.locales.map(locale => {
          return (
            <Link
              href={redirectedPathName(locale)}
              key={locale}
              className='h-full w-full bg-red-400'
            >
              <div 
                className='relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-3 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-start'
                // value={locale}
              >
                {locale}
              </div>
            </Link>
          )
        })}
      </SelectContent>
    </Select>
  )
}
