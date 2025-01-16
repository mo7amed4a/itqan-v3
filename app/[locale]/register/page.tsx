import { getTranslations } from '@/lib/dictionary';
import React from 'react'
import RegisterPage from './_components/RegisterPage';
import { siteURL } from '@/lib/axios';

export async function generateMetadata() {
  return {
    alternates: {
      canonical: `${siteURL}/register`,
      languages: {
        'x-default': `${siteURL}/ar/register`,
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
