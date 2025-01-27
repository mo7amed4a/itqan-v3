'use client'
import { CarouselItem } from '@/components/ui/carousel'
import SectionApp from '../section'
import LinkApp from '@/components/global/LinkApp'
import React from 'react'
import { UniversityType } from '../CardUniversity'
import CardUniversityHomeClient from '../CardUniversityHomeClient'
import { CustomCarouselHome } from '@/components/ui/CustomCarouselHome'
import { BiLeftArrowAlt } from 'react-icons/bi'

export default function CyprusSection({
  data,
  home,
  lng
}: {
  data: any
  home: any
  lng: any
}) {
  return (
    <SectionApp
      title={home.best_universitiesTwo.title}
      className='container mx-auto 6xl:!container  lg:max-w-[85vw]'
    >
      <>
        <CustomCarouselHome lng={lng}>
          {data &&
            data.turkish_universities &&
            data.turkish_universities.map((item: UniversityType) => (
              <CarouselItem
                className='pb-8 md:basis-1/2 lg:basis-1/3'
                key={item.id}
              >
                <LinkApp href={`/university/${item.slug}`}>
                  <CardUniversityHomeClient
                    dataLang={home}
                    btnText={home.form_booking.submit}
                    university={item}
                  />
                </LinkApp>
              </CarouselItem>
            ))}
        </CustomCarouselHome>
        <div className='flex justify-center text-base text-primary'>
          <LinkApp
            href='/cyprus-universities'
            className='flex items-center gap-x-2'
          >
            {home.WhatService.read_more}
            <BiLeftArrowAlt />
          </LinkApp>
        </div>
      </>
    </SectionApp>
  )
}
