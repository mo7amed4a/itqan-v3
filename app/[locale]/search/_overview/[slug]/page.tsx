// import { getData } from "@/lib/data";
// import React from "react";
// import { Button } from "@/components/ui/button";
// import LinkApp from "@/components/global/LinkApp";
// import CardDetails from "@/components/university/template/CardDetails";
// import Image from "next/image";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ locale: string, slug: string }>;
// }) {
//   const locale= (await params).locale
//   const slug= (await params).slug
//   let data;
//   const response = await getData("/get_settings", locale);
//   data = response?.data;

//   let uniData: any = null;
//   const uniResponse = await getData(`/university/${slug}/details`, locale);
//   uniData = uniResponse?.data;

//   return {
//     title: uniData?.university?.name + " - " + data?.site_name,
//   };
// }

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ locale: string, slug: string }>;
// }) {
//   const locale = (await params).locale;
//   const slug = (await params).slug;
//   // const {program} = await getTranslations()
//   // const DataLang = await getTranslations("university_details");

//   let specialization: any = null;
//   const uniResponse = await getData(`/specialization/${slug}`, locale);
//   specialization = uniResponse?.data?.specialization
  

//   if (!specialization) {
//     return (
//       <div className="flex justify-center py-10">
//         <h1 className="text-lg md:text-2xl text-center font-bold text-gray-500">Data not found</h1>
//       </div>
//     );
//   }
  
//   return (
//     <section className="container md:max-w-[85%] 6xl:!container 6xl:!mx-auto mx-auto px-4 py-10 md:px-0 grid grid-cols-1">
//       <div className="flex justify-center py-10">
//         <h1 className="text-lg md:text-2xl text-center font-bold text-gray-500">{t('title')}</h1>
//       </div>
//       <div className="pb-10 flex gap-4">
//         <LinkApp href="/universities-filters" ><Button variant={"outline"} className="bg-transparent text-gray-600 rounded-full">{t('title')}</Button></LinkApp>
//         <Button variant={"outline"} className="bg-secondary rounded-full text-white">{t('overview')}</Button>
//       </div>
//       <div className="flex flex-col-reverse lg:flex-row gap-4">
//         <h2 className="text-lg text-primary font-bold">{DataLang("university.info")} {specialization?.name}</h2>
//       </div>
//       <main className="flex flex-col lg:flex-row-reverse gap-4 w-full pt-8">
//         <div className="lg:w-1/5">
//           <Card className="">
//             <CardContent className="custom-bullet p-4">
//               <CardTitle className="text-lg text-gray-600">{DataLang('card.table')}</CardTitle>
//               <ul className="text-gray-500">
//                 <li className="text-sm">{DataLang('university.info')} {specialization?.name}</li>
//                 {/* <li className="text-sm">{DataLang('card.details')} {uniData?.university?.details}</li> */}
//               </ul>
//             </CardContent>
//           </Card>
//         </div>
//         <div className="w-full flex flex-col">
//           <Image src={specialization?.image?.split("http://").join("https://")} alt={specialization?.name}
//           width={1500} height={1500} className="w-full h-96 object-cover rounded-3xl" />
//           {specialization?.details && (
//             <div id="details" className="scroll-mt-96">
//               <CardDetails university={specialization?.details} bg/>
//             </div>
//             )}
//         </div>
//       </main>
//     </section>
//   ) ;
// }

import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
