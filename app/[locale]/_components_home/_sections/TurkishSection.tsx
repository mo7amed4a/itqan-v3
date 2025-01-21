"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel";
import SectionApp from "../section"
import LinkApp from "@/components/global/LinkApp";
import React from "react";
import Autoplay from "embla-carousel-autoplay"
import { UniversityType } from "../CardUniversity";
import CardUniversityHomeClient from "../CardUniversityHomeClient";

export default function TurkishSection({
    data,
    home
}: {
    data: any,
    home: any
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  )
  return (
    <SectionApp
    title={home.best_universities.title}
    className="container lg:max-w-[85vw] 6xl:!container  mx-auto"
  >
    <Carousel
      plugins={[plugin.current]}
      >
      <CarouselContent className="px-10 md:px-0">
        {data &&
          data.turkish_universities &&
          data.turkish_universities.map((item: UniversityType) => (
            <CarouselItem
              className="md:basis-1/2 lg:basis-1/3 pb-8"
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
      </CarouselContent>
    </Carousel>
  </SectionApp>
  )
}
