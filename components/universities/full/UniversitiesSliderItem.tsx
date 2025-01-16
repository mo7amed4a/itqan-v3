import LinkApp from "@/components/global/LinkApp";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";


export default function   UniversitiesSliderItem({
    item,
    t,
    url
}: {
    item: any;
    t: any
    url: string
}) {
  return (
    <CarouselItem key={item.id} className="lg:px-4 w-screen">
      <LinkApp href={`/${url}/${item.slug}`} >
        <div className="w-full h-full group !bg-white rounded-2xl hover:shadow-md text-start">
          <div className="grid lg:grid-cols-2 w-full relative">
            <div className="space-y-3 text-lg text-gray-600 order-2 p-6 -mt-24 md:-mt-0 z-10">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                <Image
                  src={item.logo.split("http://").join("https://")}
                  alt="img"
                  width={300}
                  height={300}
                  className="w-24 h-24 rounded-full bg-white p-1"
                />
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-500">
                  {/* {t("universityInfo.name")} */}
                  {item.name}
                </h2>
                <div className="ms-auto flex gap-3">
                  {
                    item?.language_flags?.map((e:{flag: string}, index: number) => {
                      return <Image  key={index}
                            src={e.flag.split("http://").join("https://")}
                            alt="img"
                            width={300}
                            height={300}
                            className="!size-9 rounded-full"
                          />
                    })
                  }
                </div>
              </div>
              <p className="text-sm md:text-base line-clamp-2" dangerouslySetInnerHTML={{ __html: item.short_description }}></p>
              {/* <p>{t("universityInfo.description")}</p> */}
              {/* <div className="flex gap-x-4 text-primary text-xs md:text-base"> */}
                {/* <div className="flex gap-x-2">
                  <span>{t("universityInfo.establishmentYear")} :</span>
                  <span>{item.found_year}</span>
                </div>
                <div className="flex gap-x-2">
                  <span>{t("universityInfo.ranking")} :</span>
                  <span>{item.global_rank}</span>
                </div> */}
                {/* <div className="bg-gray-400/10 rounded-lg p-3 flex flex-col items-center space-y-4">
                  <span className="text-primary">سنة التأسيس</span>
                  <span className="text-secondary">2000</span>
                </div>


              </div> */}
              <section className="space-y-3 pt-3">
          <div className="w-full gap-2 md:items-center text-gray-800 text-xs md:text-sm grid grid-cols-4">
            <div className="bg-gray-400/10 rounded-lg p-3 flex flex-col items-center space-y-4">
              <span className="text-primary">سنة التأسيس</span>
              <span className="text-secondary">2000</span>
            </div>
            <div className="bg-gray-400/10 rounded-lg p-3 flex flex-col items-center space-y-4">
              <span className="text-primary">الترتيب عالميا</span>
              <span className="text-secondary">2000</span>
            </div>
            <div className="bg-gray-400/10 rounded-lg p-3 flex flex-col items-center space-y-4">
              <span className="text-primary">الترتيب محليا</span>
              <span className="text-secondary">2000</span>
            </div>
            <div className="bg-gray-400/10 rounded-lg p-3 flex flex-col items-center space-y-4">
              <span className="text-primary">عدد التخصصات</span>
              <span className="text-secondary">2000</span>
            </div>
          </div>
          <div className="bg-gray-400/10 text-gray-800 flex justify-between w-full gap-4 rounded-lg text-sm p-3">
            <span className="text-secondary">تبدأ الاسعار</span>
            <div className="flex items-center gap-2">
                <span>من</span>
                <span>{item.min_annual_fees}$</span>
            </div>
            <div className="flex items-center gap-2">
              <span>الى</span>
              <span>{item.max_annual_fees}$</span>
            </div>
          </div>
        </section>
        
              {/* <div className="space-y-2 text-sm md:text-base">
                <h2 className="text-secondary">{t("topMajors")} :</h2>
                <ul className="grid grid-cols-2 lg:flex flex-wrap gap-x-10 text-base text-gray-500">
                  {item?.first_programs &&
                    item?.first_programs.length > 0 &&
                    item?.first_programs.map((program: any, index: number) => {
                      return (
                        <li className="list text-sm md:text-base" key={index}>
                          {program}
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="flex gap-4 md:gap-8 text-sm md:text-base">
                <span className="text-secondary text-nowrap">
                  {t("universityInfo.startingPrices")} :{" "}
                </span>
                <span className="flex gap-x-2 text-sm md:text-sm">
                  <span>{t("universityInfo.priceRange.from")}</span>{" "}
                  <span>{item.min_annual_fees}$</span>
                </span>
                <span className="flex gap-x-2 text-sm md:text-sm">
                  <span>{t("universityInfo.priceRange.to")}</span>{" "}
                  <span>{item.max_annual_fees}$</span>
                </span>
              </div> */}
              <div className="flex justify-center">
                <Button
                  color="primary"
                  size={"xl"}
                  className="group-hover:bg-secondary group-hover:text-white"
                >
                  {t("universityInfo.registerNow")}
                </Button>
              </div>
            </div>
            <div className="p-2 md:p-4 w-[95%] mx-auto md:w-full relative flex items-center overflow-hidden order-1 lg:order-2 z-0">
              <Image
                src={item.image.split("http://").join("https://")}
                alt="img"
                width={300}
                height={300}
                className="w-[95%] md:w-full h-52 md:h-[27rem] object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </LinkApp>
    </CarouselItem>
  );
}
