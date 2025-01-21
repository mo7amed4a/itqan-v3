"use client";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { useEffect, useState } from "react";
// import FilterSelectHero from "./FilterHero";
import OpenBooking from "@/components/layouts/fixedCps/OpenBooking";
import LinkApp from "@/components/global/LinkApp";
import FilterSelectHero from "./FilterHero";

export default function HeroSection({
  data,
  jsonPromise,
  locale
}: {
  data: {
    slider_title: string;
    slider_title2: string;
    slider_title3: string;
    slider_bg_web: string;
    slider_image_web: string;
    slider_bg_mobile: string;
    slider_image_mobile: string;
  },
  jsonPromise: any,
  locale: string
}) {
  const lng = jsonPromise
  const [deviceType, setDeviceType] = useState<string | null>(null);
  useEffect(() => {
    const getDeviceType = () => {
      const ua = navigator.userAgent;
      if (/mobile/i.test(ua)) {
        return "Mobile";
      } else if (/iPad|Android|Touch/i.test(ua)) {
        return "Tablet";
      } else {
        return "Desktop";
      }
    };

    setDeviceType(getDeviceType());
  }, []);

  return (
    <section>
      <div
        style={{
          backgroundImage:
            deviceType === "Mobile"
              ? `url(${data?.slider_bg_mobile})`
              : `url(${data?.slider_bg_web})`,
        }}
        className={`bg-hero px-6 overflow-y-hidden py-10 lg:py-0`}
      >
        <div
          className={`h-[70vh] md:h-[85vh] max-w-[90vw] xl:container mx-auto px-4 md:px-10 flex flex-col md:flex-row ltr:md:flex-row-reverse items-center`}
        >
          <div
            className={`w-full lg:w-3/4 flex flex-col items-center text-center space-y-8`}
          >
            <h1 className="text-xl md:text-3xl lg:text-[2.5rem] font-bold text-primary text-opacity-80 !leading-[1.35]">
              {/* {dataLang("hero.title")} */}
              {data?.slider_title}
              {/* {JSON.stringify(data)} */}
            </h1>
            <h2 className="text-lg md:text-xl lg:text-[2.5rem] text-secondary font-bold">
              {/* {dataLang("hero.subtitle")} */}
              {data?.slider_title2}
            </h2>
            <h2 className="text-lg md:text-xl lg:text-[2.5rem] text-gray-500 font-bold">
              {/* {dataLang("hero.subtitle")} */}
              {data?.slider_title3}
            </h2>
            {deviceType === "Mobile" && data.slider_image_mobile && (
              <Image
                src={data.slider_image_mobile}
                className="size-64"
                alt="hero"
                width={2500}
                height={2500}
              />
            )}
            <div className="space-y-4 flex flex-col w-2/3 md:w-2/4 px-0 py-0 text-[10px] md:px-2 md:py-1 md:text-base">
              <OpenBooking>
                <Button size={"xl"} variant={"secondary"} className="w-full">
                  {lng.hero.register_now}
                </Button>
              </OpenBooking>
              <LinkApp href="#steps" className="hidden md:block">
                <Button
                  size={"xl"}
                  variant={"outline"}
                  className="border border-primary text-primary w-full"
                >
                  {lng.hero.steps}
                </Button>
              </LinkApp>
              {/* <LinkApp href="/turkish-universities" className="hidden md:block">
                <Button size={"xl"} className="w-full">
                  {dataLang("hero.choose_study")}
                </Button>
              </LinkApp> */}
            </div>
          </div>
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0 h-full ltr:-scale-x-100 flex items-end justify-end">
            {deviceType === "Desktop" && data.slider_image_web && (
              <Image
                src={data.slider_image_web}
                className="h-[78%] w-[85%] lg:w-[78%]"
                alt="hero"
                width={1000}
                height={1000}
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        <FilterSelectHero lng={locale} dataLang={jsonPromise}/>
      </div>
    </section>
  );
}
