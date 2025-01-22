import { getTranslations } from '@/lib/dictionary';
import React from 'react'
import RegisterPage from './_components/RegisterPage';
import { siteURL } from '@/lib/axios';
import { headers } from 'next/headers';

export async function generateMetadata() {
  const headerList = headers();
  const pathname = (await headerList).get("x-current-path");
  
  return {
    alternates: {
      canonical: siteURL + pathname,
      languages: {
        'x-default': `${siteURL}/register`,
        'en': `${siteURL}/en/register`,
        'fa': `${siteURL}/fa/register`,
      },
    },
  };
}

export default async function page(
  {
    params
  }: {
    params: Promise<{
      locale:any
    }>
  }
) {
  const locale = (await params).locale
  const {layOutFixed} = await getTranslations(locale);
  return (
    <RegisterPage dataLang={layOutFixed} />
  )
}
