"use client";
import Image from "next/image";
import React from "react"
import img1 from "../../public/images/heart.png";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
export default function CardSmall({
  imageUrl = img1,
  text = "title",
  services=false,
  university_count,
  lng
}: {
  imageUrl?: any;
  text?: string;
  services?: boolean,
  university_count?: number,
  lng: any
}) {
  return (
    <>
      <Card className="flex w-full border-none rounded-2xl shadow-none h-full py-6 px-3 shadow-all duration-300 cursor-pointer md:my-4 group flex-col justify-center">
        <CardHeader className="flex justify-center text-center items-center h-full space-y-5 p-0">
          <Image
            src={imageUrl.split("http://").join("https://")}
            alt="alt"
            width={500}
            height={500}
            className="size-16 md:size-36 group-hover:scale-105 duration-300"
          />
          <CardTitle className={`text-gray-500 group-hover:text-primary text-wrap w-full text-base md:text-2xl  ${services ? "font-normal" : "font-bold"}`}>
            {services ? <h3>{text}</h3> : <h3>{text}</h3>}
          </CardTitle>
          {university_count != 0 || university_count.toString() != "" && <CardDescription className="flex gap-2 items-center -mt-3 text-lg">
            <span>{lng.university}</span>
            <span>{university_count}</span>
          </CardDescription>}
        </CardHeader>
      </Card>
    </>
  );
}
