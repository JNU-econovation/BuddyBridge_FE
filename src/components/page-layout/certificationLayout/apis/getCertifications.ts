import { axiosInstance } from "@/apis/axiosInstance";

export default async function getCertifications(page: number, size: number) {
  if (page > 0) {
    page = page - 1;
  }

  const { data } = await axiosInstance.get(`v1/certifications?page=${page}&size=${size}`);

  return data.data;
}
