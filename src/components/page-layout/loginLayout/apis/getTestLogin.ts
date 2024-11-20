import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function getTestLogin(userId: string) {
  const { data } = await axiosCertificationInstance.get(`oauth/login/${userId}`);
  return data;
}
