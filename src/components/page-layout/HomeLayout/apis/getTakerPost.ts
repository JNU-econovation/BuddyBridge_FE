import { AxiosRequestConfig } from "axios";

import { axiosInstance } from "@/apis/axiosInstance";

export default async function getTakerPost() {
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

  const { data } = await axiosInstance.get(
    "posts?post-type=TAKER&page=1&size=4&sorted=modifiedAt,DESC&post-status=RECRUITING",
    config,
  );
  return data.data.content;
}
