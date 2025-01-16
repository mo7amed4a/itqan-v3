"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel";
import SectionApp from "../section"
import LinkApp from "@/components/global/LinkApp";
import CardSmall from "@/components/cards/card-small";
import { Button } from "@/components/ui/button";
import React from "react";
import Autoplay from "embla-carousel-autoplay"

export default function ImportantSp({
    data,
    home,
    smallCard
}: {
    data: any,
    smallCard: any,
    home: any
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  )

  return (
    <SectionApp
          title={home.specialties.title}
          className="container lg:max-w-[85vw] 6xl:!container  mx-auto"
        >
          <>
            <Carousel
                plugins={[plugin.current]}
            >
              <CarouselContent className="md:h-80 grid md:flex grid-cols-2 px-4 md:px-0">
                {data &&
                  data.specializations &&
                  data.specializations.length > 0 &&
                  data.specializations.map((e: any) => (
                    <CarouselItem
                      className="basis-1/2 md:basis-1/5 pb-8"
                      key={e.id}
                    >
                      <LinkApp href={`/programs/${e.slug}`}>
                        <CardSmall
                          lng={smallCard}
                          university_count={e.university_count}
                          imageUrl={e.image}
                          text={e.name}
                        />
                      </LinkApp>
                    </CarouselItem>
                  ))}
              </CarouselContent>
            </Carousel>
            <LinkApp href="/programs" className="flex justify-center mt-7">
              <Button
                color="primary"
                size="xl"
                className="bg-primary px-10 lg:!px-28 hover:!scale-x-100 hover:bg-secondary hover:text-white"
              >
                {home.WhatService.read_more}
              </Button>
            </LinkApp>
          </>
        </SectionApp>
  )
}
