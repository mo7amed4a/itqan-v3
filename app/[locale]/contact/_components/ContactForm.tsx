"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import toast from "react-hot-toast";
import {Textarea, TextInput } from "flowbite-react";
import { CiUser } from "react-icons/ci";
import { MdEmail, MdOutlineSubtitles } from "react-icons/md";
import { CgFlag } from "react-icons/cg";
import { BiPhone } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { api, setAcceptLanguage } from "@/lib/axios";

const ContactForm = ({ lng, contactLang }: { lng: string, contactLang:any }) => {

  const validationSchema = Yup.object({
    name: Yup.string().required(contactLang.form.validation.name),
    email: Yup.string()
      .email(contactLang.form.validation.email.invalid)
      .required(contactLang.form.validation.email.required),
    address: Yup.string().required(contactLang.form.validation.address),
    mobile: Yup.string().required(contactLang.form.validation.mobile),
    title: Yup.string().required(contactLang.form.validation.title),
    message: Yup.string().required(contactLang.form.validation.message),
  });

  const initialValues = {
    name: "",
    email: "",
    address: "",
    mobile: "",
    title: "",
    message: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const queryString = new URLSearchParams(values).toString();
      const url = `/contactus?${queryString}`;
      setAcceptLanguage(lng);
      const resp = await api.post(url);
      if (resp?.data?.status) {
        toast.success(resp.data.msg);
      } else {
        toast.error(resp.data.msg);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="px-6 py-10 text-start">
        <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field
                name="name"
                id="name"
                as={TextInput}
                rightIcon={lng === "ar" && CiUser}
                icon={lng === "en" && CiUser}
                placeholder={contactLang.form.name}
                sizing="lg"
                className="[&>div>input]:!bg-white"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="sm:col-span-2">
              <Field
                name="email"
                as={TextInput}
                rightIcon={lng === "ar" && MdEmail}
                icon={lng === "en" && MdEmail}
                placeholder={contactLang.form.email}
                sizing="lg"
                id="email"
                className="[&>div>input]:!bg-white"
              />

              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="sm:col-span-2">
              <Field
                name="address"
                as={TextInput}
                rightIcon={lng === "ar" && CgFlag}
                icon={lng === "en" && CgFlag}
                placeholder={contactLang.form.address}
                sizing="lg"
                className="[&>div>input]:!bg-white"
              />

              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="sm:col-span-2">
              <Field
                name="mobile"
                as={TextInput}
                rightIcon={lng === "ar" && BiPhone}
                icon={lng === "en" && BiPhone}
                placeholder={contactLang.form.mobile}
                sizing="lg"
                className="[&>div>input]:!bg-white"
              />
              <ErrorMessage
                name="mobile"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="sm:col-span-2">
              <Field
                as={TextInput}
                rightIcon={lng === "ar" && MdOutlineSubtitles}
                icon={lng === "en" && MdOutlineSubtitles}
                placeholder={contactLang.form.title}
                sizing="lg"
                className="[&>div>input]:!bg-white"
                type="text"
                name="title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="sm:col-span-2">
              <Field
                name="message"
                as={Textarea}
                className="!bg-white"
                placeholder={contactLang.form.message}
                rows={4}
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          <Button size="xl"
            type="submit"
            color="primary"
            className="w-full !text-base hover:!scale-x-100 font-bold text-white bg-primary hover:bg-secondary mt-4"
          >
            {contactLang.form.submit}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default ContactForm;
