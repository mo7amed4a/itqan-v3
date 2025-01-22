import { getTranslations } from '@/lib/dictionary'
import { Button } from 'flowbite-react'
import { Tajawal } from 'next/font/google'
import { headers } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const tajawal = Tajawal({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-tajawal'
})

export default async function notFound() {
  const headerList = headers();
  const pathname = (await headerList).get("x-current-path");
  const { notFound } = await getTranslations(
    // @ts-ignore
   (pathname?.startsWith('/en') && "en") || (pathname?.startsWith('/fa') && "fa") || "ar"
  )
  
  
  return (
    <html>
      <body
        className={
          tajawal.className +
          ' container mx-auto 6xl:!container lg:max-w-[85vw]'
        }
      >
        <div className='h-16 bg-primary'></div>
        <section className='grid h-screen items-center justify-center p-16 md:grid-cols-2'>
          {/* <div className='container flex flex-col items-center justify-center '>
            <div className='flex max-w-md flex-col gap-6 text-center'>
              <h2 className='text-9xl font-extrabold text-primary'>
                <span className='sr-only'>Error</span>404
              </h2>
              <p className='text-2xl text-gray-500 md:text-3xl'>
                Sorry, we couldn&apos;t find this page.
              </p>
              <Button
                as={Link}
                href='/'
                color='primary'
                className='hover:bg-secondary hover:text-white'
              >
                Back to home
              </Button>
            </div>
          </div> */}
          <div>
            <Image
              className='size-full'
              src={'/images/error.png'}
              alt=''
              width={2000}
              height={2000}
            />
          </div>
          <div className='flex flex-col space-y-5 text-center items-center'>
            <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-secondary'>{notFound.sorry}!</h1>
            <div className='space-y-4 md:space-y-8 text-center flex flex-col items-center'>
              <h2 className='text-xl md:text-4xl lg:text-5xl font-semibold text-primary'>
{notFound.title}              </h2>
              <p className='text-gray-600 md:text-3xl md:max-w-md text-wrap'>
               {notFound.description}
              </p>
              
            </div>

            <Link href='/' className='block'>
              <Button className='w-full bg-[#2A877E] text-white hover:bg-[#236E66]'>
              {notFound.btn}
              </Button>
            </Link>
          </div>
        </section>
      </body>
    </html>
  )
}
