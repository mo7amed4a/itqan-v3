"use client";
import { Card, Clipboard, Drawer, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { BiMale, BiPhone } from "react-icons/bi";
import { CgFlag } from "react-icons/cg";
import { CiUser } from "react-icons/ci";
import { FaGraduationCap, FaLanguage, FaRegFileAlt } from "react-icons/fa";
import { FaHandPointRight } from "react-icons/fa6";
import { LuGraduationCap } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { api, setAcceptLanguage } from "@/lib/axios";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getData } from "@/lib/data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type DataType = {
  name: string;
  surname: string;
  country: string;
  gender: string;
  email: string;
  mobile: string;
  select_degree: string;
  language: string;
  specialization: string;
  universities: string;
  message: string;
};

interface ItemType { 
  id: number;
  name: string
}

interface DataHomeType {
  levels: ItemType[];
  specializations: ItemType[];
  languages: ItemType[]
  universities: ItemType[]
}

export default function BookingFixed({ lng, dataLang, child=null }: { lng: string,dataLang:any, child?: React.ReactNode | null }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(searchParams.get("booking") ? true : false);
  const [text, setText] = useState<string | null>(null);
  const [dataHome, setDataHome] = useState<DataHomeType | null>(null);
  // const [level, setLevel] = useState<string|null>(null)
  // const [program_name, setProgram_name] = useState<string|null>(null)
  // const [program_language, setProgram_language] = useState<string|null>(null)
  // const [university_name, setUniversity_name] = useState<string|null>(null)
  const [initialValues, setInitialValues] = useState({
    name: "",
    surname: "",
    country: "",
    gender: "",
    email: "",
    mobile: "",
    select_degree: "",
    language: "",
    specialization: "",
    universities: "",
    message: "",
  })

  const validationSchema = Yup.object({
    name: Yup.string().required(dataLang.drawer.name_require),
    surname: Yup.string().required(dataLang.drawer.surname_require),
    country: Yup.string().required(dataLang.drawer.country_require),
    gender: Yup.string().required(dataLang.drawer.gender_require),
    email: Yup.string()
      .email(dataLang.drawer.invalid_email)
      .required(dataLang.drawer.email_require),
    mobile: Yup.string().required(dataLang.drawer.phone_require),
    select_degree: Yup.string().required(
      dataLang.drawer.select_degree_require
    ),
    language: Yup.string().required(
      dataLang.drawer.select_language_require
    ),
    specialization: Yup.string().required(
      dataLang.drawer.select_specialization_require
    ),
    universities: Yup.string().required(
      dataLang.drawer.select_universities_require
    ),
    message: Yup.string().required(dataLang.drawer.message_require),
  });

  const handleSubmit = async (values: DataType) => {
    try {
      const data = {
        first_name: values.name,
        last_name: values.surname,
        country: values.country,
        gender: values.gender,
        email: values.email,
        phone_number: values.mobile,
        degree_level: values.select_degree,
        language: values.language,
        specialization: values.specialization,
        preferred_universities: values.universities,
        message_text: values.message,
      };
      const queryString = new URLSearchParams(data).toString();
      const url = `/register?${queryString}`;
      setAcceptLanguage(lng);
      const resp = await api.post(url);
      if (resp?.data?.status) {
        setText(resp.data.msg);
        localStorage.setItem("msgBooking", resp.data.msg);
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-green-400`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="mt-1 text-lg text-green-500">{resp.data.msg}</p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-green-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ));
      } else {
        setText(null);
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-red-400`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="mt-1 text-lg text-red-500">{resp.data.msg}</p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Close
              </button>
            </div>
          </div>
        ));
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleClose = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.delete("register")
    current.delete("level")
    current.delete("program_language")
    current.delete("program_name")
    current.delete("university_name")
    const search = current.toString()
    const query = search ? `?${search}` : ""
    setIsOpen(false)
    router.push(`${pathname}${query}`)
  }
  // useEffect(() => {
  //   // setText((localStorage.getItem("msgBooking") as string) || null);
  // }, []);
  

  const getDataHome = async () => {
    const response = await getData("/filters", lng);
    // console.log(response);
    setDataHome(response?.data);
  };

  useEffect(() => {
    getDataHome();
  }, []);

  useEffect(() => {
    if (searchParams.get("register") === "open") {
      setIsOpen(true);
    }
    setInitialValues({
      name: "",
      surname: "",
      country: "",
      gender: "",
      email: "",
      mobile: "",
      select_degree: searchParams.get("level") || "",
      language: searchParams.get("program_language") || "",
      specialization: searchParams.get("program_name") || "",
      universities: searchParams.get("university_name") || "",
      message: "",
    })
  }, [searchParams.get("register")])

  return (
    <div>
     {child ? <div className="-mt-0 flex items-start p-0 m-0" onClick={() => setIsOpen(true)}>
      {child}
     </div> : <div
        className={`fixed top-1/3 right-0 
          cursor-pointer text-nowrap bg-secondary 
          p-2.5 md:p-4 md:rtl:flex-row-reverse 
          items-center text-sm 
          md:text-base text-white rounded-l-xl 
          md:flex 
          z-[10] mw-[8rem] md:w-[9rem] translate-x-0 md:translate-x-[5.5rem] gap-x-3 hover:translate-x-0 duration-300 `}
        onClick={() => setIsOpen(true)}
      >
        <FaHandPointRight className="text-white text-lg text-start md:text-2xl w-8" />
        <span className="hidden md:block">
          {dataLang.drawer.register_now}
        </span>
      </div>}
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="w-10/12 bg-gray-100 p-0.5 pt-4 z-[100] md:px-4"
      >
        {/* <Drawer.Header as={'span'} title={dataLang.drawer.register_now} /> */}
        <span className="py-3 ps-4 text-gray-500 text-base font-bold">{dataLang.drawer.register_now}</span>
        <Drawer.Items>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-0">
                <Card className="shadow-none [&>div]:p-3 md:[&>div]:p-4">
                  <span className="text-base md:text-lg text-primary">
                    {dataLang.drawer.personal_info}
                  </span>
                  <Field
                    name="name"
                    as={TextInput}
                    rightIcon={lng === "ar" && CiUser}
                    icon={lng === "en" && CiUser}
                    placeholder={dataLang.drawer.name}
                    sizing="lg"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-start  text-sm md:text-base"
                  />

                  <Field
                    name="surname"
                    as={TextInput}
                    rightIcon={lng === "ar" && CiUser}
                    icon={lng === "en" && CiUser}
                    placeholder={dataLang.drawer.surname}
                    sizing="lg"
                  />
                  <ErrorMessage
                    name="surname"
                    component="div"
                    className="text-red-500 text-start  text-sm md:text-base"
                  />

                  <Field
                    name="country"
                    as={TextInput}
                    rightIcon={lng === "ar" && CgFlag}
                    icon={lng === "en" && CgFlag}
                    placeholder={dataLang.drawer.country_of_residence}
                    sizing="lg"
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-500 text-start  text-sm md:text-base"
                  />

                  <Select
                    name="gender"
                    defaultValue={values.gender}
                    onValueChange={(value) => {
                      setFieldValue("gender", value);
                    }}
                  >
                    <SelectTrigger className="rtl:flex-row-reverse py-6">
                      <div className="flex gap-x-2 items-center rtl:flex-row-reverse">
                        <BiMale className="size-5 text-gray-500" />
                        <SelectValue placeholder={dataLang.drawer.gender} />
                      </div>
                    </SelectTrigger>
                    <SelectContent >
                      <SelectGroup className="text-end">
                        <SelectLabel>{dataLang.drawer.gender}</SelectLabel>
                        <SelectItem value="male" className="text-start w-full">
                          Male
                        </SelectItem>
                        <SelectItem
                          value="female"
                          className="text-start w-full"
                        >
                          Female
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-start  text-sm md:text-base"
                  />

                  <Field
                    name="email"
                    as={TextInput}
                    rightIcon={lng === "ar" && MdEmail}
                    icon={lng === "en" && MdEmail}
                    placeholder={dataLang.drawer.email}
                    sizing="lg"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-start  text-sm md:text-base"
                  />

                  <Field
                    name="mobile"
                    as={TextInput}
                    rightIcon={lng === "ar" && BiPhone}
                    icon={lng === "en" && BiPhone}
                    placeholder={dataLang.drawer.phone_number}
                    sizing="lg"
                  />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="text-red-500 text-start  text-sm md:text-base"
                  />
                </Card>

                <div className="flex flex-col gap-2 md:gap-4">
                  <Card className="shadow-none [&>div]:p-3 md:[&>div]:p-4">
                    <span className="text-base md:text-lg text-primary">
                      {dataLang.drawer.university_info}
                    </span>
                    {initialValues.select_degree ? <TextParams text={initialValues.select_degree}/> : <>
                    <Select
                      name="select_degree"
                      defaultValue={values.select_degree}
                      onValueChange={(value) => {
                        setFieldValue("select_degree", value);
                      }}
                    >
                      <SelectTrigger className="rtl:flex-row-reverse py-6">
                        <div className="flex gap-x-2 items-center rtl:flex-row-reverse">
                          <FaRegFileAlt  className="size-5 text-gray-500"/>
                          <SelectValue
                            placeholder={dataLang.drawer.select_degree}
                          />
                        </div>
                      </SelectTrigger>
                      <SelectContent >
                        <SelectGroup className="text-end">
                          <SelectLabel>
                            {dataLang.drawer.select_degree}
                          </SelectLabel>
                          {/* @ts-ignore */}
                          {dataHome &&
                            dataHome?.levels &&
                            dataHome?.levels?.length > 0 &&
                            dataHome?.levels.map((item: any) => (
                              <SelectItem key={item.id}
                                value={item.name}
                                className="text-start w-full"
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <ErrorMessage
                      name="select_degree"
                      component="div"
                      className="text-red-500 text-start  text-sm md:text-base"
                    />
</>}

                    {initialValues.language ? <TextParams text={initialValues.language}/> : <>
                      <Select
                        name="language"
                        defaultValue={values.language}
                        onValueChange={(value) => {
                          setFieldValue("language", value);
                        }}
                      >
                        <SelectTrigger className="rtl:flex-row-reverse py-6">
                          <div className="flex gap-x-2 items-center rtl:flex-row-reverse">
                            <FaLanguage  className="size-5 text-gray-500" />
                            <SelectValue
                              placeholder={dataLang.drawer.select_language}
                            />
                          </div>
                        </SelectTrigger>
                        <SelectContent >
                          <SelectGroup className="text-end">
                            <SelectLabel>
                              {dataLang.drawer.select_language}
                            </SelectLabel>
                            {/* @ts-ignore */}
                            {dataHome &&
                              dataHome?.languages &&
                              dataHome?.languages?.length > 0 &&
                              dataHome?.languages.map((item: any) => (
                                <SelectItem key={item.id}
                                  value={item.name}
                                  className="text-start w-full"
                                >
                                  {item.name}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <ErrorMessage
                        name="language"
                        component="div"
                        className="text-red-500 text-start  text-sm md:text-base"
                      />
                    </>}

                    {
                      initialValues.specialization ? 
                      <TextParams text={initialValues.specialization}/> :
                      <>
                        <Select
                          name="specialization"
                          defaultValue={values.specialization}
                          onValueChange={(value) => {
                            setFieldValue("specialization", value);
                          }}
                        >
                          <SelectTrigger className="rtl:flex-row-reverse py-6">
                            <div className="flex gap-x-2 items-center rtl:flex-row-reverse">
                              <FaGraduationCap  className="size-5 text-gray-500"/>
                              <SelectValue
                                placeholder={dataLang.drawer.select_specialization}
                              />
                            </div>
                          </SelectTrigger>
                          <SelectContent >
                            <SelectGroup className="text-end">
                              <SelectLabel>
                                {dataLang.drawer.select_specialization}
                              </SelectLabel>
                              {/* @ts-ignore */}
                              {dataHome &&
                                dataHome?.specializations &&
                                dataHome?.specializations?.length > 0 &&
                                dataHome?.specializations.map((item: any) => (
                                  <SelectItem
                                  key={item.id}
                                    value={item.name}
                                    className="text-start w-full"
                                  >
                                    {item.name}
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <ErrorMessage
                          name="specialization"
                          component="div"
                          className="text-red-500 text-start  text-sm md:text-base"
                        />
                      </>
                    }
{
  initialValues.universities ? <TextParams text={initialValues.universities}/> : <>
    <Select
      name="universities"
      defaultValue={values.universities}
      onValueChange={(value) => {
        setFieldValue("universities", value);
      }}
    >
      <SelectTrigger className="rtl:flex-row-reverse py-6">
        <div className="flex gap-x-2 items-center rtl:flex-row-reverse">
          <LuGraduationCap  className="size-5 text-gray-500"/>
          <SelectValue
            placeholder={dataLang.drawer.select_universities}
          />
        </div>
      </SelectTrigger>
      <SelectContent >
        <SelectGroup className="text-end">
          <SelectLabel>
            {dataLang.drawer.select_universities}
          </SelectLabel>
          {dataHome &&
            dataHome?.universities &&
            dataHome?.universities?.length > 0 &&
            dataHome?.universities.map((item: any) => (
              <SelectItem
              key={item.id}
                value={item.name}
                className="text-start w-full"
              >
                {item.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  <ErrorMessage
    name="universities"
    component="div"
    className="text-red-500 text-start  text-sm md:text-base"
  /> 
  </>
}
                  </Card>

                  <Card className="w-full shadow-none [&>div]:p-3 md:[&>div]:p-4">
                    <span className="text-base md:text-lg text-primary">
                      {dataLang.drawer.message_text}
                    </span>
                    <Field
                      name="message"
                      as={Textarea}
                      placeholder={dataLang.drawer.message_content}
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-500 text-start text-sm md:text-base"
                    />
                  </Card>
                </div>

                <div className="col-span-full flex justify-center px-4">
                  <Button
                    type="submit"
                    color="primary"
                    // size="xl"
                    className="w-full md:w-2/6 hover:bg-secondary hover:!scale-x-100 "
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? dataLang.drawer.submitting
                      : dataLang.drawer.register_now}
                  </Button>
                </div>
                <div></div>
              </Form>
            )}
          </Formik>
          {text && (
            <div className="flex justify-center text-lg text-primary text-center w-full">
              <div className="flex flex-col gap-y-2 items-center text-xs md:text-base">
                <p>{text}</p>
                {text != null && (
                  <div className="flex gap-x-2">
                    <Link
                      onClick={() => setIsOpen(false)}
                      href={`/${lng}/followup-request/${text?.split(":")[1]}`}
                    >
                      <Button
                        size={"sm"}
                        variant={"default"}
                        className="w-full"
                      >
                        {dataLang.drawer.followup_request}
                      </Button>
                    </Link>
                    <Clipboard
                      valueToCopy={text?.split(":")[1]}
                      label={dataLang.drawer.btnCopy}
                      className="bg-primary hover:bg-green-600 py-2 "
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </Drawer.Items>
      </Drawer>
    </div>
  );
}

function TextParams({
  text
}:{
  text:string
}) {
  return (
    <div className="rounded px-2 py-3 text-gray-500 bg-gray-100 border text-base border-gray-200">{text}</div>
  )
}
