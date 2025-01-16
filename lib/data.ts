import { api, setAcceptLanguage } from "./axios";


export async function getData(url: string, lng: string): Promise<any | undefined> {
  try {
    setAcceptLanguage(lng);
    const res = await api.get(url);
    if (res?.data?.status === true) {
      return res.data;
    } else if (res?.data?.success === true) {
      return res.data;
    } else if (res?.data?.universities) {
      return res.data;
    } else {
      // redirect("/error");
    }
  } catch {
    console.error("Error fetching home data: error");
    return undefined;
  }
}
