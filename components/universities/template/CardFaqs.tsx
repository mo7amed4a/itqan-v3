import React from "react";
import { FaqsComponent } from "../TabApp";
import { getTranslations } from "@/lib/dictionary";

export default async function CardFaqs({
  faqs,
  student_housings,
  study_programs,
  lng
}: {
  faqs: any;
  student_housings: any;
  study_programs: any;
  lng:any
}) {
  const {university_details} = await getTranslations(lng);
  return (
    <div className="container lg:max-w-[85vw] mx-auto px-4 lg:px-0 py-10 mt-10 space-y-6">
      <h2 className="text-lg md:text-xl font-bold">{university_details.university.faqs}</h2>
      <div className="lg:w-3/5">
        <FaqsComponent
          studyPrograms={study_programs}
          studentHousings={student_housings}
          faqs={faqs}
        />
      </div>
    </div>
  );
}
