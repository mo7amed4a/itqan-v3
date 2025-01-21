import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getTranslations } from "@/lib/dictionary";
import React from "react";

export default async function CardVideo({
  university,
  lng
}: {
  university: any;
  lng:any
}) {
  const {university_details} = await getTranslations(lng);
  return university.video != null && (
     
    <div className="space-y-7 text-gray-500 pb-10">
      <Card className="border-none shadow-none container lg:max-w-[85vw] mx-auto">
        <CardHeader>
          <h2 className="text-lg md:text-xl font-bold my-2">
            {university_details.university.video} {university.name}
          </h2>
        </CardHeader>

        <CardContent className="h-[30rem]">
          <iframe
            className="size-full rounded-xl"
            width={1280}
            src={`https://www.youtube.com/embed/${
              university.video.split("=")[1]
            }`}
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </CardContent>
      </Card>
      </div>
    
  );
}
