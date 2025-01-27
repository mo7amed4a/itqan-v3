"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  // CarouselNext,
  // CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function CustomCarouselHome({
  children,
  lng,
}: {
  children: React.ReactNode;
  lng: string;
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const localActive = lng;

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  )
  return (
    <div className="mx-auto mb-4">
      <Carousel
        setApi={setApi}
      plugins={[plugin.current]}

        className="w-full px-4"
        opts={{ loop: true, direction: localActive === "ar" ? "rtl" : "ltr" }}
      >
        <CarouselContent className="px-10 md:px-0">{children}</CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground md:hidden">
        <div className="flex justify-center gap-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <span
              key={index}
              className={`size-3 rounded-full cursor-pointer ${
                current - 1 === index
                  ? "bg-primary"
                  : "bg-gray-300"
              }`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
