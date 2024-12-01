import { axiosInstance } from "@/apis/axiosInstance";

export default async function postReadAllNotification() {
  const { data } = await axiosInstance.post(`notifications/read-all`, {});
  return data;
}
