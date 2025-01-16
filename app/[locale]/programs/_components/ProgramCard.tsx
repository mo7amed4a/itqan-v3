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
    <Card className='max-w-[300px] overflow-hidden border-none shadow-none rounded-3xl'>
      <CardContent className='flex flex-col p-2'>
        <div className='relative aspect-square w-full'>
          <Image
            src={data?.image?.split("http://").join("https://")}
            alt='Food engineering laboratory with scientific equipment and fresh produce'
            fill
            className='overflow-hidden rounded-3xl object-cover'
          />
        </div>
        <div className='space-y-2 p-4 text-center'>
          <p className='text-lg text-gray-500'>{uniWord} <span>{data?.university_count}</span></p>
          <Button className='w-full rounded-xl bg-primary px-4 py-2 h-12 text-white'>
            <p className='text-center text-lg font-medium truncate'>{data?.name}</p>
          </Button>
        </div>
      </CardContent>
    </Card>
    </LinkApp>   
  )
}
