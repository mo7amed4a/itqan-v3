import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import img from "../../../public/icons/discound.png";
import { getTranslations } from "@/lib/dictionary";

export default async function CardUniOne({ university, lng }: { university: any, lng:any }) {
  const {university_details} = await getTranslations(lng);
  return (
    <section className="container lg:max-w-[85vw] 6xl:!container 6xl:!mx-auto mx-auto px-4 mb-5">
      <Card className="flex flex-col w-full md:flex-row md:h-96 lg:h-[28rem] rounded-xl shadow-none border-none hover:shadow-md ">
        <CardHeader className="md:w-2/4 p-5 md:py-12 order-2 md:order-1 relative flex items-center">
          <div className="absolute top-0 end-0 hidden md:block">
            <div className="relative w-20">
              <Image
                src={img}
                className="h-20 w-full absolute inset-0 -top-3"
                alt=""
                width={100}
                height={100}
              />
              <div className="relative z-10 flex flex-col items-center justify-center text-white">
                <span>{university_details.discount}</span>
                <span>40%</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <Avatar className="size-24 md:size-32">
              <AvatarImage
                className="p-4"
                src={university.logo.split("http://").join("https://")}
                alt={university.name}
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            {/* <div>
              <Image
                src={university.logo.split("http://").join("https://")}
                alt=""
                width={700}
                height={700}
                className="h-20 w-24 rounded-xl"
              />
            </div> */}
            <div className="space-y-2 flex flex-col justify-center text-gray-500">
              <span className="text-lg font-[600]">{university.name}</span>
            </div>
          </div>
          <section className="space-y-3 pt-3 w-full">
            <div className="w-full gap-2 md:items-center text-gray-800 text-xs md:text-sm grid grid-cols-3 md:grid-cols-3">
              {/* <div className="bg-gray-400/10 rounded-lg p-1 md:p-3 flex flex-col items-center md:space-y-4">
                <span className="text-primary">{t('years_1')}</span>
                <span className="text-secondary">{university.found_year}</span>
              </div> */}
              <div className="bg-gray-400/10 rounded-lg p-2 md:p-3 flex flex-col items-center md:space-y-4">
                <span className="text-primary">{university_details.rank_1}</span>
                <span className="text-secondary">{university?.global_rank}</span>
              </div>
              <div className="bg-gray-400/10 rounded-lg p-2 md:p-3 flex flex-col items-center md:space-y-4">
                <span className="text-primary">{university_details.years_2}</span>
                <span className="text-secondary">{university?.local_rate}</span>
              </div>
              <div className="bg-gray-400/10 rounded-lg p-2 md:p-3 flex flex-col items-center md:space-y-4">
                <span className="text-primary">{university_details.tasnif}</span>
                <span className="text-secondary">{university?.international_rate}</span>
              </div>
            </div>
            <div className="bg-gray-400/10 text-gray-800 flex text-xs md:text-sm flex-row justify-between w-full gap-4 rounded-lg p-3">
              <span className="text-primary text-nowrap">{university_details.start_price}</span>
              <div className="flex justify-between text-primary gap-4 w-full">
                <div className="flex items-center gap-2">
                    <span>{university_details.from}</span>
                    <span className="text-secondary">{university.min_annual_fees}$</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{university_details.to}</span>
                  <span className="text-secondary">{university.max_annual_fees}$</span>
                </div>
              </div>
            </div>
          </section>
        </CardHeader>
        <CardContent className="md:w-2/4 p-4 md:order-2 relative">
          <div className="absolute top-4 end-4 md:hidden">
            <div className="relative w-20">
              <Image
                src={img}
                className="h-20 w-full absolute inset-0 -top-3"
                alt=""
                width={100}
                height={100}
              />
              <div className="relative z-10 flex flex-col items-center justify-center text-white">
                <span>{university_details.discount}</span>
                <span>40%</span>
              </div>
            </div>
          </div>
          <Image
            src={university.image.split("http://").join("https://")}
            alt=""
            width={500}
            height={500}
            className="size-full rounded-xl"
          />
        </CardContent>
      </Card>
    </section>
  );
}
