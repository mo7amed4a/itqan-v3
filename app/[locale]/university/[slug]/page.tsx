import UniversitiesPage from "@/components/university/view/UniversitiesPage";
import { siteURL } from "@/lib/axios";
import { getData } from "@/lib/data";

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

  return {
    title: uniData?.university?.name  + " - " + data?.site_name,
    alternates: {
      canonical: `${siteURL}/university/${slug}`,
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
