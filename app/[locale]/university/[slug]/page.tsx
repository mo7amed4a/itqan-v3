import UniversitiesPage from "@/components/university/view/UniversitiesPage";
import { siteURL } from "@/lib/axios";
import { getData } from "@/lib/data";
import { headers } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string, slug: string }>;
}) {
  
  const locale = (await params).locale
  const slug = (await params).slug
  let data;
  const response = await getData("/get_settings", locale);
  data = response?.data;

  let uniData: any = null;
  const uniResponse = await getData(`/universities/${slug}/details`, locale);
  uniData = uniResponse?.data;
  const headerList = headers();
  const pathname = (await headerList).get("x-current-path");
  
  return {
    title: uniData?.university?.name  + " - " + data?.site_name,
    alternates: {
      canonical: siteURL + pathname,
      languages: {
        'x-default': `${siteURL}/university/${slug}`,
        'en': `${siteURL}/en/university/${slug}`,
        'fa': `${siteURL}/fa/university/${slug}`,
      },
    },
  };
}

export default async function UniversityInfo({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  return <UniversitiesPage params={params}/>
}
