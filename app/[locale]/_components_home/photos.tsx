"use client"
import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"


type PhotosType = {
  logo: string;
  name: string;
  slug: string;
}[];
export default function Photos({ data }: { data: PhotosType }) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  )
  return (
    data && (
      <Carousel 
      plugins={[plugin.current]}>
        <CarouselContent className="md:h-80">
          {data.map((item, index) => (
            <CarouselItem key={index} className="basis-1/3 md:basis-1/5 pb-8">
              <Card
                className="rounded-full size-full border-none flex shadow-none justify-center p-4 bg-transparent items-center lg:w-56 text-center py-7"
              >
                  <Image
                    src={item.logo.split("http://").join("https://")}
                    width={500}
                    height={500}
                    alt="alt"
                    className="rounded-full size-auto border-none bg-contain"
                  />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    )
  );
}
