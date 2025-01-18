import { AxiosError } from "axios";

import { axiosInstance } from "@/apis/axiosInstance";

export default async function getDeclaration(
  declarationType: "all" | "posts" | "comments" | "matchings",
  page: number,
  size: number,
) {
  try {
    let url = "";

    if (page > 0) {
      page = page - 1;
    }

    if (declarationType === "all") {
      url = `v1/reports?page=${page}&size=${size}`;
    } else {
      url = `v1/reports/${declarationType}?page=${page}&size=${size}`;
    }

    const { data } = await axiosInstance.get(url);

    return data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.data.error.message) {
        throw new Error(error.response.data.error.message);
      }
    }
  }
}
