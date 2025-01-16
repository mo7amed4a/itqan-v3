"use client";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";

export default function CardConfessions({
  university,
  dataLng,
}: {
  university: any;
  dataLng?: any;
}) {  
    const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  return (
    <div className="container lg:max-w-[85vw] mx-auto px-4 py-10 mt-10 rounded-md">
      <h2 className="text-lg md:text-xl font-bold my-10">
        {dataLng.university.confessions}
      </h2>
      <Carousel plugins={[plugin.current]}>
        <CarouselContent className="md:h-80 grid md:flex grid-cols-2 px-4 md:px-0">
          {university.confessions.map((item: any, index: number) => (
            <CarouselItem
              className="basis-1/2 md:basis-1/5 pb-8"
              key={index + 11752}
            >
              <Card className="size-40 lg:size-auto px-10 py-20 group flex items-center justify-center transition-all duration-300 hover:shadow-lg bg-white cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={900}
                  height={900}
                  className="object-contain w-40 h-24 group-hover:scale-110 duration-300 transition-all"
                />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
