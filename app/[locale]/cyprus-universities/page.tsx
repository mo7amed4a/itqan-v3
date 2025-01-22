import { getData } from "@/lib/data";
import { CustomCarousel } from "@/components/ui/CustomCarousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import BreadcrumbApp from "@/components/global/breadcrumb";
import { UniversityType } from "../_components_home/CardUniversity";
import LinkApp from "@/components/global/LinkApp";
import CardUniversityTwo from "../_components_home/CardUniversityTwo";
import UniversitiesSliderItem from "./[category]/_components/full/UniversitiesSliderItem";
import LinksCategoryForUni from "@/components/global/LinksCategoryForUni";
import { getTranslations } from "@/lib/dictionary";
import UniList from "../turkish-universities/_components/UniList";
import { siteURL } from "@/lib/axios";
import { headers } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale
  let data;
  const response = await getData("/get_settings", locale);
  data = response?.data;
  const headerList = headers();
  const pathname = (await headerList).get("x-current-path");
  
  let dataTwo = null;
  let url = "/qyprus_universities";
  const responseTwo = await getData(url, locale);
  dataTwo = responseTwo?.data; 
  return {
    title: dataTwo?.seo[0]?.page_title + "  - " + data?.site_name,
    description: dataTwo?.seo[0]?.meta_description,
    alternates: {
      canonical: siteURL + pathname,
      languages: {
        'x-default': `${siteURL}/cyprus-universities`,
        'en': `${siteURL}/en/cyprus-universities`,
        'fa': `${siteURL}/fa/cyprus-universities`,
      },
    },
  };
}

export default async function UniversityPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: any }>;
  searchParams: Promise<{
    page: string;
  }>;
}) {
  const lng = (await params).locale;
  const page = (await searchParams).page
  const searchParamsString = (await searchParams)
  const {cypriot_universities} = await getTranslations(lng);
  const {breadcrumb} = await getTranslations(lng);
  const {blogs: blogsLang} = await getTranslations(lng);
  const {partial_scholarships: partial_scholarshipsLang} = await getTranslations(lng);

  let data = null;
  let url = "/qyprus_universities";
  if (page) {
    const params = new URLSearchParams(searchParamsString.toString());
    params.set("page", page);
    url += `?${params.toString()}`;
  }

  const response = await getData(url, lng);
  data = response?.data;

  const siteData = (await getData('/get_settings', lng))?.data

  // const pagination = data?.paginated_universities?.pagination || null;

  return (
    <div className="mb-10 container lg:max-w-[85vw] 6xl:!container mx-auto space-y-7 p-4 md:px-0">
      <BreadcrumbApp lang={breadcrumb} />
      <div className="flex justify-center items-center text-center">
        <h1 className="text-lg font-bold text-gray-500 md:text-2xl">
          {data?.seo[0]?.page_title}
        </h1>
      </div>
      <div>
        <ul className="flex gap-4 [&>li]:pb-2 overflow-x-auto hidden-scrollbar text-base md:text-lg mb-5">
          {data && data.categories && data.categories.length > 0 && (
            <LinksCategoryForUni
              links={data.categories}
              href="/cyprus-universities"
              allText={cypriot_universities.links.all}
            />
          )}
        </ul>
      </div>
      {data &&
        data.featured_universities &&
        data.featured_universities.length > 0 && (
          <div className="space-y-5 md:mt-8 lg:px-16 hidden md:block">
            <span className="text-lg font-bold text-gray-500 md:text-2xl lg:ps-4">
              {cypriot_universities.mostRanked}
            </span>
            <CustomCarousel lng={lng}>
              {data.featured_universities.map((item: UniversityType) => (
                <UniversitiesSliderItem
                  lng={lng}
                  key={item.id}
                  item={item}
                  url="university"
                />
              ))}
            </CustomCarousel>
          </div>
        )}

      {data &&
        data.paginated_universities &&
        data.paginated_universities.data ?
        data.paginated_universities.data.length > 0 ? 
        (
          <div>
            <section className="mt-10 hidden">
              <ScrollArea className="w-full whitespace-nowrap md:overflow-auto md:whitespace-pre-wrap" dir={lng==="ar" || lng==="fa" ? "rtl" : "ltr"}>
                <div className="flex md:grid grid-cols-3 w-max md:w-full gap-4">
                  {data.paginated_universities.data.map(
                    (item: UniversityType) => {
                      return (
                        <LinkApp className="w-64 md:w-auto"
                          key={item.id}
                          href={`/university/${item.slug}`}
                        >
                          <CardUniversityTwo
                            lng={lng}
                            // major={t("topMajors")}
                            btnText={cypriot_universities.universityInfo.registerNow}
                            university={item}
                          />
                        </LinkApp>
                      );
                    }
                  )}
                </div>
                <ScrollBar orientation="horizontal" className="hidden" />
              </ScrollArea>
            </section>
            <section className="mt-10">
              <div className="hidden">
                {data.paginated_universities.data.map(
                  (item: UniversityType) => {
                    return (
                      <LinkApp
                        className="w-64 md:w-auto"
                        key={item.id}
                        href={`/university/${item.slug}`}
                      >
                        <CardUniversityTwo
                          lng={lng}
                          btnText={cypriot_universities.universityInfo.registerNow}
                          university={item}
                        />
                      </LinkApp>
                    );
                  }
                )}
              </div>
              {data?.paginated_universities?.data && <UniList partial_scholarshipsLang={partial_scholarshipsLang} blogsLang={blogsLang} uniLang={cypriot_universities} url="university" posts={data.paginated_universities.data} />}
            </section>
            {/* <div className="flex justify-center mt-10">
              <ShowMoreBtn page={page} text={t("show_more")} />
            </div> */}


<script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': siteData?.title,
            author: siteData?.site_name,
            interactionStatistic: [
              {
                '@type': 'InteractionCounter',
                interactionService: {
                  '@type': 'WebSite',
                  name: 'Twitter',
                  url: 'http://www.twitter.com'
                },
                interactionType: 'https://schema.org/ShareAction',
                userInteractionCount: '1203'
              },
              {
                '@type': 'InteractionCounter',
                interactionType: 'https://schema.org/CommentAction',
                userInteractionCount: '78'
              }
            ],
            name: data?.seo[0]?.page_title
          })
        }}
      />
          </div>
        ):
        <div className="min-h-[40vh] w-full flex justify-center items-center">
          <div>
            <span className="text-lg md:text-2xl text-gray-500 font-bold">Not Found</span>
          </div>
        </div> :
         <div className="min-h-[40vh] w-full flex justify-center items-center">
         <div>
           <span className="text-lg md:text-2xl text-gray-500 font-bold">Server Error</span>
         </div>
       </div>
        }
    </div>
  );
}
