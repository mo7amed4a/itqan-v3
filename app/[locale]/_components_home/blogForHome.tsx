import CardBlog from "@/components/cards/CardBlog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";

type BlogsType = {
  id: 6;
  blog_category_id: 3;
  slug: "digital-learning-with-etqan-the-future-starts-now";
  locale: "ar";
  title: "مدونة عربي مدونة عربي مدونة عربي مدونة عربي مدونة عربي مدونة عربي";
  content: '<p id="main-toc" name="tableOfContents"><strong>Table of Contents</strong></p>\r\n\r\n<p><a href="#+++++++">عنوان ١</a></p>\r\n\r\n<p><a href="#+++++++">عنوان ٢</a></p>\r\n\r\n<p><a href="#+++++++">عنوان ٣</a></p>\r\n\r\n<hr id="hr-toc" name="tableOfContents" />\r\n<h2 id="+++++++" name="+++++++">عنوان ١</h2>\r\n\r\n<p>مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;</p>\r\n\r\n<h2 id="+++++++" name="+++++++">عنوان ٢</h2>\r\n\r\n<p>مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<h2 id="+++++++" name="+++++++">عنوان ٣</h2>\r\n\r\n<p>مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;مدونة عربي&nbsp;</p>';
  views: 27;
  created_by: "General admin";
  is_slider: 1;
  image: "https://admin.itqaneducation.com/storage/blogs/7iJSHSFnsqQnBrNMhbHApjMZLEATNxsaw7iqhgrZ.webp";
  created_at: "2024-11-20T19:55:50.000000Z";
  updated_at: "2025-01-04T13:02:08.000000Z";
  meta_tags: "Digital Learning";
  meta_description: "Digital Learning";
}[];
export default function BlogForHome({
  data,
  textBtn,
}: {
  data: BlogsType;
  textBtn: string;
}) {
  return data && (
    <Carousel>
      <CarouselContent className="h-auto px-10 md:px-0">
        {data?.map((item) => (
          <CarouselItem
            key={item.id}
            className="md:basis-1/3 lg:basis-1/4 pb-8"
          >
            <CardBlog textBtn={textBtn} blog={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
