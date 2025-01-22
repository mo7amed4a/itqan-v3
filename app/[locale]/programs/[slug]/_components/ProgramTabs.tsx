import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewContent from "./OverviewContent";
import { getTranslations } from "@/lib/dictionary";
import FilterSelectTwo from "@/app/[locale]/search/_components/FilterSelectTwo";

type ProgramTabsProps = {
  children: React.ReactNode;
  locale: any
  overview:any
  housings?:string | null
};

export default async function ProgramTabs({ children , locale, overview, housings=null}: ProgramTabsProps) {
  const lng= locale
  const {program} = await getTranslations(lng);
  const {home:dataLangHome} = await getTranslations(lng);
  return (
    <>
      <Tabs
        defaultValue="programs"
        className="w-full"
        dir={lng === "ar" || lng === "fa" ? "rtl" : "ltr"}
      >
        <TabsList className="mb-4 gap-4 flex justify-start w-full bg-transparent">
          <TabsTrigger
            value="programs"
            className="bg-transparent border rounded-full px-3 py-1.5"
          >
            {housings || program.title}
          </TabsTrigger>
          {overview && <TabsTrigger
            value="overview"
            className="bg-transparent border rounded-full px-3 py-1.5"
          >
            {program.overview}
          </TabsTrigger>}
        </TabsList>
        <TabsContent value="programs">
          <div className="flex flex-col lg:flex-row gap-4">
            {!housings && <div className="lg:w-96">
              <FilterSelectTwo dataLang={dataLangHome} lng={lng} />
            </div>}
            <div className="w-full">{children}</div>
          </div>
        </TabsContent>
        <TabsContent value="overview">
          {overview && <OverviewContent overview={overview} lng={lng} />}
        </TabsContent>
      </Tabs>
      {overview && <OverviewContent overview={overview} lng={lng} />}
    </>
  );
}
