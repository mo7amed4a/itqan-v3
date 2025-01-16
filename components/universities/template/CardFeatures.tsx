// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// // import { getTranslations } from "next-intl/server";

// // type SpecificationItem = {
// //   id: number;
// //   name: string;
// // };

// // type Specifications = Record<string, SpecificationItem> | SpecificationItem[];

// export default async function CardFeatures({
//   university,
//   specifications,
// }: {
//   university: {
//     name: string;
//   };
//   specifications: any;
// }) {
//   const t = await getTranslations("university_details");
//   return (
//     specifications && (
//       <div className="space-y-7 text-gray-500 mt-10 py-10 pb-2 container lg:max-w-[85vw] mx-auto">
//         <h2 className="text-lg md:text-xl font-bold px-4">
//           {t("university.features")} {university.name}
//         </h2>
//         <div className="!w-[94%] md:!w-4/5 mx-auto space-y-4">
//           {Array.isArray(specifications)
//             ? specifications.map((item: any, index: number) =>
//                 FeatureItem({ item, index })
//               )
//             : Object.keys(specifications).map((key, index) =>
//                 FeatureItem({ item: specifications[key], index })
//               )}
//         </div>
//       </div>
//     )
//   );
// }

// const FeatureItem = ({
//   item,
//   index,
// }: {
//   item: { id: string; name: string };
//   index: number;
// }) => {
//   return (
//     <Card
//       key={index}
//       className="flex items-center border-none shadow-none gap-4 p-[20px] md:gap-6 group hover:shadow-xl"
//     >
//       <CardHeader className="p-0">
//         <div className="size-12 text-3xl rounded-full bg-primary text-center flex items-center justify-center text-white group-hover:bg-secondary">
//           <p className="p-[20px] mt-2">{index + 1}</p>
//         </div>
//       </CardHeader>
//       <CardContent className="p-0">{item.name}</CardContent>
//     </Card>
//   );
// };

import React from 'react'

export default function CardFeatures() {
  return (
    <div>CardFeatures</div>
  )
}
