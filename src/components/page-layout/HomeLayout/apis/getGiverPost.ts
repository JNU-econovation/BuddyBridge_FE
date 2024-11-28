import { AxiosRequestConfig } from "axios";

import { axiosInstance } from "@/apis/axiosInstance";

export default async function getGiverPost() {
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
    "posts?post-type=GIVER&page=1&size=4&sorted=modifiedAt,DESC&post-status=RECRUITING",
    config,
  );
  return data.data.content;
}
