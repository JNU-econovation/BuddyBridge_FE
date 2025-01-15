import { axiosInstance } from "@/apis/axiosInstance";

export default async function deleteCertification(id: number) {
  const { data } = await axiosInstance.delete(`v1/certifications/${id}`);

  return data.data;
}
