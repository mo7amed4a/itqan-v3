import LinkApp from '@/components/global/LinkApp'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

export default function ProgramCard({
  data,
  uniWord
}: {
  data: {
    name: string
    image: string
    university_count: number
    slug: string
  }
  uniWord: string
}) {
  return (
   <LinkApp href={`/programs/${data.slug}`}>
    <Card className='w-full md:max-w-[300px] overflow-hidden border-none shadow-none rounded-3xl group'>
      <CardContent className='flex flex-col p-2'>
        <div className='relative aspect-square w-full'>
          <Image
            src={data?.image?.split("http://").join("https://")}
            // src={'/images/88.png'}
            alt='Food engineering laboratory with scientific equipment and fresh produce'
            fill
            // width={1000}
            // height={1000}
            className='overflow-hidden rounded-3xl object-cover group-hover:translate-y-2 duration-300'
          />
        </div>
        <div className='space-y-2 -mt-1 p-4 text-center'>
          <p className='text-lg text-gray-500'>{uniWord} <span>{data?.university_count}</span></p>
          <Button className='w-full rounded-xl bg-primary group-hover:!bg-secondary px-4 py-2 h-12 text-white'>
            <h2 className='text-center text-lg font-medium truncate'>{data?.name}</h2>
          </Button>
        </div>
      </CardContent>
    </Card>
    </LinkApp>   
  )
}
