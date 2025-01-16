import { api } from '@/lib/axios'
import { NextResponse } from 'next/server'
export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  try {
    const locale = (await params).locale
    const response = await api.get('/sitemap/turkish-universities', {
      headers: {
        'Accept-Language': locale,
        Accept: 'application/xml'
      }
    })
    return new NextResponse(response.data, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    console.error('Error fetching sitemap:', error)
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
      {
        status: 500,
        headers: {
          'Content-Type': 'application/xml'
        }
      }
    )
  }
}
