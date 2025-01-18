import { AxiosError } from "axios";

import { axiosInstance } from "@/apis/axiosInstance";

export default async function getCertificationDetail(certificationId: number) {
  try {
    const { data } = await axiosInstance.get(`v1/certifications/${certificationId}`);

    return data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.data.error.message) {
        throw new Error(error.response.data.error.message);
      }
    }
  }
}
