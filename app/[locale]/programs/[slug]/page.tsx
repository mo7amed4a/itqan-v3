import { getData } from "@/lib/data";
import React from "react";
import ProgramTabs from "./_components/ProgramTabs";
import CardForProgram from "./_components/CardForFilter";
import { getTranslations } from "@/lib/dictionary";
import { UniversityTwoType } from "../../scholarships/_components/CardForFilter";
import ShowMoreBtn from "@/components/global/ShowMore";
import { siteURL } from "@/lib/axios";
import { headers } from "next/headers";
import OverviewContent from "./_components/OverviewContent";

export async function generateMetadata({
  params
}:{
  params: Promise<{locale: any, slug:string }>
}) {
  const locale = (await params).locale
  const slug = (await params).slug;

  const headerList = headers();
  const pathname = (await headerList).get("x-current-path");
  
  const siteData = (await getData('/get_settings', locale))?.data

  let data
  const response = await getData(`/program/${slug}`, locale);
  data = response?.data

  return {

    title: data?.overview?.name + " - " + siteData?.site_name,
    description: data?.overview?.meta_description || "",
    // keywords: data?.overview?.meta_keywords || "",
    alternates: {
      canonical: siteURL + pathname,
      languages: {
        'x-default': `${siteURL}/programs`,
        'en': `${siteURL}/en/programs`,
        'fa': `${siteURL}/fa/programs`,
      },
    },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: any, slug:string }>;
  searchParams: Promise<{
    specialization: string;
    page: string
  }>;
}) {
  const lng = (await params).locale;
  const slug = (await params).slug;
  const {program} = await getTranslations(lng);
  const { specialization } = await searchParams;
  const page = (await searchParams).page;
  const query = await searchParams;

  if (specialization) query.specialization = specialization;

  const queryString = new URLSearchParams(query).toString();

  const response = await getData(`/program/${slug}?${queryString}`, lng);
  const data = response?.data;

  return (
    <section className="container md:max-w-[85%] mx-auto 6xl:!container px-4 py-10 md:px-0">
      <div className="flex justify-center py-10">
        <h1 className="text-lg md:text-2xl text-center font-bold text-gray-500">
          {program.title} ({data?.overview?.name})
        </h1>
      </div>
      <ProgramTabs locale={lng} overview={data?.overview}>
        {data && data?.data && data?.data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {data &&
              data.data &&
              data.data.map((item: UniversityTwoType) => {
                return <CardForProgram key={item.id} data={item} lng={lng} />;
              })}
              <div className="col-span-full flex justify-center items-center">
                <ShowMoreBtn page={page} text={program.show_more}/>
              </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="font-bold text-gray-500 text-xl">
              {program.notFound}
            </div>
          </div>
        )}
      </ProgramTabs>
    </section>
  );
}
