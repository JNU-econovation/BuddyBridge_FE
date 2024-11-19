import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function getLogIn() {
  const { data } = await axiosCertificationInstance.get("users/info");
  return data.data;
}
