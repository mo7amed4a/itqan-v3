"use client"
import { FooterIcon } from 'flowbite-react'
import { useParams, usePathname } from 'next/navigation';
import {
    BsFacebook,
    BsWhatsapp,
  } from "react-icons/bs";

import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";

export default function LinksFixedHome({
    data
}: {
    data: any
}) {
    const pathname = usePathname();
    const {lng} = useParams() as any

  return pathname.endsWith(`/${lng}`) && (
    <div className="fixed start-1 top-1/3 flex flex-col gap-y-3 md:hidden">
              <FooterIcon href={data.facebook} className="text-secondary" icon={BsFacebook} />
              <FooterIcon href={data.whatsapp} className="text-secondary" icon={BsWhatsapp} />
              <FooterIcon href={`mailto:${data.email}`} className="text-secondary" icon={MdEmail} />
              <FooterIcon href={`tel:${data.phone}`} className="text-secondary" icon={IoIosCall} />
        </div>
  )
}
