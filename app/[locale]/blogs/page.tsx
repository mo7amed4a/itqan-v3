import { Button as ButtonApp } from "@/components/ui/button";
import React from "react";
import LinkApp from "@/components/global/LinkApp";
import CardBlog, { BlogItemType } from "@/components/cards/CardBlog";
import Image from "next/image";
import { getData } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ShowMoreBtn from "@/components/global/ShowMore";
// import BreadcrumbApp from "@/components/global/breadcrumb";
import LinksCategory from "@/components/global/LinksCategory";
import InputSearchBlog from "./_components/inputSearchBlog";
import BlogList from "./_components/BlogList";
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
    title: Header.blog + " - " + data?.site_name,
    description: data?.meta_description || "",
    alternates: {
      canonical: `${siteURL}/blogs`,
      languages: {
        'x-default': `${siteURL}/ar/blogs`,
        'en': `${siteURL}/en/blogs`,
        'fa': `${siteURL}/fa/blogs`,
      },
    },
  };
}

export default async function Blogs({
  params,
  searchParams,
}: {
  params: Promise<{
    locale: any;
  }>
    searchParams: Promise<{
    category: string;
    page: string;
  }>;
}) {
  const locale = (await params).locale;
  const category = (await searchParams).category
  const page = (await searchParams).page
  const {blogs: blogsLang} = await getTranslations(locale);

  let url = "/blog";
  if (category) {
    url = `/blog_cat/${category}`;
  }
  if (page) {
    const params = new URLSearchParams(toString());
    params.set("page", page);
    url += `?${params.toString()}`;
  }

  let blogs = null;
  const resp = await getData(url, locale);
  blogs = resp?.data?.posts?.data || null;
  const links = resp?.data?.cats || null;
  const sliders = resp?.data?.sliders || null;

  return (
    <div>
      <div className="relative flex items-center">
        <Image
          className="h-full w-full absolute inset-x-0 object-cover"
          src={"/images/blog.jpeg"}
          width={2000}
          height={1000}
          alt=""
        />
        <div className="relative z-10 my-20 container lg:max-w-[85vw] 6xl:!container mx-auto space-y-10 p-4">
          <div className="flex justify-start items-center text-start -mb-4">
            <h1 className="text-lg font-bold text-gray-500 md:text-2xl">
              {blogsLang.title}
            </h1>
          </div>
          {/* <BreadcrumbApp
            last={t('title')}
            className="md:!-ms-4 pt-4"
          /> */}
        </div>
      </div>
      <div className="mb-10 container lg:max-w-[85vw] 6xl:!container mx-auto space-y-10 p-4">
        <div>
          <ul className="flex w-full gap-4 [&>li]:pb-2 overflow-x-auto hidden-scrollbar text-base md:text-lg mb-5 mt-4 md:mt-0">
            {links && links.length > 0 && (
              <LinksCategory
                links={links}
                // searchParams={searchParams}
                href="/blogs"
                allText={blogsLang.links.all}
              />
            )}
            <div className="ms-auto w-64">
              <InputSearchBlog placeholder={blogsLang.search} />
            </div>
          </ul>
        </div>

        {sliders && sliders.length > 0 && (
          <div className="space-y-10">
            <h2 className="text-lg text-start font-bold text-gray-500 md:text-2xl">
              {blogsLang.most_visited}
            </h2>
            <div className="lg:px-24">
              <Carousel>
                <CarouselContent className="p-4 gap-x-4">
                  {sliders?.map((item: {
                    id: string
                    slug: string
                    title: string
                    short: string
                  }) => (
                    <CarouselItem
                      key={item.id}
                      className="h-auto w-2/5 bg-white shadow-none shadow-all rounded-xl ps-4"
                    >
                      <LinkApp
                        href={`/blogs/${item.slug}`}
                        className="w-full"
                      >
                        <div className="w-full h-full grid md:grid-cols-2">
                          <div className="h-full flex items-center order-2 p-4">
                            <div className="space-y-4 text-start lg:w-11/12 mx-auto py-4">
                              <h3 className="text-lg font-bold text-gray-500 md:text-2xl">
                                {item.title}
                              </h3>
                              <span
                                className="block text-sm md:text-base text-gray-500 !line-clamp-2"
                                dangerouslySetInnerHTML={{
                                  __html: item.short,
                                }}
                              ></span>
                              <div className="w-full flex justify-center items-center">
                                <ButtonApp variant="outline" className="text-gray-600">{blogsLang.read_more}</ButtonApp>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 ps-0 md:ps-4 order-1 md:order-2">
                            <Image
                              // @ts-ignore
                              src={item.image.split("http://").join("https://")}
                              alt="img"
                              width={2300}
                              height={2300}
                              className="w-full md:h-[300px] object-cover rounded-xl"
                            />
                          </div>
                        </div>
                      </LinkApp>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="!-start-7 md:!-start-12 !block " />
                <CarouselNext className="!-end-2 md:!-end-8 !block"/>
              </Carousel>
            </div>
          </div>
        )}

        <section className=" grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 hidden">
              {blogs &&
                blogs.map((item: BlogItemType) => (
                  <div
                    key={item.id}
                  >
                    <CardBlog
                      key={item.id}
                      blog={item}
                      textBtn={blogsLang.read_more}
                    />
                  </div>
              ))}
        </section>
        {blogs && <BlogList posts={blogs} blogLang={blogsLang} />}
        <div className="flex justify-center">
          <ShowMoreBtn page={page} text={blogsLang.show_more} />
        </div>
      </div>
    </div>
  );
}
