'use client'
import React from 'react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import {
  CarouselItem
} from '@/components/ui/carousel'
import LinkApp from '@/components/global/LinkApp'
import { CustomCarouselHome } from '@/components/ui/CustomCarouselHome'

type PhotosType = {
  logo: string
  name: string
  slug: string
}[]
export default function Photos({ data, lng}: { data: PhotosType , lng: any}) {
 
  return (
    data && (
      <CustomCarouselHome lng={lng} className='md:h-80'>
          {data.map((item, index) => (
            <CarouselItem key={index} className='basis-1/3 pb-8 md:basis-1/5'>
              <Card className='flex size-full items-center justify-center border-none bg-transparent p-4 py-7 text-center shadow-none lg:w-56'>
                <LinkApp href={'/university/' + item.slug}>
                  <Image
                    src={item.logo.split('http://').join('https://')}
                    width={500}
                    height={500}
                    alt='alt'
                    className='size-auto border-none bg-contain md:p-5'
                  />
                </LinkApp>
              </Card>
            </CarouselItem>
          ))}
      </CustomCarouselHome>
    )
  )
}
