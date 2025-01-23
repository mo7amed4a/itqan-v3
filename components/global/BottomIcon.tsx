import { getData } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
export default async function BottomIcon({
  lng
}:{
  lng: any
}) {
  const res_Settings = await getData("/get_settings", lng);
  const settings = res_Settings?.data;
  return  (
    <div className='fixed bottom-5 right-5 bg-red-400 size-14 rounded-full'>
      <Link href={settings?.consult_url || ""} >
        <Image src={'/icons/WhatsApp-icon.png'}
        alt='whatsapp icon'
        width={400}
        height={400} />
      </Link>
    </div>
  )
}
