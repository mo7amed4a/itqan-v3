'use client'
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextInput, Button } from "flowbite-react";
import * as Yup from "yup";
import { CiUser } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";
import { api, setAcceptLanguage } from "@/lib/axios";
import { useParams } from "next/navigation";
type FormValues = {
  name: string;
  email: string;
  mobile: string;
};

export default function FormBooking({lng, data}:{lng: any, data?: {home_form_title: string}}) {
  const dataLang = lng
  const {locale} = useParams() as {locale: string}

  const validationSchema = Yup.object({
    name: Yup.string().required(dataLang.form_booking.name_required),
    email: Yup.string()
      .email(dataLang.form_booking.email_invalid)
      .required(dataLang.form_booking.email_required),
    mobile: Yup.string()
      .required(dataLang.form_booking.mobile_w_required)
      .matches(/^[0-9]{10,14}$/, dataLang.form_booking.mobile_w_invalid),
  });

  const handleSubmit = async (
    values: FormValues,
    // @typescript-eslint/no-explicit-any
    { setSubmitting }: { setSubmitting: any }
  ) => {
    try {
      const queryString = new URLSearchParams(values).toString();
      const url = `/callme?${queryString}`;
      setAcceptLanguage(locale);
      const resp = await api.post(url);
      if (resp?.data?.status) {
        toast.success(resp.data.msg);
      } else {
        toast.error(resp.data.msg);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
    finally {
      setSubmitting(false);
    }
  };

  return (
      <Formik
          initialValues={{
            name: "",
            email: "",
            mobile: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <div className="flex flex-col space-y-10 items-center w-full">
              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-500">
                {/* {dataLang('form_booking.title')} */}
                {data ? data?.home_form_title : dataLang.form_booking.title}
              </h3>
              <Form className="grid grid-cols-1 gap-4 w-full p-6 ">
              <div className="flex flex-col gap-4">
                <Field
                  name="name"
                  as={TextInput}
                  rightIcon={CiUser}
                  placeholder={dataLang.form_booking.name}
                  sizing="lg"
                  className="text-right [&>div>input]:!bg-white"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  name="email"
                  as={TextInput}
                  rightIcon={MdEmail}
                  placeholder={dataLang.form_booking.email}
                  sizing="lg"
                  className="text-right [&>div>input]:!bg-white"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  name="mobile"
                  as={TextInput}
                  rightIcon={FaWhatsapp}
                  placeholder={dataLang.form_booking.mobile_w}
                  sizing="lg"
                  className="text-right [&>div>input]:!bg-white [&>div>div>input]:focus:border-none [&>div>div>input]:focus:!ring-primary focus:outline-transparent"
                />
                <ErrorMessage
                  name="mobile"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="col-span-full flex justify-center">
                <Button
                  type="submit"
                  color="primary"
                  className="w-full font-bold py-3 text-white bg-primary hover:bg-secondary hover:text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? dataLang.form_booking.loading+"..." : dataLang.form_booking.submit}
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
  );
}
