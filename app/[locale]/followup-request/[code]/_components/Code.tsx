"use client";
import React, {  useEffect } from "react";
import { Card, Table } from "flowbite-react";
import { api, setAcceptLanguage } from "@/lib/axios";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useParams } from "next/navigation";

type RegistrationRequest = {
  id: number;
  code: string;
  first_name: string;
  last_name: string;
  country: string;
  gender: string;
  email: string;
  phone_number: string;
  degree_level: string;
  language: string;
  specialization: string;
  preferred_universities: string;
  message_text: string;
  created_at: string;
  updated_at: string;
};

const RegistrationRequestPage = ({
  dataLang
}: {
  dataLang:any
}) => {
  const params = useParams() as { locale: string; code: string }

  const [requestData, setRequestData] =
    React.useState<RegistrationRequest | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    // getReq()
    setAcceptLanguage(params.locale);
    const res = api.post(`/followup_request/${params.code}`);
    res
      .then((res) => {
        if (res?.data?.status) {
          setRequestData(res.data.data.request);
          setLoading(false);
        } else {
          setError(res.data.msg);
          setLoading(false);
          toast.error(res.data.msg);
        }
      })
      .catch(() => {
        toast.error("Server error");
        // console.log(err);
      });
  }, [params.code]);

  return (
    <div>
      <header className="bg-primary text-white text-center py-12">
        <h1 className="text-4xl font-bold my-5">{dataLang.title}</h1>
      </header>
      <div className="max-w-md mx-auto 6xl:!container 6xl:!mx-auto px-4 mt-10 pb-10">
        <Card>
          {!loading ? (
            error === null ? (
              requestData && (
                <Table className="text-start">
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{dataLang.code}</Table.Cell>
                      <Table.Cell>{requestData.code}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{dataLang.first_name}</Table.Cell>
                      <Table.Cell>{requestData.first_name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{dataLang.first_name}</Table.Cell>
                      <Table.Cell>{requestData.last_name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{dataLang.country}</Table.Cell>
                      <Table.Cell>{requestData.country}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{dataLang.gender}</Table.Cell>
                      <Table.Cell>{requestData.gender}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{dataLang.email}</Table.Cell>
                      <Table.Cell>{requestData.email}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{dataLang.phone_number}</Table.Cell>
                      <Table.Cell>{requestData.phone_number}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{dataLang.degree_level}</Table.Cell>
                      <Table.Cell>{requestData.degree_level}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{dataLang.language}</Table.Cell>
                      <Table.Cell>{requestData.language}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{dataLang.specialization}</Table.Cell>
                      <Table.Cell>{requestData.specialization}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        {dataLang.preferred_universities}
                      </Table.Cell>
                      <Table.Cell>
                        {requestData.preferred_universities}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{dataLang.message_text}</Table.Cell>
                      <Table.Cell>{requestData.message_text}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{dataLang.created_at}</Table.Cell>
                      <Table.Cell>
                        {new Date(requestData.created_at).toLocaleString()}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{dataLang.updated_at}</Table.Cell>
                      <Table.Cell>
                        {new Date(requestData.updated_at).toLocaleString()}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              )
            ) : (
              <Alert variant="destructive">
                <AlertDescription className="text-center">
                  {error}
                </AlertDescription>
              </Alert>
            )
          ) : (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[50x] w-full rounded-xl" />
              <Skeleton className="h-[50px] w-full rounded-xl" />
              <Skeleton className="h-[50px] w-full rounded-xl" />
              <Skeleton className="h-[50px] w-full rounded-xl" />
              <Skeleton className="h-[50px] w-full rounded-xl" />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default RegistrationRequestPage;
