import axios from "axios";

export const siteURL = "https://itqaneducation.com";

export const api = axios.create({
  baseURL: "https://admin.itqaneducation.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 4000
});

export const setAcceptLanguage = (language: string) => {
  api.defaults.headers["Accept-Language"] = language;
};
