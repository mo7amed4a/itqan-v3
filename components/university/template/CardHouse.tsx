import React from "react";
import HousingList from "@/components/housing/HousingList";
import { getTranslations } from "@/lib/dictionary";

export default async function CardHouse({
  student_housings,
  lng
}: {
  student_housings: any;
  lng: any
}) {
  const {university_details} = await getTranslations(lng);

  return (
    <div id="jj" className="container lg:max-w-[85vw] mx-auto px-4 lg:px-0 py-10 rounded-md">
          <h2 className="text-lg md:text-xl font-bold mb-4">
            {university_details.university.studentHousings}
          </h2>
          <div className="grid gap-4">
            {student_housings && student_housings?.length > 0 && (
              <HousingList lng={lng} housings={student_housings} />
            )}
          </div>
        </div>
  );
}
