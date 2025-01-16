"use client";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import React from "react";

export interface SlideType {
  url: string;
  title: string;
}

export default function SliderApp({
  slides = [
    {
      url: "/images/img27.jpg",
      title: "Slide 1",
    },
    {
      url: "/assets/wallpaperflare.com_wallpaper2-Bsxvae_n.jpg",
      title: "Slide 1",
    },
  ],
  size,
  props,
}: {
  slides?: SlideType[];
  size?: "small";
  props?: any;
}) {
  return (
    <div
      className={`relative ${
        size === "small" ? "h-full" : "h-[75vh] md:h-[95vh]"
      } `}
    >
      <Carousel indicators={true} {...props}>
        {size != "small"
          ? slides.map((slide, index) => (
              <div key={index} className="flex h-full items-center justify-center bg-[url(https://adilbaba.online/assets/wallpaperflare.com_wallpaper2-Bsxvae_n.jpg)]">
                <div
                  className="absolute inset-0 h-full w-full flex justify-center items-center"
                >
                  <div className="bg-red-500">11111</div>
                  <button>weionion</button>
                </div>
                {/* <Image src={'https://adilbaba.online/assets/wallpaperflare.com_wallpaper2-Bsxvae_n.jpg'} className='w-full h-full bg-contain' alt="Image" width={1000} height={1000} /> */}
                {/* <Image src={slide.url === "/images/img27.jpg" ? slide.url : baseURL + slide.url} className='w-full' alt="Image" width={1000} height={1000} /> */}
              </div>
            ))
          : slides.map((slide, index) => (
              <Image
                key={index}
                src={slide.url === "/images/img27.jpg" ? slide.url : slide.url}
                alt={slide.title}
                className="w-full h-full bg-contain"
                width={600}
                height={400}
              />
            ))}
      </Carousel>
    </div>
  );
}
