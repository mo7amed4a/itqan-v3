import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getTranslations } from "@/lib/dictionary";


export default async function CardRank({
  university,
  lng,
}: {
  university: any;
  lng: any;
}) {
  const {university_details}= await getTranslations(lng);
  return (
    <Card className="relative border-none shadow-none rounded-none bg-primary py-10">
    <CardHeader className="container lg:max-w-[85vw] mx-auto relative z-10">
      <h2 className="text-white text-lg md:text-xl font-bold">
        {university.name} {university_details.university.numbers}
      </h2>
    </CardHeader>
    <ScrollArea className="w-full whitespace-nowrap" dir={lng === "ar" || lng === "fa" ? "rtl" : "ltr"}>
      
      <CardContent className="flex w-max gap-x-4 p-4 relative z-10 container lg:max-w-[85vw] mx-auto lg:px-16 text-center lg:grid lg:grid-cols-5 gap-5">
        
        <Card className="w-52 border-none shadow-none group">
          <CardHeader className="flex justify-center items-center">
            <Image
              src={"/images/sp/1.png"}
              alt={university_details.university.globalRank}
              width={500}
              height={500}
              className="!h-20 !w-24 lg:size-28 group-hover:scale-110 duration-300 transition-all"
            />
          </CardHeader>
          <CardContent className="py-2">
            <span className="text-base sm:text-lg md:text-xl font-bold text-primary">
              {university_details.university.globalRank}
            </span>
          </CardContent>
          <div className="flex justify-center py-3 items-center text-2xl font-bold text-gray-500 border-t">
            <span>{university.global_rank}</span>
          </div>
        </Card>
        <Card className="w-52 border-none shadow-none group">
          <CardHeader className="flex justify-center items-center">
            <Image
              src={"/images/sp/2.png"}
              alt=""
              width={500}
              height={500}
              className="!h-20 !w-24 lg:size-28  group-hover:scale-110 duration-300 transition-all"
            />
          </CardHeader>
          <CardContent className="py-2">
            <span className="text-lg md:text-xl font-bold text-primary">
              {university_details.university.localRank}
            </span>
          </CardContent>
          <div className="flex justify-center py-3 items-center text-2xl font-bold text-gray-500 border-t">
            <p>{university.local_rate}</p>
          </div>
        </Card>
        <Card className="w-52 border-none shadow-none group">
          <CardHeader className="flex justify-center items-center">
            <Image
              src={"/images/sp/3.png"}
              alt=""
              width={500}
              height={500}
              className="!h-20 !w-24 lg:size-28  group-hover:scale-110 duration-300 transition-all"
            />
          </CardHeader>
          <CardContent className="py-2">
            <span className="text-lg md:text-xl font-bold text-primary">
              {university_details.university.studentsCount}
            </span>
          </CardContent>
          <div className="flex justify-center py-3 items-center text-2xl font-bold text-gray-500 border-t">
          <p>{university.student_count}</p>
          </div>
        </Card>
        <Card className="w-52 border-none shadow-none group">
          <CardHeader className="flex justify-center items-center">
            <Image
              src={"/images/sp/4.png"}
              alt=""
              width={500}
              height={500}
              className="!h-20 !w-24 lg:size-28  group-hover:scale-110 duration-300 transition-all"
            />
          </CardHeader>
          <CardContent className="py-2">
            <span className="text-lg md:text-xl font-bold text-primary">
              {university_details.university.staff}
            </span>
          </CardContent>
          <div className="flex justify-center py-3 items-center text-2xl font-bold text-gray-500 border-t">
            <p>{university.teachers_count}</p>
          </div>
        </Card>
        <Card className="w-52 border-none shadow-none group">
          <CardHeader className="flex justify-center items-center">
            <Image
              src={"/images/sp/5.png"}
              alt=""
              width={500}
              height={500}
              className="!h-20 !w-24 lg:size-28  group-hover:scale-110 duration-300 transition-all"
            />
          </CardHeader>
          <CardContent className="py-2">
            <span className="text-lg md:text-xl font-bold text-primary">
              {university_details.university.nationalityCount}
            </span>
          </CardContent>
          <div className="flex justify-center py-3 items-center text-2xl font-bold text-gray-500 border-t">
            <p>{university.national_count}</p>
          </div>
        </Card>

      </CardContent>
      <ScrollBar orientation="horizontal" className="hidden" />

    </ScrollArea>
    <Image
      className="absolute inset-0 size-full z-0 opacity-35"
      src={"/images/bg-ehs.png"}
      alt=""
      width={2500}
      height={2500}
    />
  </Card>
  );
}
