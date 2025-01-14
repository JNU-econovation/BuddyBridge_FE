import { axiosInstance } from "@/apis/axiosInstance";

export default async function getDetailDeclaration(id: number) {
  const { data } = await axiosInstance.get(`v1/reports/${id}`);

  return data.data;
}
