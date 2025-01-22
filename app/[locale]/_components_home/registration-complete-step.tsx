import LinkApp from "@/components/global/LinkApp";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getTranslations } from "@/lib/dictionary";
import Image from "next/image";
import Timeline from "./timeline";

export default async function RegistrationCompleteStep({
  settings,
  lng
}: {
  settings: {
    step1_title: string;
    step1_link: string;
    step1_icon: string;
    step2_title: string;
    step2_link: string;
    step2_icon: string;
    step3_title: string;
    step3_link: string;
    step3_icon: string;
    step4_title: string;
    step4_link: string;
    step4_icon: string;
    step5_title: string;
    step5_link: string;
    step5_icon: string;
  };
  lng: any
}) {
  return (
    <div className="container lg:max-w-[85vw] 6xl:!container  mx-auto ">
      <Timeline lng={lng} settings={settings}/>
      <Carousel className="hidden md:block">
        <CarouselContent className="h-auto px-4 md:px-0">
          <CarouselItem className="basis-1/3 md:basis-1/5 pb-8">
            <Steps lng={lng}
              link={settings.step1_link}
              number={1}
              image={settings.step1_icon.split("http://").join("https://")}
              text={settings.step1_title}
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3 md:basis-1/5 pb-8">
            <Steps lng={lng}
              link={settings.step2_link}
              number={2}
              image={settings.step2_icon.split("http://").join("https://")}
              text={settings.step2_title}
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3 md:basis-1/5 pb-8">
            <Steps lng={lng}
              link={settings.step3_link}
              number={3}
              image={settings.step3_icon.split("http://").join("https://")}
              text={settings.step3_title}
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3 md:basis-1/5 pb-8">
            <Steps lng={lng}
              link={settings.step4_link}
              number={4}
              image={settings.step4_icon.split("http://").join("https://")}
              text={settings.step4_title}
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3 md:basis-1/5 pb-8">
            <Steps lng={lng}
              link={settings.step5_link}
              number={5}
              image={settings.step5_icon.split("http://").join("https://")}
              text={settings.step5_title}
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}

const Steps = async ({
  text,
  image,
  number,
  link,
  lng
}: {
  text: string;
  image: string;
  number: number;
  link: string;
  lng: any
}) => {
  const {home} = await getTranslations(lng);
  return (
    <Card className="w-full md:max-w-sm mx-auto gradient_color border-none group">
      <CardContent className="p-6 flex flex-col items-center text-center gap-4 md:gap-6 md:space-y-5">
        <div className="relative">
          <Image
            src={image}
            className="size-8 md:size-40 group-hover:translate-y-2 duration-300"
            alt=""
            width={100}
            height={100}
          />
        </div>
        <span className="text-xs md:text-xl font-bold text-gray-600 h-6">
          {text}
        </span>
        <LinkApp href={link}>
          <Button
            variant="default"
            className="bg-primary group-hover:bg-secondary text-white md:w-40 h-6 md:h-12"
          >
            {home.steps.read_more}
          </Button>
        </LinkApp>
        <div className="border-4 bg-transparent p-2 rounded-full">
          <span
            className={`${
              number === 1 ? "bg-secondary" : "bg-primary"
            } size-7 md:size-10 p-1 flex items-center font-bold justify-center text-center rounded-full text-white text-2xl md:text-xl`}
          >
            {number}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
