import { getData } from "@/lib/data";
import React from "react";
import FilterSelectTwo from "./_components/FilterSelectTwo";
import InputSearch from "@/components/layouts/Header/inputSearch";
import ShowMoreBtn from "@/components/global/ShowMore";
import { getTranslations } from "@/lib/dictionary";
import CardForProgram from "../programs/[slug]/_components/CardForFilter";
import { UniversityTwoType } from "../scholarships/_components/CardForFilter";
import { siteURL } from "@/lib/axios";
import { headers } from "next/headers";

export async function generateMetadata() {
  const headerList = headers();
  const pathname = (await headerList).get("x-current-path");
  return {
    alternates: {
      canonical: `${siteURL}${pathname}`,
      languages: {
        'x-default': `${siteURL}/search`,
        'en': `${siteURL}/en/search`,
        'fa': `${siteURL}/fa/search`,
      },
    },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: any }>;
  searchParams: Promise<{
    level: string;
    specialization: string;
    years: string;
    language: string;
    price_from: string;
    price_to: string;
    page: string
    name: string
  }>;
}) {
  const lng = (await params).locale;
 
  const {program} = await getTranslations(lng)
  const {home} = await getTranslations(lng)
  const { level, specialization, years, language, price_from, price_to, page, name } = (await searchParams);
  const query = (await searchParams);

  if (level) query.level = level;
  if (specialization) query.specialization = specialization;
  if (years) query.years = years;
  if (language) query.language = language;
  if (name) query.name = name;
  
  if (price_from) query.price_from = price_from;
  if (price_to) query.price_to = price_to;
  if (page) query.page = page;

  const queryString = new URLSearchParams(query).toString();

  const response = await getData(`/programs?${queryString}`, lng);
  const data = response?.data;
  
  return (
    <section className="container md:max-w-[85%] 6xl:!container 6xl:!mx-auto mx-auto px-4 py-10 md:px-0">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-96 text-start space-y-4">
          <h1 className="text-lg md:text-xl text-start font-bold text-gray-500">{program.filterWord}</h1>
          <div className="pt-4">
            <FilterSelectTwo dataLang={home} lng={lng}/>
          </div>
        </div>
       <div className="w-full">
        <div className="pb-4 flex gap-3 flex-col md:flex-row justify-between md:items-center">
          <div className="flex gap-x-2 text-lg md:text-xl text-start text-gray-500">
              <span>{program.w}</span>
              <span>{data &&
                  data?.data &&
                  data?.pagination?.total}
              </span>
              <span>{program.w2}</span>
          </div>
          <div>
            <InputSearch placeholder={program.search} bg/>
          </div>
        </div>
        {data &&
          data?.data &&
          data?.data?.length > 0 ?  (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {data &&
                data.data &&
                data.data.map((item: UniversityTwoType) => {
                  return <CardForProgram key={item.id} data={item} lng={lng} />;
                })}
                <div className="flex justify-center w-full col-span-full">
                  <ShowMoreBtn page={page} text={program.show_more} />
                </div>
            </div>
          ) : <div className="flex justify-center items-center h-[50vh]">
              <div className="font-bold text-gray-500 text-xl">{program.notFound}</div>
          </div> }
       </div>
      </div>
    </section>
  ) ;
}
