import { axiosInstance } from "@/apis/axiosInstance";

export default async function getMyInfo() {
  const { data } = await axiosInstance.get(`users/info`);
  return data.data;
}
