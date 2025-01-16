import React from "react";
import { formatDate } from "@/lib/moment";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getData } from "@/lib/data";
import BreadcrumbApp from "@/components/global/breadcrumb";
import ConsultationCard from "./_components/ConsultationCard";
import CardBlog, { BlogItemType } from "@/components/cards/CardBlog";
import { getTranslations } from "@/lib/dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string,slug: string;}>;
}) {
  const locale = (await params).locale
  const slug = (await params).slug
  let data;
  const response = await getData("/get_settings", locale);
  const resp = await getData(`/post/${slug}`, locale);
  const post = resp?.data?.post || null;
  data = response?.data;
  return {
    title: post?.title + " - " + data?.site_name,
    description: post?.meta_description || "",
    keywords: post?.meta_tags || "",
  };
}

export default async function page({
  params,
}: {
  params: Promise<{
    locale: any;
    slug: string;
  }>;
}) {
  const lng = (await params).locale;
  const slug = (await params).slug;
  const {blogDetails} = await getTranslations(lng);
  const {breadcrumb} = await getTranslations(lng);
  const resp = await getData(`/post/${slug}`, lng);
  if (resp) {
    // console.log(resp.data.msg);
  } else {
    notFound();
  }
  const blog = resp?.data?.post || null;
  const related = resp?.data?.related || null;
  let data;
  const response = await getData("/get_settings", lng);
  data = response?.data;
  return (
    <article className="text-base relative isolate text-start -mt-5 mb-5 container md:max-w-[85%] 6xl:!container px-4 md:px-0 mx-auto">
      <BreadcrumbApp lang={breadcrumb} last={" "} />
      <div className="flex flex-col md:flex-row gap-4">
        <section className="mt-3 flex flex-col flex-wrap items-start text-start">
          <h1 className="text-primary text-lg md:text-xl xl:text-2xl font-bold">{blog.title}</h1>
          <div className="flex justify-between lg:justify-normal md:items-start gap-4 pt-4 ms-auto md:ms-0 w-full lg:w-auto text-gray-600">
            <div className="bg-white flex items-center p-1 xl:p-2 gap-3 rounded-md text-xs md:text-sm xl:text-base">
              <span>{blogDetails.author}</span>
              <span className="text-primary">{blog?.created_by}</span>
            </div>
            <div className="bg-white flex items-center p-1 xl:p-2 gap-3 rounded-md text-xs md:text-sm xl:text-base">
              <span>{blogDetails.date}</span>
              <span className="text-primary">
                {formatDate(blog?.created_at).split("/").join(".")}
              </span>
            </div>
          </div>
        </section>
        <div className="md:w-2/5 space-y-2 h-full"></div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 h-full">
        <main className="w-full">
          <section className="w-full">
            <Image
              width={2000}
              height={2000}
              className="sm:h-[34rem] mt-4 w-full rounded-xl"
              src={blog.image.split("http://").join("https://")}
              alt="Featured Image"
            />
          </section>
          <section className="blog">
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }}
              className="mx-auto mt-6 space-y-12 px-4 pb-10 text-lg tracking-wide text-gray-700 prose lg:prose-xl prose-blockquote:border-secondary [&>p>p>a>strong]:!text-secondary"
            ></div>
          </section>
        </main>
        {/* هنااا */}
        <aside className="md:w-2/5 space-y-4 mt-4 h-auto relative">
          <div className="sticky top-4 max-h-[calc(100vh-1rem)] overflow-y-auto hidden-scrollbar space-y-4">
              <ConsultationCard link={data.consult_url} lng={lng} />
              <div className="h-4 md:hidden"></div>
              {related?.map((item: BlogItemType) => {
                return (
                  <CardBlog key={item.id} blog={item} textBtn={"قراءة المزيد"} />
                )
              })}
          </div>
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": data?.site_name,
            author: data?.site_name,
            interactionStatistic: [
              {
                "@type": "InteractionCounter",
                interactionService: {
                  "@type": "WebSite",
                  name: "Twitter",
                  url: "http://www.twitter.com",
                },
                interactionType: "https://schema.org/ShareAction",
                userInteractionCount: "1203",
              },
              {
                "@type": "InteractionCounter",
                interactionType: "https://schema.org/CommentAction",
                userInteractionCount: "78",
              },
            ],
            name: blog.title,
          }),
        }}
      />
    </article>
  );
}
