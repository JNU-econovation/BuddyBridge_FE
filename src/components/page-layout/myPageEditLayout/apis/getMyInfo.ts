import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function getMyInfo() {
  const { data } = await axiosCertificationInstance.get(`users/info`);
  return data.data;
}
