import Image from "next/image";
import { getData } from "@/lib/data";
import HeroSection from "./_components_home/hero";
import VideoTwo from "./_components_home/videoTwo";
import SectionApp from "./_components_home/section";
import CardSmall from "@/components/cards/card-small";
import LinkApp from "@/components/global/LinkApp";
import { Button } from "@/components/ui/button";
import Numbers from "./_components_home/numbers";
import Photos from "./_components_home/photos";
import RegistrationCompleteStep from "./_components_home/registration-complete-step";
import Videos from "./_components_home/videos";
import BlogForHome from "./_components_home/blogForHome";
import FormBooking from "./_components_home/form-booking";
import Stories from "./_components_home/stories";
import ImportantSp from "./_components_home/_sections/ImportantSp";
import TurkishSection from "./_components_home/_sections/TurkishSection";
import CyprusSection from "./_components_home/_sections/CyprusSection";
import { getTranslations } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";
import { siteURL } from "@/lib/axios";
import { headers } from "next/headers";

export async function generateMetadata() {
  const headerList = headers();
  const pathname = (await headerList).get("x-current-path");
  return {
    alternates: {
      canonical: siteURL + pathname,
      languages: {
        'x-default': `${siteURL}`,
        'en': `${siteURL}/en`,
        'fa': `${siteURL}/fa`,
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{
    locale: Locale;
  }>;
}) {
  const lng = (await params).locale;
  const {home: Home} = await getTranslations(lng);
  // @ts-ignore
  const { smallCard } = await getTranslations(lng);
  const response = await getData("/get_home", lng);
  const res_Settings = await getData("/get_settings", lng);

  const data = response?.data;
  const settings = res_Settings?.data;

  return (
    <main className="space-y-">
      {settings && <HeroSection locale={lng} jsonPromise={Home} data={settings} />}
      <section className="bg-white py-8">
        <VideoTwo
          url={settings?.consult_url}
          text={Home.videoCall.text}
          btn={Home.videoCall.booking_now}
          // lng={lng}
        />
        {/* <VideoCall dataVideoCall={t} locale={lng} /> */}
      </section>
      <div className="bg-[#f5f7f9] mt-10">
        <SectionApp
          title={Home.WhatService.title2}
          title2={Home.WhatService.title}
          className="container lg:max-w-[85vw] 6xl:!container mx-auto"
        >
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-4 px-4 md:px-0">
              {data &&
                data.services &&
                data.services.length > 0 &&
                data.services.slice(0, 4).map((e: any) => (
                  <div className="pb-8" key={e.id}>
                    <CardSmall lng={smallCard} services imageUrl={e.image} text={e.name} />
                  </div>
                ))}
            </div>
            <LinkApp href="/services" className="flex justify-center mt-7">
              <Button
                color="primary"
                size="xl"
                className="bg-primary px-10 lg:!px-28 hover:!scale-x-100 hover:bg-secondary hover:text-white"
              >
                {Home.WhatService.read_more}
              </Button>
            </LinkApp>
          </div>
        </SectionApp>
        {/* اهم التخصصات */}
        <ImportantSp home={Home} smallCard={smallCard} data={data} />

        {/* <SectionApp
          title={Home.specialties.title}
          className="container lg:max-w-[85vw] mx-auto"
        >
          <>
            <Carousel>
              <CarouselContent className="md:h-80">
                {data &&
                  data.specializations &&
                  data.specializations.length > 0 &&
                  data.specializations.map((e: any) => (
                    <CarouselItem
                      className="basis-1/2 md:basis-1/5 pb-8"
                      key={e.id}
                    >
                      <LinkApp href={`/programs/${e.slug}`}>
                        <CardSmall
                          university_count={e.university_count}
                          imageUrl={e.image}
                          text={e.name}
                        />
                      </LinkApp>
                    </CarouselItem>
                  ))}
              </CarouselContent>
            </Carousel>
            <LinkApp href="/programs" className="flex justify-center mt-7">
              <Button
                color="primary"
                size="xl"
                className="bg-primary px-10 lg:!px-28 hover:!scale-x-100 hover:bg-secondary hover:text-white"
              >
                {Home.WhatService.read_more}
              </Button>
            </LinkApp>
          </>
        </SectionApp> */}
        {/* ارقام واحصائيات */}
        <SectionApp
          title={Home.numbers.title}
          title2={Home.numbers.title2}
          className="container lg:max-w-[85vw] 6xl:!container mx-auto px-4 md:px-0"
        >
          <>
            <Numbers lng={lng} data={data?.settings} />
          </>
        </SectionApp>
        {/* موثوقون معتمدون */}
        <SectionApp
          title={Home.moth.title}
          title2={Home.moth.title2}
          className="container lg:max-w-[85vw] 6xl:!container mx-auto"
        >
          <>
            <Photos data={data?.university_logos} lng={lng}/>
          </>
        </SectionApp>
        {/* الجامعات التركية */}
          <TurkishSection home={Home} data={data} lng={lng} />
        {/* الجامعات القبرصية */}
          <CyprusSection home={Home} data={data} lng={lng} />
        <div className="bg-white py-10">
          <SectionApp
            title={Home.steps.title}
            title2={Home.steps.title2}
            className=""
            id="steps"
          >
            <>
              {settings && <RegistrationCompleteStep lng={lng} settings={settings} />}
            </>
          </SectionApp>
        </div>
        <div className="bg-white">
          <SectionApp
            title={Home.stories.title}
            title2={Home.stories.title2}
            className="container lg:max-w-[85vw] 6xl:!container  mx-auto px-4 md:px-0 text-center"
          >
            <>
              <span className="text-lg text-center md:text-4xl font-bold text-muted-foreground/90">
                {Home.stories.title3}
              </span>
              <Stories lng={lng} data={data?.testemonials} />
            </>
          </SectionApp>
        </div>
        {/* videos */}
        <div className="mb-20 bg-white py-20">
          <Videos lng={lng} data={data?.videos} />
        </div>

        <SectionApp
          title={Home.blogs.title}
          className="container lg:max-w-[85vw] 6xl:!container  mx-auto px-4 md:px-0"
        >
          <>
            <BlogForHome lng={lng} textBtn={Home.blogs.read_more} data={data?.blog} />
          </>
        </SectionApp>

        {/* {data && data.settings && <WhyItqan data={data.settings} t={t} />} */}
        <section className="flex md:h-[70vh] 6xl:!h-[30vh] 6xl:!container 6xl:!mx-auto px-4 md:px-0 bg-white">
          <div className="md:w-9/12 flex justify-center items-center w-full py-8 relative">
            <div className="w-full md:w-2/4 relative z-10">
              {settings && <FormBooking lng={Home} data={settings} />}
            </div>
            <Image
              src={"/images/bg-form.png"}
              alt="form"
              className="absolute size-full mx-auto opacity-60"
              width={2000}
              height={2000}
            />
          </div>
          <div className="hidden md:flex md:w-4/12 bg-primary items-center justify-center">
            <Image
              src={"/images/form-logo.png"}
              alt="form"
              className="w-10/12 h-72 mx-auto"
              width={700}
              height={700}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
