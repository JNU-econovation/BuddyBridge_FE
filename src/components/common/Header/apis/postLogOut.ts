import { axiosInstance } from "@/apis/axiosInstance";

export default async function postLogOut() {
  const { data } = await axiosInstance.post("auth/logout", {});
  return data.data;
}
