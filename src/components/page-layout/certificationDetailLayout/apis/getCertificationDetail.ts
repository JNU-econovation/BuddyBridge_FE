import { axiosInstance } from "@/apis/axiosInstance";

export default async function getCertificationDetail(certificationId: number) {
  const { data } = await axiosInstance.get(`v1/certifications/${certificationId}`);

  return data.data;
}
