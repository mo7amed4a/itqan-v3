'use client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { UniversityType } from '../../_components_home/CardUniversity'
import LinkApp from '@/components/global/LinkApp'
import CardUniversityTwoClient from '../../_components_home/CardUniversityTwoClient'

const UniList = ({
  posts,
  url,
  blogsLang,
  uniLang,
  partial_scholarshipsLang
}: {
  posts: any
  url: string
  blogsLang: any
  uniLang: any,
  partial_scholarshipsLang:any
}) => {
  const [visibleCount, setVisibleCount] = useState(10)

  const handleShowMore = () => {
    setVisibleCount(prevCount =>
      prevCount + 10 <= posts.length ? prevCount + 10 : posts.length
    )
  }

  const handleShowLess = () => {
    setVisibleCount(prevCount => (prevCount > 10 ? prevCount - 10 : 10))
  }

  return (
    <div className='space-y-4'>
      <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-3'>
        {posts.slice(0, visibleCount).map((item: UniversityType) => {
          return (
            <LinkApp
              className='w-auto'
              key={item.id}
              href={`/${url}/${item.slug}`}
            >
              <CardUniversityTwoClient
                dataLang={partial_scholarshipsLang}
                btnText={uniLang.universityInfo.registerNow}
                university={item}
              />
            </LinkApp>
          )
        })}
      </div>

      <div className='flex justify-center gap-4'>
        {visibleCount < posts.length && (
          <Button
            onClick={handleShowMore}
            className='rounded bg-primary px-4 py-2 text-white'
          >
            {blogsLang.show_more}
          </Button>
        )}

        {visibleCount > 10 && (
          <Button
            onClick={handleShowLess}
            className='rounded bg-secondary px-4 py-2 text-white'
          >
            {blogsLang.show_less}
          </Button>
        )}
      </div>
    </div>
  )
}

export default UniList
