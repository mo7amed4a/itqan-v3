import React from "react";
import { ImageModal } from "./ImageModal";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getTranslations } from "@/lib/dictionary";

export default async function CardAlbum({
  university,
  lng,
}: {
  university: any;
  lng: any;
}) {
  const {university_details} = await getTranslations(lng);
  return university?.photo_album?.length > 0 && (
    <div className="space-y-7 text-gray-500 pb-10">
      {university.photo_album.length > 0 && (
        <div className="container lg:max-w-[85vw] mx-auto">
          <div className="py-10">
            <h2 className="text-lg md:text-xl font-bold px-4">
              {university_details.university.photo}
            </h2>
          </div>  
          <ScrollArea className="lg:hidden w-full whitespace-nowrap" dir={lng === "ar" || lng === "fa" ? "rtl" : "ltr"}>
            <div className="flex w-max gap-x-4 p-4">
              <div className="size-52 relative group">
                <ImageModal
                   key={(Math.random() * 100)+ 2}
                  src={university.photo_album[3]
                    ?.split("http://")
                    .join("https://")}
                  alt="Main photo"
                />
                <div className="absolute inset-0 bg-[#21837F]/50 group-hover:hidden transition-opacity duration-300 rounded-2xl"></div>
              </div>
              <div className="size-52 relative group">
                <ImageModal
                   key={(Math.random() * 100)+ 3}
                  src={university.photo_album[2]
                    ?.split("http://")
                    .join("https://")}
                  alt="Main photo"
                />
                <div className="absolute inset-0 bg-[#21837F]/50 group-hover:hidden transition-opacity duration-300 rounded-2xl"></div>
              </div>
              <div className="size-52 relative group">
                <ImageModal
                   key={(Math.random() * 100)+ 1}
                  src={university.photo_album[1]
                    ?.split("http://")
                    .join("https://")}
                  alt="Main photo"
                />
                <div className="absolute inset-0 bg-[#21837F]/50 group-hover:hidden transition-opacity duration-300 rounded-2xl"></div>
              </div>

              <div className="size-52 relative group">
                <ImageModal
                  key={(Math.random() * 100)+ 4}
                  src={university.photo_album[0]
                    ?.split("http://")
                    .join("https://")}
                  alt="Main photo"
                />
                <div className="absolute inset-0 bg-[#21837F]/50 group-hover:hidden transition-opacity duration-300 rounded-2xl"></div>
              </div>
            </div>

            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
          <div className="hidden lg:flex flex-col md:flex-row items-stretch gap-4 md:h-[40rem] rounded-xl px-4">
            <div className="flex flex-col md:w-1/3 gap-y-2 -mt-1">
              <div className="w-full h-1/3 relative group">
                <ImageModal
                  key={(Math.random() * 100)+ 5}
                  src={university.photo_album[3]
                    ?.split("http://")
                    .join("https://")}
                  alt="Main photo"
                />
                <div className="absolute inset-0 bg-[#21837F]/50 group-hover:hidden transition-opacity duration-300 rounded-2xl"></div>
              </div>
              <div className="w-full h-1/3 relative group">
                <ImageModal
                   key={(Math.random() * 100)+ 6}
                  src={university.photo_album[2]
                    ?.split("http://")
                    .join("https://")}
                  alt="Main photo"
                />
                <div className="absolute inset-0 bg-[#21837F]/50 group-hover:hidden transition-opacity duration-300 rounded-2xl"></div>
              </div>
              <div className="w-full h-1/3 relative group">
                <ImageModal
                  key={(Math.random() * 100)+ 7}
                  src={university.photo_album[1]
                    ?.split("http://")
                    .join("https://")}
                  alt="Main photo"
                />
                <div className="absolute inset-0 bg-[#21837F]/50 group-hover:hidden transition-opacity duration-300 rounded-2xl"></div>
              </div>
            </div>

            <div className="md:w-2/3 h-full relative group">
              <ImageModal
                 key={(Math.random() * 100)+ 8}
                src={university.photo_album[0]
                  ?.split("http://")
                  .join("https://")}
                alt="Main photo"
              />
              <div className="absolute inset-0 bg-[#21837F]/50 group-hover:hidden transition-opacity duration-300 rounded-2xl"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
