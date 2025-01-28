"use client";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import {
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CustomCarouselHome } from "@/components/ui/CustomCarouselHome";
import Image from "next/image";
import React from "react";

export default function Stories({
  data,
  lng
}: {
  data: {
    id: 5;
    locale: "ar";
    name: "نور مصطفى";
    details: "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروءلصفحة\r\nما سيلهي القارئ عن التركيز على الشكل الخارجي";
    image: "https://admin.itqaneducation.com/storage/testemonials/4tEKkCy45nFk9efu6YMd0CKbTQatIjKbgn0rjS89.png";
    created_at: "2025-01-04T11:41:13.000000Z";
    updated_at: "2025-01-04T15:16:24.000000Z";
  }[];
  lng: any
}) {

  return (
    data && (
      <div 
      className="lg:w-2/4 mx-auto mt-10">
        <CustomCarouselHome lng={lng} className="h-auto px-4 md:px-0">
          {data.map((item, index) => <CarouselItem key={index}>
            <Card className="bg-gray-100 shadow-none border-none !rounded-s-[800px] rounded-e-full relative h-56 mb-10 mt-16">
                <div className="flex justify-center items-center absolute inset-x-0 top-0 -translate-y-2/4 z-10">
                    <Image src={item.image.split('http://').join('https://')} className="w-24 h-20 md:w-40 md:h-32 rounded-full bg-contain shadow-lg bg-white p-2 " width={2000} height={2000} alt="section" />
                </div>
                <CardContent className="flex flex-col items-center h-full justify-center pt-8">
                    <CardTitle className="text-primary md:text-3xl">
                        {item.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-lg text-center px-4">{item.details}</CardDescription>
                </CardContent>
            </Card>
          </CarouselItem>)}
        </CustomCarouselHome>
        <CarouselNext className="!text-white bg-primary"/>
        <CarouselPrevious className="!text-white bg-primary" />
      </div>
    )
  );
}
