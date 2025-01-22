import { siteURL } from "@/lib/axios";
import { getData } from "@/lib/data";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) {
  const lng = (await params).locale;
  const page = (await params).page;
  let data;
  let site = await getData("/get_settings", lng);
  const response = await getData(`page/${page}`, lng);
  data = response?.data?.page;
  const headerList = headers();
  const pathname = (await headerList).get("x-current-path");

  return {
    title: `${data?.meta_title || "Page"} - ${
      site?.data?.site_name || "Itqan"
    }`,
    description: data?.meta_description,
    keywords: data?.meta_keywords,
    alternates: {
      canonical: siteURL + pathname,
      languages: {
        'x-default': `${siteURL}/pages/${page}`,
        'en': `${siteURL}/en/pages/${page}`,
        'fa': `${siteURL}/fa/pages/${page}`,
      },
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) {
  const lng = (await params).locale;
  const page = (await params).page;
  let data;
  const response = await getData(`page/${page}`, lng);
  data = response?.data?.page;
  if (!data) {
    notFound();
  }
  return (
    data && (
      <div>
        <header className="bg-primary text-white text-center py-12">
          <h1 className="text-4xl font-bold my-5">{data.name}</h1>
        </header>
        <section className="text-start py-12 px-4 6xl:!container 6xl:!mx-auto">
          <p
            className="mt-4 text-gray-700 max-w-7xl mx-auto prose lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: data.details }}
          ></p>
        </section>
      </div>
    )
  );
}
