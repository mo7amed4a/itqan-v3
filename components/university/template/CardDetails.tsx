import React from "react";
import ReadMore from "../ReadMore";
import { getTranslations } from "@/lib/dictionary";

export default async function CardDetails({
  university,
  bg=false,
  lng
}: {
  university:any
  bg?: boolean;
  lng:any
}) {
  const {university_details} = await getTranslations(lng);
  return (
    university?.description && (
      <div className={`px-4 py-10 mt-10 ${bg === false && "bg-white"} rounded-md`}>
        <div className="container lg:max-w-[85vw] mx-auto">
          <h2 className="text-lg md:text-xl font-bold mb-4">
            {university_details.description} {university.name}
          </h2>
          <ReadMore
            text={university?.description}
            readMore={university_details.readMore}
            readLess={university_details.readLess}
          />
        </div>
      </div>
    )
  );
}
