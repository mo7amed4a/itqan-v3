import React from "react";
import { getData } from "@/lib/data";
import HousingList from "@/components/housing/HousingList";
import BreadcrumbApp from "@/components/global/breadcrumb";
import { getTranslations } from "@/lib/dictionary";
import { siteURL } from "@/lib/axios";
import ShowMoreBtn from "@/components/global/ShowMore";
import ProgramTabs from "../programs/[slug]/_components/ProgramTabs";

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
        'x-default': `${siteURL}/student_accommodation`,
        'en': `${siteURL}/en/student_accommodation`,
        'fa': `${siteURL}/fa/student_accommodation`,
      },
    },
  };
}


export default async function page({
  params,
  searchParams
}: {
  params: Promise<{ locale: any}>,
  searchParams: Promise<{
    page:string
  }>;
}) {
  const lng = (await params).locale;
  const page =  (await searchParams).page
  const {housing:housingLang, blogs, breadcrumb} = await getTranslations(lng);
  console.log((await searchParams));

  let url = "/housings"
  if (page) {
    const params2 = new URLSearchParams(toString());
    params2.set("page", page);
    url += `?${params2.toString()}`;
  }
  
  const response = await getData(url, lng);
  const data = response?.data;

  return (
    <div className="mb-10 container lg:max-w-[85vw] 6xl:!container mx-auto p-4 md:px-0">
      <BreadcrumbApp lang={breadcrumb} className="-my-12"/>
      <div className="flex justify-center items-center text-center">
        <h1 className="text-lg font-bold text-gray-500 md:text-2xl">
          {housingLang.titlePage}
        </h1>
      </div>
      {/* {data && data?.housings && data?.housings?.length > 0 && (
        <HousingList lng={lng} housings={data?.housings} />
      )} */}
     <section className="mt-10">
      <ProgramTabs locale={lng} housings={housingLang.titlePage} overview={data?.overview}>
        <div className="space-y-5">
          {data && data?.housings && data?.housings?.length > 0 && (
            <HousingList lng={lng} housings={data?.housings} />
          )}
        </div>
        <div className="w-full flex justify-center py-4">
          <ShowMoreBtn text={blogs.show_more} page={page}/>
        </div>
      </ProgramTabs>
     </section>

    </div>
  );
}
