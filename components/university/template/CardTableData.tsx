import React from "react";
import StudyProgramsTabs from "../study-programs-tabs";
import { getData } from "@/lib/data";
import { getTranslations } from "@/lib/dictionary";
import FilterSelectTwo from "@/app/[locale]/search/_components/FilterSelectTwo";

export default async function CardTableData({
  study_programs,
  lng,
}: {
  study_programs: any;
  lng: any;
}) {
  const {university_details, home} = await getTranslations(lng);
  const res = await getData("/filters", lng);
  const filterData = res?.data

  return (
    <div>
          <div className="container lg:max-w-[85vw] mx-auto lg:py-24 px-4">
            <h2 className="text-2xl font-bold mb-4 pt-8 md:pt-0">
              {university_details.takh}
            </h2>
            <div className="flex justify-between items-start flex-col-reverse lg:flex-row-reverse">
              <StudyProgramsTabs
                university_detailsLang={university_details}
                studyPrograms={study_programs}
                lng={lng}
              />
              <div className="lg:w-1/4 -mt-3 w-full md:p-4">
                <FilterSelectTwo dataLang={home} filterData={filterData} lng={lng} />
              </div>
            </div>
          </div>
        </div>
  );
}
