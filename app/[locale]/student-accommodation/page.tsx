import React from "react";
import { getData } from "@/lib/data";
import HousingList from "@/components/housing/HousingList";
import BreadcrumbApp from "@/components/global/breadcrumb";
import { getTranslations } from "@/lib/dictionary";
import { siteURL } from "@/lib/axios";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: any }>;
}) {
  const locale = (await params).locale
  const {Header} = await getTranslations(locale);
  let data;
  const response = await getData("/get_settings", locale);
  data = response?.data;
  return {
    title: Header.student_accommodation + " - " + data?.site_name,
    description: data?.meta_description || "",
    alternates: {
      canonical: `${siteURL}/student_accommodation`,
      languages: {
        'x-default': `${siteURL}/ar/student_accommodation`,
        'en': `${siteURL}/en/student_accommodation`,
        'fa': `${siteURL}/fa/student_accommodation`,
      },
    },
  };
}


export default async function UniversitiesPage({
  params,
}: {
  params: Promise<{ locale: any}>
}) {
  const lng = (await params).locale;
  const {housing:housingLang} = await getTranslations(lng);
  const {breadcrumb} = await getTranslations(lng);
  const response = await getData("/housings", lng);
  const data = response?.data;

  return (
    <div className="mb-10 container lg:max-w-[85vw] 6xl:!container mx-auto space-y-20 p-4 md:px-0">
      <BreadcrumbApp lang={breadcrumb} className="-my-12"/>
      <div className="flex justify-center items-center text-center">
        <h1 className="text-lg font-bold text-gray-500 md:text-2xl">
          {housingLang.titlePage}
        </h1>
      </div>
      {data && data?.housings && data?.housings?.length > 0 && (
        <HousingList lng={lng} housings={data?.housings} />
      )}
    </div>
  );
}
