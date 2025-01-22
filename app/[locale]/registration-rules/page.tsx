import { siteURL } from "@/lib/axios";
import { getData } from "@/lib/data";
import { headers } from "next/headers";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string}>
}) {
  const locale = (await params).locale
  let data;
  let site = await getData("/get_settings", locale);
  const response = await getData("page/registration-rules", locale);
  data = response?.data?.page;
  const headerList = headers();
  const pathname = (await headerList).get("x-current-path");
  
  return {
      title: `${data?.meta_title || "About"} - ${
        site?.data?.site_name || "Itqan"
    }`,
    description: data?.meta_description,
    keywords: data?.meta_keywords,
    alternates: {
      canonical: siteURL + pathname,
      languages: {
        'x-default': `${siteURL}/registration-rules`,
        'en': `${siteURL}/en/registration-rules`,
        'fa': `${siteURL}/fa/registration-rules`,
      },
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ locale: string}>
}) {
  const locale = (await params).locale
  let data;
  const response = await getData("page/registration-rules", locale);
  data = response?.data?.page;
  return (
    data && (
      <div>
      <header className="bg-primary text-white text-center py-12">
        <h1 className="text-4xl font-bold my-5">{data.name}</h1>
      </header>
      <section className="text-start 6xl:!container 6xl:!mx-auto py-12 px-4">
        <p
          className="mt-4 text-gray-700 max-w-7xl mx-auto prose lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: data.details }}
        ></p>
      </section>
    </div>
    )
  );
}
