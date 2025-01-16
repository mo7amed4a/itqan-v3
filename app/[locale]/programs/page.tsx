import { getData } from '@/lib/data'
import React from 'react'
import ProgramCard from './_components/ProgramCard'
import { getTranslations } from '@/lib/dictionary'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { siteURL } from '@/lib/axios'


export async function generateMetadata() {
  return {
    alternates: {
      canonical: `${siteURL}/programs`,
      languages: {
        'x-default': `${siteURL}/ar/programs`,
        'en': `${siteURL}/en/programs`,
        'fa': `${siteURL}/fa/programs`,
      },
    },
  };
}


export default async function page({
  params
}: {
  params: Promise<{ locale: any }>
}) {
  const locale = (await params).locale
  // @ts-ignore
  const { smallCard } = await getTranslations(locale)
  const lng = (await params).locale
  let data
  const response = await getData('new_programs', lng)
  data = response?.data

  return (
    <div className='container mx-auto px-4  6xl:!container md:px-0 lg:max-w-[85vw]'>
      <header className='py-12 text-center'>
            <h1 className="text-4xl text-primary font-bold my-5">{data?.overview?.name}</h1>
            <span className='text-lg text-gray-400'>{data?.overview?.meta_description}</span>
      </header>
      <section className='py-12 text-start'>
        {data?.data?.map((item: any) => (
          <section key={item?.id} className='space-y-4'>
            <span className='font-bold text-primary'>{item?.name}</span>
            <Carousel
            >
              <CarouselContent className="md:h-auto grid md:flex grid-cols-2 px-4 md:px-0 md:pe-10 lg:pe-20">
               {item?.specializations?.map((specialization: any) => (
                    <CarouselItem
                    key={specialization?.slug}
                    className="basis-1/2 md:basis-1/5 pb-8"
                  > 
                    <ProgramCard
                        data={specialization}
                        uniWord={smallCard.university}
                    />
                  </CarouselItem>
                ))}
                </CarouselContent>
            </Carousel>
          </section>
        ))}
      </section>
    </div>
  )
}
