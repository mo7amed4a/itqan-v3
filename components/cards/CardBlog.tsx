import Image from "next/image";
import React from "react";

export interface BlogItemType {
  id: number;
  blog_category_id: number;
  slug: string;
  is_slider: number;
  image: string;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  views: number;
  meta_description: string
}

// import img1 from "../../public/images/for-blog.png";
import LinkApp from "../global/LinkApp";
import { formatDate } from "../../lib/moment";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Eye } from "lucide-react";
export default function CardBlog({
  blog,
  textBtn
}: {
  blog: BlogItemType;
  textBtn: string
}) {
  return (
    <LinkApp href={`/blogs/${blog.slug}`}>
      <Card className="flex w-full border-none rounded-3xl shadow-none shadow-all px-2 md:px-3 duration-300 cursor-pointer pt-4 md:my-4 group flex-col justify-start">
          {/* <div className="bg-[#21837F]/50 rounded-xl size-full absolute inset-0 z-0"></div> */}
        <CardHeader className="h-40 md:h-64 relative p-0 rounded-3xl group-hover:before:bg-transparent before:bg-[#21837F]/40 before:absolute before:inset-0 before:transition-all before:duration-300 before:size-full before:z-10 overflow-hidden">
          <Image
            src={`${blog.image.split("http://").join("https://")}`}
            alt="alt"
            width={500}
            height={500}
            className="size-full rounded-3xl absolute inset-0"
          />
        </CardHeader>
        <CardContent className="space-y-4 px-0 py-6">
          <CardTitle className="text-sm md:text-2xl font-bold text-gray-500 group-hover:text-primary text-wrap w-full line-clamp-2">
            <h3>{blog.title}</h3>
          </CardTitle>
          <div className="md:h-11">
            <p
              className="text-xs md:text-base text-gray-400 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: blog?.meta_description }}
            ></p>
          </div>
          <div className="flex gap-2 justify-end">
            <Badge className="rounded-md font-bold text-primary bg-gray-200/40 backdrop-blur-md flex gap-2 items-center">
            <Eye className="text-red-500"/> <span>{blog?.views}</span>
            </Badge>
            <Badge className="rounded-md font-bold text-primary bg-gray-200/40 backdrop-blur-md">
              {formatDate(blog.created_at).split('/').join('.')}
            </Badge>
          </div>
          <div className="flex justify-center">
            <Button
              color="primary"
              className="w-40 h-8 md:!h-auto md:py-3 group-hover:bg-secondary font-bold bg-primary text-white"
            >
              {textBtn}
            </Button>
          </div>
        </CardContent>
      </Card>
    </LinkApp>
  );
}
