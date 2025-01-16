import { axiosInstance } from "@/apis/axiosInstance";

export default async function getUsers(page: number, size: number) {
  const { data } = await axiosInstance.get(`v1/admin/members?page=${page - 1}&size=${size}`);

  return data.data;
}
