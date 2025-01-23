"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { FaLanguage } from "react-icons/fa6";
import { getData } from "@/lib/data";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { SlBadge } from "react-icons/sl";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function FilterSelectTwo({
  lng,
  dataLang,
  filterData = null
}: {
  lng: string;
  dataLang: any
  filterData?: any
}) {
  const [data, setData] = useState<any>(filterData || null)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    if (!filterData) {
      (async () => {
        const response = await getData("/filters", lng);
        setData(response?.data)
      })()
    }
  }, [filterData, lng])

  const router = useRouter();
  const [filters, setFilters] = useState({
    specialization: [] as string[],
    level: [] as string[],
    language: [] as string[],
    years: [] as string[],
    price_from: "",
    price_to: ""
  });

  const handleFilterChange = (field: string, value: string, checked: boolean) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: checked
        ? [...prevFilters[field as keyof typeof prevFilters], value]
        : (prevFilters[field as keyof typeof prevFilters] as string[]).filter((item) => item !== value)
    }));
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
  
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        // تحويل المصفوفة إلى سلسلة مفصولة بفواصل
        queryParams.append(key, value.join(','));
      } else if (value) {
        // @ts-ignore
        queryParams.append(key, value);
      }
    });
    const url = decodeURIComponent(queryParams.toString())
    router.push(`/${lng}/search?${url}`);
  };
  const renderCheckboxGroup = (field: string, items: any[]) => (
    <div className="space-y-2">
      {/* <div className="flex items-center gap-2 text-primary">
        {icon}
        <span className="font-semibold">{dataLang(`hero.${field}`)}</span>
      </div> */}
      <ScrollArea className={`w-full ${items.length > 6 ? "h-40" : "h-auto" }`}>
        <div className="flex flex-col gap-2 items-start justify-start w-full ps-3" dir={lng === "ar" || lng === "fa" ? "rtl" : "ltr"} >
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-600">
              <Checkbox
                id={`${field}-${item.id}`}
                checked={filters[field as keyof typeof filters].includes(item.id)}
                onCheckedChange={(checked) => handleFilterChange(field, item.id, checked as boolean)}
              />
              <Label htmlFor={`${field}-${item.id}`}>{item.name}</Label>
            </div>
          ))}
        </div>
        {/* <ScrollBar /> */}
      </ScrollArea>
    </div>
  );

  return data ? (
    <div className={`sticky top-0 inset-0 dlg:mt-12 grid grid-cols-1 rounded gap-4 bg-white`}>
      <Accordion type="single" className="w-full !p-0" collapsible={!isDesktop} defaultValue={isDesktop ? "item-1" : undefined} >
        <AccordionItem className="border-none !px-0" value="item-1">
          <AccordionTrigger small className="p-2 md:p-3 text-secondary text-xs md:text-sm hover:shadow-none border rounded-md">
            <div className="flex items-center gap-2">
              <Filter className="size-4 md:size-5 " />
              <span className="font-bold text-secondary">{dataLang.filter}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="!px-0 !m-0 w-full">
              <Accordion type="multiple" className="w-full px-0 grid md:grid-cols-1 gap-3 items-center">
                <AccordionItem value="specialization" className="border rounded-md">
                  <AccordionTrigger small className="p-2 md:p-3  text-primary text-xs md:text-sm hover:shadow-none">
                    <div className="flex items-center gap-2">
                      <HiOutlineAdjustmentsHorizontal className="size-4 md:size-5" />
                      {dataLang.hero.select_specialty}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {renderCheckboxGroup("specialization", data.specializations)}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="level" className="border rounded-md">
                  <AccordionTrigger small className="p-2 md:p-3  text-primary text-xs md:text-sm hover:shadow-none">
                    <div className="flex items-center gap-2">
                      <FaLanguage className="size-4 md:size-5" />
                      {dataLang.hero.select_study_level}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {renderCheckboxGroup("level", data.levels)}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="language" className="border rounded-md">
                  <AccordionTrigger small className="p-2 md:p-3  text-primary text-sm hover:shadow-none">
                    <div className="flex items-center gap-2">
                      <SlBadge className="size-4 md:size-5" />
                      {dataLang.hero.select_language}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {renderCheckboxGroup("language", data.languages)}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="years" className="border rounded-md p-0">
                  <AccordionTrigger small className="p-2 md:p-3 text-primary text-sm hover:shadow-none">
                    <div className="flex items-center gap-2">
                      <MdOutlineAccessTimeFilled className="size-4 md:size-5" />
                      {dataLang.hero.select_years}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-2">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Checkbox
                            id={`years-${i + 1}`}
                            checked={filters.years.includes(`${i + 1}`)}
                            onCheckedChange={(checked) => handleFilterChange("years", `${i + 1}`, checked as boolean)}
                          />
                          <Label htmlFor={`years-${i + 1}`}>{i + 1}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cost" className="border rounded-md">
                  <AccordionTrigger small className="p-2 md:p-3  text-primary text-sm hover:shadow-none">
                    <span className="text-sm">{dataLang.hero.select_cost}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-between gap-3 text-gray-600">
                      <div className="flex flex-col items-center gap-2">
                        <span>{dataLang.hero.down}</span>
                        <Input
                          onChange={(e) => setFilters(prev => ({ ...prev, price_from: e.target.value }))}
                          placeholder={dataLang.hero.down}
                        />
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <span>{dataLang.hero.up}</span>
                        <Input
                          onChange={(e) => setFilters(prev => ({ ...prev, price_to: e.target.value }))}
                          placeholder={dataLang.hero.up}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <Button
                  size={"xl"}
                  color="primary"
                  className="hover:bg-secondary hover:!scale-x-100 md:py-4 md:mt-4"
                  onClick={handleSearch}
                >
                  {dataLang.hero.search}
                </Button>
              </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>


    </div>
  ) : (
    <div className={`mt-6 grid grid-cols-1 md:grid-cols-3 bg-gray-900/10'} gap-4 rounded p-4`}>
      <Skeleton className="h-12 w-full rounded-xl bg-white" />
      <Skeleton className="h-12 w-full rounded-xl bg-white hidden md:block" />
      <Skeleton className="h-12 w-full rounded-xl bg-white hidden md:block" />
    </div>
  );
}

