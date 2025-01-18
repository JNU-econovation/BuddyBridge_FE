import { AxiosError } from "axios";

import { axiosInstance } from "@/apis/axiosInstance";

export default async function getUsers(page: number, size: number) {
  try {
    const { data } = await axiosInstance.get(`v1/admin/members?page=${page - 1}&size=${size}`);

    return data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.data.error.message) {
        throw new Error(error.response.data.error.message);
      }
    }
  }
}
