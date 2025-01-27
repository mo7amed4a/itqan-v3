import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { UniversityType } from "./CardUniversityTwo";
export default function CardUniversityTwoClient({
  university,
  btnText,
  dataLang
}:{
  university?: UniversityType,
  btnText: string,
  dataLang: any
}) {  
  return university && (
    <div className="shadow-all bg-white rounded-2xl p-3 shadow-all duration-300 group">
      <div className="relative">
        {/* <div className="rounded-2xl overflow-hidden h-36 md:h-52 w-full relative group-hover:before:bg-transparent before:bg-[#21837F]/40 before:absolute before:content-[''] before:inset-0 before:transition-all before:duration-300 before:size-full before:z-10 "> */}
        <div className="rounded-2xl overflow-hidden h-36 md:h-52 w-full ">
          <Image
            alt="alt"
            width={1200}
            height={500}
            className="rounded-2xl size-full absolute inset-0 z-0"
            src={university.image.split('http://').join('https://')}
          />
        </div>
        <Image
          alt="alt"
          width={500}
          height={500}
          className="size-16 z-10 md:size-28 rounded-full absolute start-4 -bottom-10 md:-bottom-16 border-4 bg-white"
          src={university.logo.split('http://').join('https://')}
        />
      </div>
      <div className="p-4 mt-8 md:mt-16 text-start">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-base sm:text-xl md:text-2xl text-primary line-clamp-1">
            {university.name || university.translated_name}
          </h2>
          <div className="flex gap-3">
            {
              university?.language_flags?.map((e:{flag: string}, index: number) => {
                return <Image  key={index}
                  src={e.flag.split("http://").join("https://")}
                  alt="img"
                  width={300}
                  height={300}
                  className="!size-4 md:!size-7 rounded-full"
                />
              })
            }
          </div>
        </div>
        <section className="space-y-3 pt-3">
          <div className="w-full gap-2 md:items-center text-gray-800 text-xs md:text-sm grid grid-cols-2 md:grid-cols-4 text-center">
            <div className="bg-gray-400/10 rounded-lg p-1 md:p-2 flex flex-col items-center md:space-y-4">
              <span className="text-primary">{dataLang. years_1}</span>
              <span className="text-secondary">{university.found_year}</span>
            </div>
            <div className="bg-gray-400/10 rounded-lg p-1 md:p-2 flex flex-col items-center md:space-y-4">
              <span className="text-primary text-wrap">{dataLang.rank_1}</span>
              <span className="text-secondary">{university?.global_rank}</span>
            </div>
            <div className="bg-gray-400/10 rounded-lg p-1 md:p-2 flex flex-col items-center md:space-y-4">
              <span className="text-primary">{dataLang.years_2}</span>
              <span className="text-secondary">{university?.local_rate}</span>
            </div>
            <div className="bg-gray-400/10 rounded-lg p-1 md:p-2 flex flex-col items-center md:space-y-4">
              <span className="text-primary">{dataLang.count_1}</span>
              <span className="text-secondary">{university?.first_programs?.length}</span>
            </div>
          </div>
          <div className="bg-gray-400/10 text-gray-800 flex text-xs md:text-sm flex-col md:flex-row justify-between w-full gap-4 rounded-lg p-1.5 md:p-3">
            <span className="text-secondary">{dataLang.start_price}</span>
            <div className="flex justify-between gap-4">
              <div className="flex items-center gap-2">
                  <span>{dataLang.from}</span>
                  <span>{university.min_annual_fees}$</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{dataLang.to}</span>
                <span>{university.max_annual_fees}$</span>
              </div>
            </div>
          </div>
        </section>
        <div className="flex justify-center mt-2">
          <Button className="group-hover:bg-secondary">{btnText}</Button>
        </div>
      </div>
    </div>
  );
}
