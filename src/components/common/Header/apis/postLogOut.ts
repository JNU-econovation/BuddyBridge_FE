import { AxiosRequestConfig } from "axios";

import { axiosInstance } from "@/apis/axiosInstance";

export default async function postLogOut() {
  const accessToken = localStorage.getItem("accessToken");

  const config: AxiosRequestConfig = {
    headers: {},
  };

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  const { data } = await axiosInstance.post("auth/logout", {}, config);
  return data.data;
}
