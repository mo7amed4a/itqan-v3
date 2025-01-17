import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/i18n.config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'


function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const searchParams = request.nextUrl.searchParams 

  request.headers.set('accept-language', "ar-EG,ar")

  if (pathname.startsWith('/ar')) {
    const newPathname = pathname.replace(/^\/ar/, '') || '/'
    const newUrl = new URL(newPathname, request.url)

    searchParams.forEach((value, key) => {
      newUrl.searchParams.set(key, value)
    })
    return NextResponse.redirect(newUrl)
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    if (locale === i18n.defaultLocale) {
      const newUrl = new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )

      searchParams.forEach((value, key) => {
        newUrl.searchParams.set(key, value)
      })

      return NextResponse.rewrite(newUrl)
    }

    const newUrl = new URL(
      `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
      request.url
    )

    searchParams.forEach((value, key) => {
      newUrl.searchParams.set(key, value)
    })

    return NextResponse.redirect(newUrl)
  }
  
      // const isRouteValid = await checkIfRouteExists(pathname)
      // if (!isRouteValid) {
      //   return NextResponse.rewrite(new URL('/404', request.url))
      // }
}


// async function checkIfRouteExists(pathname: string): Promise<boolean> {
//   return !pathname.includes('invalid')
// }


export const config = {
  matcher: [
    '/((?!api|_next/static|_next/images|favicon.ico|robots.txt|images/*|icons/*|logo/*).*)'
  ]
}
