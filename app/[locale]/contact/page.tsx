import React from "react";
import { getData } from "@/lib/data";
import { IoIosCall } from "react-icons/io";
import ContactForm from "./_components/ContactForm";
import { getTranslations } from "@/lib/dictionary";
import { siteURL } from "@/lib/axios";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: any }>;
}) {
  const locale =  (await params).locale
  const {Header} = await getTranslations(locale);
  let data;
  const response = await getData("/get_settings", locale);
  data = response?.data;
  return {
    title: Header.contact_us + " - " + data?.site_name,
    alternates: {
      canonical: `${siteURL}/contact`,
      languages: {
        'x-default': `${siteURL}/ar/contact`,
        'en': `${siteURL}/en/contact`,
        'fa': `${siteURL}/fa/contact`,
      },
    },
  };
}


export default async function page({
  params,
}: {
  params: Promise<{
    locale: any;
  }>;
}) {
  const locale = (await params).locale
  const {contact:contactLang} = await getTranslations(locale);
  let data;
  const response = await getData("/get_settings", locale);
  data = response?.data;

  return (
    <div className="relative isolate bg-white text-start 6xl:!container 6xl:!mx-auto">
      <header className="bg-primary text-white text-center py-12">
        <h1 className="text-4xl font-bold my-5"> {contactLang.title}</h1>
      </header>
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 py-10 lg:static ">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <span className="text-3xl font-bold tracking-tight text-gray-900">
              {contactLang.title}
            </span>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {contactLang.description}
            </p>
            <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only"> {contactLang.address.label}</span>
                  <IoIosCall />
                </dt>
                <dd>
                  <a href={`tel:${data.phone}`} dir="ltr">
                    {data.phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only"> {contactLang.email.label}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    ></path>
                  </svg>
                </dt>
                <dd>
                  <a
                    className="hover:text-gray-900"
                    href={`mailto:${data.email}`}
                  >
                    {data.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only"> {contactLang.address.label}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                    ></path>
                  </svg>
                </dt>
                <dd>{data.address}</dd>
              </div>
            </dl>
          </div>
        </div>
        <ContactForm contactLang={contactLang} lng={locale} />
      </div>
    </div>
  );
}
