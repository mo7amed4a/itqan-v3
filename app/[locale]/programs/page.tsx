import { getData } from '@/lib/data'
import React from 'react'
import ProgramCard from './_components/ProgramCard'
import { getTranslations } from '@/lib/dictionary'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { siteURL } from '@/lib/axios'

export async function generateMetadata() {
  return {
    alternates: {
      canonical: `${siteURL}/programs`,
      languages: {
        'x-default': `${siteURL}/programs`,
        en: `${siteURL}/en/programs`,
        fa: `${siteURL}/fa/programs`
      }
    }
  }
}

export default async function page({
  params
}: {
  params: Promise<{ locale: any }>
}) {
  const lng = (await params).locale
  // @ts-ignore
  const { smallCard } = await getTranslations(lng)
  let data
  const response = await getData('new_programs', lng)
  data = response?.data

  const siteData = (await getData('/get_settings', lng))?.data

  return (
    <div className='container mx-auto px-4  6xl:!container md:px-0 lg:max-w-[85vw]'>
      <header className='py-12 text-center'>
        <h1 className='my-5 text-4xl font-bold text-primary'>
          {data?.overview?.name}
        </h1>
        <span className='text-lg text-gray-400'>
          {data?.overview?.meta_description}
        </span>
      </header>
      <section className='py-12 text-start'>
        {data?.data?.map((item: any) => (
          <section key={item?.id} className='space-y-4'>
            <span className='font-bold text-primary'>{item?.name}</span>
            <Carousel>
              <CarouselContent className='grid px-4 md:flex md:h-auto md:px-0 md:pe-10 lg:pe-20'>
                {item?.specializations?.map((specialization: any) => (
                  <CarouselItem
                    key={specialization?.slug}
                    className='pb-8 md:basis-1/5'
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

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': siteData?.title,
            author: siteData?.site_name,
            interactionStatistic: [
              {
                '@type': 'InteractionCounter',
                interactionService: {
                  '@type': 'WebSite',
                  name: 'Twitter',
                  url: 'http://www.twitter.com'
                },
                interactionType: 'https://schema.org/ShareAction',
                userInteractionCount: '1203'
              },
              {
                '@type': 'InteractionCounter',
                interactionType: 'https://schema.org/CommentAction',
                userInteractionCount: '78'
              }
            ],
            name: data?.overview?.name
          })
        }}
      />
    </div>
  )
}
