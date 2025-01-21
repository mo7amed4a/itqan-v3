"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { SlBadge } from "react-icons/sl";
import { FaLanguage } from "react-icons/fa6";
import { getData } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";

export default function FilterSelectHero({
  col=false,
  filterData=null,
  dataLang,
  lng
}: {
  col?: boolean;
  // @typescript-eslint/no-explicit-any
  filterData?: any
  dataLang:any
  lng: string
}) {
  // @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(filterData || null)

  useEffect(() => {
    if(!filterData) {
      (async() => {
        const response = await getData("/filters", lng);
        setData(response?.data)
        // console.log("response?.dataresponse?.data", response?.data);
      })()
    }
  }, [])
  const router = useRouter();
  const [filters, setFilters] = useState({
    specialization: "",
    level: "",
    language: "",
    years: "",
    countries: "",
    price_from: "",
    price_to: ""
  });

  // Function to update filter values
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value === "null" ? "" : value,
    }));
  };
  

  // Function to navigate to the desired URL
  const handleSearch = () => {
    const queryParams = new URLSearchParams(filters).toString();
    router.push(lng ==="ar" || !lng ? `/search?${queryParams}` : `/${lng}/search?${queryParams}`);
  };

  // console.log("datadatadatadata", data);
  
  return data ? ( 
    <div className="container md:max-w-[85%] 6xl:!container  mx-auto px-4 py-10 md:px-0">
      {/* Select Specialization */}
      <div className={`lg:mt-12 grid grid-cols-2 p-4 rounded ${col ? '' : 'md:grid-cols-5 rounded-xl p-5'} gap-4`}>

      <Select
        onValueChange={(value) => handleFilterChange("specialization", value)}
      >
        <SelectTrigger className="rtl:flex-row-reverse h-14 text-primary">
          <div className="flex gap-x-2 items-center rtl:flex-row-reverse text-gray-600">
            <HiOutlineAdjustmentsHorizontal className="size-5 text-primary" />
            {dataLang.hero.select_country}
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="w-full text-primary">{dataLang.hero.select_country_free}</SelectLabel>
            {data?.countries?.map((e: {id: string, name: string}, i: number) => (
              <SelectItem key={i} value={e.id}>
                <p>{e.name}</p>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleFilterChange("specialization", value)}
      >
        <SelectTrigger className="rtl:flex-row-reverse h-14 text-primary">
          <div className="flex gap-x-2 items-center rtl:flex-row-reverse text-gray-600">
            <HiOutlineAdjustmentsHorizontal className="size-5 text-primary" />
            <SelectValue placeholder={dataLang.hero.select_specialty} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="w-full text-primary">
              {dataLang.hero.select_specialty}
            </SelectLabel>
            <SelectItem value={'null'}>{dataLang.hero.select_none}</SelectItem>
            {data?.specializations?.map((e: {id: string, name: string}, i: number) => (
              <SelectItem key={i} value={e.id}>
                <p>{e.name}</p>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Select Level */}
      <Select onValueChange={(value) => handleFilterChange("level", value)}>
        <SelectTrigger className="rtl:flex-row-reverse h-14">
        <div className="flex gap-x-2 items-center rtl:flex-row-reverse text-gray-600">
            <FaLanguage className="size-5 text-primary" />
            <SelectValue placeholder={dataLang.hero.select_study_level} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{dataLang.hero.select_study_level}</SelectLabel>
            <SelectItem value={'null'}>{dataLang.hero.select_none}</SelectItem>
            {data?.levels?.map((e: {id: string, name: string}, i: number) => (
              <SelectItem key={i} value={e.id}>
                {e.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilterChange("language", value)}>
        <SelectTrigger className="rtl:flex-row-reverse h-14">
        <div className="flex gap-x-2 items-center rtl:flex-row-reverse text-gray-600">
            <SlBadge className="size-5 text-primary" />
          <SelectValue placeholder={dataLang.hero.select_language} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{dataLang.hero.select_language}</SelectLabel>
            <SelectItem value={'null'}>{dataLang.hero.select_none}</SelectItem>
            {data?.languages?.map((e: {id: string, name: string}, i: number) => (
              <SelectItem className="" key={i} value={e.id}>
                {e.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilterChange("language", value)}>
        <SelectTrigger className="rtl:flex-row-reverse h-14">
        <div className="flex gap-x-2 items-center rtl:flex-row-reverse text-gray-600">
            <SlBadge className="size-5 text-primary" />
          <SelectValue placeholder={dataLang.hero.select_cost} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{dataLang.hero.cost}</SelectLabel>
            <SelectItem value={'null'}>1000$</SelectItem>
            <SelectItem value={'null'}>1500$</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
        
      <Button
            // size={"xl"}
            color="primary"
            className="bg-primary hover:!scale-x-100 py-4 w-auto h-auto mb-4 md:hidden"
            onClick={handleSearch}
            // disabled={
            //   !filters.specialization || !filters.level || !filters.language
            // }
          >
            {dataLang.hero.search}
          </Button>
      </div>

      {/* Search Button */}
      <div className="justify-center items-center hidden md:flex">
          <Button
            size={"xl"}
            color="primary"
            className="bg-secondary hover:!scale-x-100 py-4 w-80 mb-4"
            onClick={handleSearch}
            // disabled={
            //   !filters.specialization || !filters.level || !filters.language
            // }
          >
            {dataLang.hero.search}
          </Button>
      </div>

    </div>
  ) : (
    <div className={`mt-6 grid grid-cols-1 ${col ? '' : 'md:grid-cols-3'} gap-4 rounded p-4`}>
      <Skeleton className="h-12 w-full rounded-xl bg-white" />
      <Skeleton className="h-12 w-full rounded-xl bg-white" />
      <Skeleton className="h-12 w-full rounded-xl bg-white" />
      
      {!col ? <div className="flex col-span-full justify-center">
        <Skeleton className="h-12 w-2/4" />
      </div> : <Skeleton className="h-12 w-full rounded-xl bg-white" /> }
    </div>
  );
}
