import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getTranslations } from "@/lib/dictionary";

type NumbersType = {
  itqan_studens_count: "عدد طلاب اتقان بالجامعات التركية";
  universities_count: "عدد الجامعات الخاصة في تركيا";
  experience_count: "سنوات الخبرة";
  international_student_count: "عدد الطلاب الدوليين والاجانب في تركيا";
  consultation_count: "عدد الاستشارية الطلابية";
};
export default async function Numbers({ data,lng }: { data: NumbersType,lng: any }) {
  const {home} = await getTranslations(lng);
  return (
    data && (
      <Carousel>
        <CarouselContent className="md:h-64 px-4 md:px-0">
          <CarouselItem className="basis-1/2 md:basis-1/5 pb-8">
            <Card className="border-none hover:shadow-2xl group flex flex-col items-center lg:w-56 h-56 text-center py-7 rounded-2xl">
              <CardHeader
                dir="ltr"
                className="text-primary text-3xl font-bold group-hover:text-secondary"
              >
                {data.itqan_studens_count}
              </CardHeader>
              <CardContent className="text-lg text-gray-500">
                {home.numbers.itqan_studens_count}
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="basis-1/2 md:basis-1/5 pb-8">
            <Card className="border-none hover:shadow-2xl group flex flex-col items-center lg:w-56 h-56 text-center py-7 rounded-2xl">
              <CardHeader
                dir="ltr"
                className="text-primary text-3xl font-bold group-hover:text-secondary"
              >
                {data.international_student_count}
              </CardHeader>
              <CardContent className="text-lg text-gray-500">
                {home.numbers.international_student_count}
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="basis-1/2 md:basis-1/5 pb-8">
            <Card className="border-none hover:shadow-2xl group flex flex-col items-center lg:w-56 h-56 text-center py-7 rounded-2xl">
              <CardHeader
                dir="ltr"
                className="text-primary text-3xl font-bold group-hover:text-secondary"
              >
                {data.consultation_count}
              </CardHeader>
              <CardContent className="text-lg text-gray-500">
                {home.numbers.consultation_count}
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="basis-1/2 md:basis-1/5 pb-8">
            <Card className="border-none hover:shadow-2xl group flex flex-col items-center lg:w-56 h-56 text-center py-7 rounded-2xl">
              <CardHeader
                dir="ltr"
                className="text-primary text-3xl font-bold group-hover:text-secondary"
              >
                {data.universities_count}
              </CardHeader>
              <CardContent className="text-lg text-gray-500">
                {home.numbers.universities_count}
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="basis-1/2 md:basis-1/5 pb-8">
            <Card className="border-none hover:shadow-2xl group flex flex-col items-center lg:w-56 h-56 text-center py-7 rounded-2xl">
              <CardHeader
                dir="ltr"
                className="text-primary text-3xl font-bold group-hover:text-secondary"
              >
                {data.experience_count}
              </CardHeader>
              <CardContent className="text-lg text-gray-500">
                {home.numbers.experience_count}
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    )
  );
}
