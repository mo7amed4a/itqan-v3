import LinkApp from "@/components/global/LinkApp";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { getTranslations } from "@/lib/dictionary";
import Image from "next/image";
import React from "react";

export default async function UniversitiesSliderItem({
  item,
  url,
  lng
}: {
  item: any;
  url: string;
  lng: any
}) {
  const {cypriot_universities} = await getTranslations(lng);
  return (
    <CarouselItem key={item.id} className="lg:px-4 w-screen">
      <LinkApp href={`/${url}/${item.slug}`}>
        <div className="w-full h-full group !bg-white rounded-2xl hover:shadow-md text-start">
          <div className="grid lg:grid-cols-2 w-full relative">
            <div className="space-y-3 text-lg text-gray-600 order-2 p-6 -mt-24 md:-mt-0 z-10">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                <Image
                  src={item.logo.split("http://").join("https://")}
                  alt="img"
                  width={500}
                  height={500}
                  className="w-24 h-24 rounded-full bg-white p-1"
                />
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-500">
                  {/* {t("universityInfo.name")} */}
                  {item.name}
                </h2>
                <div className="ms-auto flex gap-3">
                  {item?.language_flags?.map(
                    (e: { flag: string }, index: number) => {
                      return (
                        <Image
                          key={index}
                          src={e.flag.split("http://").join("https://")}
                          alt="img"
                          width={500}
                          height={500}
                          className="!size-9 rounded-full"
                        />
                      );
                    }
                  )}
                </div>
              </div>
              <p
                className="text-sm md:text-base line-clamp-2"
                dangerouslySetInnerHTML={{ __html: item.short_description }}
              ></p>

              <section className="space-y-3 pt-3">
                <div className="w-full gap-2 md:items-center text-gray-800 text-xs md:text-sm grid grid-cols-4">
                  <div className="bg-gray-400/10 rounded-lg p-1 md:p-3 flex flex-col items-center md:space-y-4">
                    <span className="text-primary">{cypriot_universities.years_1}</span>
                    <span className="text-secondary">{item.found_year}</span>
                  </div>
                  <div className="bg-gray-400/10 rounded-lg p-1 md:p-3 flex flex-col items-center md:space-y-4">
                    <span className="text-primary">{cypriot_universities.rank_1}</span>
                    <span className="text-secondary">{item?.global_rank}</span>
                  </div>
                  <div className="bg-gray-400/10 rounded-lg p-1 md:p-3 flex flex-col items-center md:space-y-4">
                    <span className="text-primary">{cypriot_universities.years_2}</span>
                    <span className="text-secondary">{item?.local_rate}</span>
                  </div>
                  <div className="bg-gray-400/10 rounded-lg p-1 md:p-3 flex flex-col items-center md:space-y-4">
                    <span className="text-primary">{cypriot_universities.count_1}</span>
                    <span className="text-secondary">{item?.first_programs?.length}</span>
                  </div>
                </div>
                <div className="bg-gray-400/10 text-gray-800 flex text-xs md:text-sm flex-col md:flex-row justify-between w-full gap-4 rounded-lg p-1.5 md:p-3">
                  <span className="text-secondary">{cypriot_universities.start_price}</span>
                  <div className="flex justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span>{cypriot_universities.from}</span>
                        <span>{item.min_annual_fees}$</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{cypriot_universities.to}</span>
                      <span>{item.max_annual_fees}$</span>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex justify-center">
                <Button
                  color="primary"
                  size={"xl"}
                  className="group-hover:bg-secondary group-hover:text-white"
                >
                  {cypriot_universities.universityInfo.registerNow}
                </Button>
              </div>
            </div>
            <div className="p-2 md:p-4 w-[95%] mx-auto md:w-full relative flex items-center overflow-hidden order-1 lg:order-2 z-0">
              <Image
                src={item.image.split("http://").join("https://")}
                alt="img"
                width={1200}
                height={1200}
                className="w-[95%] md:w-full h-52 md:h-[27rem] object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </LinkApp>
    </CarouselItem>
  );
}
