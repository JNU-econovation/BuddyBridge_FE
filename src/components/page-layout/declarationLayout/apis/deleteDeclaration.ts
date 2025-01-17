import { axiosInstance } from "@/apis/axiosInstance";

export default async function deleteDeclaration(id: number) {
  const { data } = await axiosInstance.delete(`v1/reports/${id}`);

  return data.data;
}
