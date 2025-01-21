import React from "react";
import { getData } from "@/lib/data";
import BreadcrumbApp from "@/components/global/breadcrumb";
import CardForFilter, { UniversityTwoType } from "./_components/CardForFilter";
import { getTranslations } from "@/lib/dictionary";
import ProgramTabs from "../programs/[slug]/_components/ProgramTabs";
import { siteURL } from "@/lib/axios";

export async function generateMetadata({ params }: { params: Promise<{ locale: any }> }) {
  const locale = (await params).locale;
  const {Header} = await getTranslations(locale);
  let data;
  const response = await getData("/get_settings", locale || "ar");
  data = response?.data;
  return {
    title: Header.partial_scholarships + " - " + data?.site_name,
    description: data?.meta_description || "",
    alternates: {
      canonical: `${siteURL}/scholarships`,
      languages: {
        'x-default': `${siteURL}/scholarships`,
        'en': `${siteURL}/en/scholarships`,
        'fa': `${siteURL}/fa/scholarships`,
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: any }> }) {
  const lng = (await params).locale;
  const {partial_scholarships, breadcrumb} = await getTranslations(lng);
  const response = await getData("/grants", lng);
  const data = response?.data;
  return (
    <div className="container lg:max-w-[85vw] mx-auto 6xl:!container px-4 md:px-0 my-10">
      <BreadcrumbApp lang={breadcrumb}/>
      <h1 className="text-center text-xl md:text-2xl font-bold text-gray-500 capitalize">
        {data?.overview?.name}
      </h1>
      <ProgramTabs locale={lng} overview={data?.overview}>
        {data && data?.data && data?.data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {data &&
              data.data &&
              data.data.map((item: UniversityTwoType) => {
                return <CardForFilter key={item.id} data={item} lng={lng} />;
              })}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="font-bold text-gray-500 text-xl">
              {partial_scholarships.notFound}
            </div>
          </div>
        )}
      </ProgramTabs>
    </div>
  );
}
