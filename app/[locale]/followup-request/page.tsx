"use client";
import { getTranslations } from "@/lib/dictionary";
import Followup from "./_components/followup";

export default async function TrackingPage({
  params,
}:{
  params: Promise<{ locale: any }>
}) {
  const locale = (await params).locale
  const {followup_request: dataLang} = await getTranslations(locale);
  return (
    <Followup dataLang={dataLang} />
  )
}
