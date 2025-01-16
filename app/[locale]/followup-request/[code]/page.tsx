import { getTranslations } from '@/lib/dictionary';
import React from 'react'
import RegistrationRequestPage from './_components/Code';

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
  const {followup_request} = await getTranslations(locale);
  return (
    <RegistrationRequestPage dataLang={followup_request} />
  )
}
