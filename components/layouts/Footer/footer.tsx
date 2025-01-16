import { Footer, FooterIcon } from "flowbite-react";
import {
  BsFacebook,
  BsInstagram,
  BsTiktok,
  BsTwitter,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import LinkApp from "../../global/LinkApp";
import Image from "next/image";
import { getData } from "@/lib/data";
import LinksFixedHome from "./LinksFixedHome";
import { getTranslations } from "@/lib/dictionary";

export default async function FooterApp({ lng }: { lng: any }) {
  const {Footer: footerLang} = await getTranslations(lng);
  const response = await getData("/get_settings", lng);
  const data = response?.data;

  return (
    data && (
      <Footer container className="bg-primary text-white rounded-none p-0">
        <LinksFixedHome data={data} />
        <div className="w-full md:pt-10">
          <div className="grid md:grid-cols-3 gap-4 py-5 px-4 md:px-0 container lg:max-w-[85vw] 6xl:!container mx-auto">
            <div className="space-y-3 flex flex-col md:text-start text-sm md:text-base">
              <div className="flex flex-col text-start">
                <span className="text-lg md:text-xl text-start block py-4">
                  {footerLang.contactUs}
                </span>
                <ul className="space-y-2 text-white/80 md:text-lg ">
                  <li className="flex space-x-1 items-center">
                    <IoLocationSharp className="!text-white"/>
                    {/* <a href="">{t("address")}</a> */}
                    <a href="">{data.address}</a>
                  </li>
                  <li className="flex items-center space-x-1">
                    <MdEmail className="!text-white"/>
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                  </li>
                  <li className="flex items-center space-x-1">
                    <IoIosCall className="!text-white"/>
                    <a href={`tel:${data.phone}`} dir="ltr">
                      {data.phone}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:items-center md:text-center text-sm md:text-base">
              <Image
                src="/logo/logo-footer.png"
                alt="ITQAN Logo"
                width={400}
                height={400}
                className="w-32 md:h-20 md:w-auto md:-mt-4"
              />
              {/* <p className="mt-4 w-3/4 md:text-center">{t("bio")}</p> */}
              <p className="mt-8 w-3/4 md:text-center md:text-lg">
                {data.footer_text}
              </p>
            </div>
            <div className="space-y-3 flex flex-col md:items-end md:text-start text-sm md:text-base">
              <div className="flex flex-col text-start md:text-end">
              <span className="text-lg md:text-xl py-4 block">{footerLang.links}</span>
              <ul className="text-sm md:text-lg text-gray-300">
                  <li>
                    <LinkApp href="/">
                      {footerLang.home}
                    </LinkApp>
                  </li>
                  <li>
                    <LinkApp href="/programs" >
                      {footerLang.majors}
                    </LinkApp>
                  </li>
                  <li>
                    <LinkApp href="/contact">
                      {footerLang.contactUs}
                    </LinkApp>
                  </li>
                  <li>
                    <LinkApp href="/tos" >
                      {footerLang.TOS}
                    </LinkApp>
                  </li>
                  <li>
                    <LinkApp href="/agents">
                      {footerLang.agents}
                    </LinkApp>
                  </li>
                  <li>
                    <LinkApp href="/privacy-policy" >
                      {footerLang.privacyPolicy}
                    </LinkApp>
                  </li>
                  <li>
                    <LinkApp href="/about" >
                      {footerLang.aboutUs}
                    </LinkApp>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* <FooterDivider /> */}
          <div className="mt-4 flex sm:mt-0 justify-center p-5">
            <div className="flex gap-6 [&>div>a]:text-white/90">
              <FooterIcon href={data.facebook} icon={BsFacebook} />
              <FooterIcon href={data.instagram} icon={BsInstagram} />
              <FooterIcon href={data.twitter} icon={BsTwitter} />
              <FooterIcon href={data.whatsapp} icon={BsWhatsapp} />
              <FooterIcon href={data.youtube} icon={BsYoutube} />
              <FooterIcon href={data.tiktok} icon={BsTiktok} />
              <FooterIcon href={`mailto:${data.email}`} icon={MdEmail} />
              <FooterIcon href={`tel:${data.phone}`} icon={IoIosCall} />
            </div>
          </div>
          <div className="w-full flex items-center text-sm md:text-lg justify-center bg-gray-50/30 py-6 text-white gap-x-1 mt-3">
            <span>{footerLang.copyright}</span>
            <a href="https://mo7amed4a.vercel.app" className="hover:underline">
              {data.site_name}
            </a>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          {/* <div className="w-full flex rtl:flex-row-reverse items-center text-xs md:text-sm justify-center text-gray-200 gap-x-1">
            <span>Powerd by</span>
            <a href="https://mo7amed4a.vercel.app" className="hover:underline">
              Mohamed
            </a>
          </div> */}
        </div>
      </Footer>
    )
  );
}
