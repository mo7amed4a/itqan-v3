import BreadcrumbApp from "@/components/global/breadcrumb";
import { CustomCarousel } from "@/components/ui/CustomCarousel";
import { getData } from "@/lib/data";
import { UniversityType } from "../_components_home/CardUniversity";
import UniversitiesSliderItem from "../cyprus-universities/[category]/_components/full/UniversitiesSliderItem";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import LinkApp from "@/components/global/LinkApp";
import CardUniversityTwo from "../_components_home/CardUniversityTwo";
import UniList from "./_components/UniList";
import LinksCategoryForUni from "@/components/global/LinksCategoryForUni";
import { getTranslations } from "@/lib/dictionary";
import { siteURL } from "@/lib/axios";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: any }>;
}) {
  const locale = (await params).locale
  let data;
  const response = await getData("/get_settings", locale);
  data = response?.data;

  let dataTwo = null;
  let url = "/tukey_universities";
  const responseTwo = await getData(url, locale);
  dataTwo = responseTwo?.data;
  return {
    title: dataTwo?.seo[0]?.page_title + " - " + data?.site_name,
    description: dataTwo?.seo[0]?.meta_description,
    alternates: {
      canonical: `${siteURL}/turkish-universities`,
      languages: {
        'x-default': `${siteURL}/ar/turkish-universities`,
        'en': `${siteURL}/en/turkish-universities`,
        'fa': `${siteURL}/fa/turkish-universities`,
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
  const locale = (await params).locale;
  const page  = (await searchParams).page
  const {turkish_universities} = await getTranslations(locale);
  const {breadcrumb} = await getTranslations(locale);
  const {blogs: blogsLang} = await getTranslations(locale);
  const {partial_scholarships: partial_scholarshipsLang} = await getTranslations(locale);

  let data = null;
  let url = "/tukey_universities";
  if (page) {
    const params = new URLSearchParams(toString());
    params.set("page", page);
    url += `?${params.toString()}`;
  }

  const response = await getData(url, locale);
  data = response?.data;

  // const pagination = data?.paginated_universities?.pagination || null;

  return (
    <div className="mb-10 container lg:max-w-[85vw] 6xl:!container mx-auto space-y- p-4">
      <BreadcrumbApp lang={breadcrumb} />
      <div className="flex justify-center items-center text-center">
        <h1 className="text-lg font-bold text-gray-500 md:text-2xl">
          {data?.seo[0]?.page_title}
        </h1>
      </div>
      <div>
        <ul className="flex gap-4 [&>li]:pb-2 overflow-x-auto hidden-scrollbar text-base md:text-lg mb-5 mt-4 md:mt-0">
          {data && data.categories && data.categories.length > 0 && (
            <LinksCategoryForUni
              // lng={locale}
              links={data.categories}
              href="/turkish-universities"
              allText={turkish_universities.links.all}
            />
          )}
        </ul>
      </div>

      {data &&
        data.featured_universities &&
        data.featured_universities.length > 0 && (
          <div className="space-y-5 md:mt-8 lg:px-16 hidden md:block">
            <span className="text-lg font-bold text-gray-500 md:text-2xl lg:ps-4">
              {turkish_universities.mostRanked}
            </span>
            <div>
              <CustomCarousel lng={locale}>
                {data.featured_universities.map((item: UniversityType) => (
                  <UniversitiesSliderItem
                    lng={locale}
                    key={item.id}
                    item={item}
                    url="universities"
                  />
                ))}
              </CustomCarousel>
            </div>
          </div>
        )}

      {data &&
      data.paginated_universities &&
      data.paginated_universities.data ? (
        data.paginated_universities.data.length > 0 ? (
          <div>
            <section className="mt-10">
                <div className="hidden">
                  {data.paginated_universities.data.map(
                    (item: UniversityType) => {
                      return (
                        <LinkApp
                          className="w-64 md:w-auto"
                          key={item.id}
                          href={`/universities/${item.slug}`}
                        >
                          <CardUniversityTwo
                            lng={locale}
                            btnText={turkish_universities.universityInfo.registerNow}
                            university={item}
                          />
                        </LinkApp>
                      );
                    }
                  )}
                </div>
                {data?.paginated_universities?.data && <UniList partial_scholarshipsLang={partial_scholarshipsLang} blogsLang={blogsLang} uniLang={turkish_universities} url="universities" posts={data.paginated_universities.data} />}
            </section>
            {/* <div className="flex justify-center mt-10">
              <ShowMoreBtn page={page} text={t("show_more")} />
            </div> */}
          </div>
        ) : (
          <div className="min-h-[40vh] w-full flex justify-center items-center">
            <div>
              <span className="text-lg md:text-2xl text-gray-500 font-bold">
                Not Found
              </span>
            </div>
          </div>
        )
      ) : (
        <div className="min-h-[40vh] w-full flex justify-center items-center">
          <div>
            <span className="text-lg md:text-2xl text-gray-500 font-bold">
              Server Error
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
