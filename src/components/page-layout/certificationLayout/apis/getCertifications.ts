import { AxiosError } from "axios";

import { axiosInstance } from "@/apis/axiosInstance";

export default async function getCertifications(page: number, size: number) {
  try {
    if (page > 0) {
      page = page - 1;
    }

    const { data } = await axiosInstance.get(`v1/certifications?page=${page}&size=${size}`);

    return data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.data.error.message) {
        throw new Error(error.response.data.error.message);
      }
    }
  }
}
