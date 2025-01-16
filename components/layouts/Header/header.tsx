import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import InputSearch from "./inputSearch";
import Image from "next/image";
// import { setAcceptLanguage } from "@/lib/axios";
import LinkActive from "./LinkActive";
import LinkApp from "../../global/LinkApp";
import { Button } from "@/components/ui/button";
import OpenBooking from "../fixedCps/OpenBooking";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getTranslations } from "@/lib/dictionary";
import LocaleSwitcher from "@/components/layouts/Header/locale-switcher";

export default async function HeaderApp({ locale }: { locale: any }) {
  const {Header} = await getTranslations(locale);
  // setAcceptLanguage(locale);
  // try {
    // const response = await api.get("/get_settings");
  // } catch {}

  return (
    <header className="flex flex-col sticky top-0 z-[20] bg-white">
      <div className="bg-primary ">
        <div className="flex flex-row justify-between py-2 px-4 md:px-10 gap-2 md:w-[90vw] xl:container mx-auto">
          <div className="flex justify-between items-center md:justify-start gap-2 md:gap-4">
            <div className="z-[7817874]">
              <OpenBooking>
                <Button
                  color="primary"
                  className="border text-nowrap px-1 hover:!scale-x-100 h-8 md:h-9 py-0 text-[11px] md:px-4 md:text-base"
                >
                  {Header.booking_btn}
                </Button>
              </OpenBooking>
            </div>
            <LinkApp href="/agents">
              <Button
                color="primary"
                className="border bg-secondary md:bg-primary hover:!scale-x-100 text-nowrap md:px-6 lg:px-10 py-0 text-[9px] px-1 md:text-base h-8 md:h-9"
              >
                {Header.be_our_agent}
              </Button>
            </LinkApp>
            <div>
              <LinkApp href={`/followup-request`} >
                <Button className="text-nowrap md:bg-secondary hover:!scale-x-100 text-white border border-white py-0 text-[9px] px-1 md:px-2 md:text-base h-8 md:h-9">
                  {Header.follow_up_on_the_registration_request}
                </Button>
              </LinkApp>
            </div>
          </div>
          <div className="flex justify-between md:justify-start gap-4">
            <div className="hidden md:block">
              <InputSearch placeholder={Header.search_for_the_university} />
            </div>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
      <div className="px-3 md:px-6 md:w-[90vw] xl:container md:mx-auto">
        <Navbar fluid rounded className="">
          <NavbarBrand as={"div"}>
            <LinkApp href="/">
              <Image
                src={"/logo/logo.png"}
                className="w-32 lg:w-44 h-12 lg:h-full bg-contain"
                alt="app Logo"
                width={"200"}
                height={"200"}
              />
            </LinkApp>
          </NavbarBrand>
          <NavbarToggle />
          <NavbarCollapse className="[&>ul]:!justify-end md:!w-9/12 4xl:!w-auto [&>ul>li>a]:text-base lg:[&>ul>li>a]:text-lg xl:[&>ul>li>a]:text-xl [&>ul>li>a]:text-nowrap rtl:xl:[&>ul>li]:ps-2 md:overflow-x-scroll 2xl:overflow-x-auto z-40 hidden-scrollbar">
            {/* <LinkActive as={Link} locale={locale} text={Header.home} url="" /> */}
            <LinkActive
              className="!ps-8 md:!px-0"
              as={Link}
              locale={locale}
              text={Header.turkish_universities}
              url="turkish-universities"
            />
            <LinkActive
              as={Link}
              locale={locale}
              text={Header.cyprus_universities}
              url="cyprus-universities"
            />
            <LinkActive
              as={Link}
              locale={locale}
              text={Header.partial_scholarships}
              url="scholarships"
            />
            <LinkActive
              as={Link}
              locale={locale}
              text={Header.blog}
              url="blogs"
            />

            <LinkActive
              as={Link}
              locale={locale}
              text={Header.programs}
              url="programs"
            />

            <LinkActive
              as={Link}
              locale={locale}
              text={Header.student_accommodation}
              url="student-accommodation"
            />

            <DropdownMenu>
              <DropdownMenuTrigger className="hidden md:block" asChild>
                <div className="text-base text-gray-700 hover:text-primary lg:text-lg xl:text-xl cursor-pointer text-nowrap">
                  {Header.about_itqan}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>
                  <LinkApp href={`/about`}>
                    {Header.about_us}
                  </LinkApp>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LinkApp href={`/services`}>
                    {Header.services}
                  </LinkApp>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LinkApp href={`/contact`}>
                    {Header.contact_us}
                  </LinkApp>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="[&>li>a]:text-base md:hidden [&>li>a]:text-nowrap">
              <LinkActive
                as={Link}
                locale={locale}
                text={Header.about_us}
                url="about"
              />
              <LinkActive
                as={Link}
                locale={locale}
                text={Header.services}
                url="services"
              />
              <LinkActive
                as={Link}
                locale={locale}
                text={Header.contact_us}
                url="contact"
              />
            </div>
          </NavbarCollapse>
        </Navbar>
      </div>
    </header>
  );
}
