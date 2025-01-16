import { siteURL } from "@/lib/axios";
import { getData } from "@/lib/data";
import React from "react";

export async function generateMetadata({ params } : {  params: Promise<{ locale: string}>}) {
  const lng = (await params).locale
  let data;
  let site = await getData("/get_settings", lng);
  const response = await getData("page/tos", lng);    
  data = response?.data?.page; 
  return {
    title: `${data?.meta_title || 'TOS'} - ${site?.data?.site_name|| "Itqan"}`  ,
    description: data?.meta_description,
    keywords: data?.meta_keywords,
    alternates: {
      canonical: `${siteURL}/tos`,
      languages: {
        'x-default': `${siteURL}/ar/tos`,
        'en': `${siteURL}/en/tos`,
        'fa': `${siteURL}/fa/tos`,
      },
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ locale: string}>
}) {
  const lng = (await params).locale
  let data;
  const response = await getData("page/tos", lng);  
  data = response?.data?.page; 
  return data && (
    <div>
        <header className="bg-primary text-white text-center py-12">
          <h1 className="text-4xl font-bold my-5">{data.name}</h1>
        </header>
        <section className="text-start py-12 px-4 6xl:!container">
          <p
            className="mt-4 text-gray-700 max-w-7xl mx-auto prose lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: data.details }}
          ></p>
        </section>
      </div>
  );
}
