
import React from "react";
import { Card, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";

export default function Followup({dataLang}: {dataLang:any}) {
    const router = useRouter();
    const formik = useFormik({
      initialValues: {
        code: "",
      },
      validationSchema: Yup.object({
        code: Yup.string().required(dataLang.code_require),
      }),
      onSubmit: (values) => {
        router.push(`followup-request/${values.code}`);
      },
    });
  
    return (
      <div>
        <header className="bg-primary text-white text-center py-12">
            <h1 className="text-4xl font-bold my-5">{dataLang.tracking_title}</h1>
          </header>
         <div className="max-w-md mx-auto 6xl:!container 6xl:!mx-auto px-4 mt-10 pb-10">
          <Card className="p-2">
            <form onSubmit={formik.handleSubmit}>
              <TextInput
                type="text"
                placeholder={dataLang.enter_code}
                name="code"
                className="mb-4"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={
                  formik.errors.code && formik.touched.code ? "failure" : undefined
                }
              />
              {formik.errors.code && formik.touched.code ? (
                <p className="text-red-600 text-start text-sm pb-1">
                  {formik.errors.code}
                </p>
              ) : null}
              <Button type="submit" className="w-full hover:bg-secondary hover:scale-x-100">{dataLang.submit_button}</Button>
            </form>
          </Card>
         </div>
      </div>
    )
}
