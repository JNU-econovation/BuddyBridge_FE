import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function getTakerDetail(id: string) {
  const { data } = await axiosCertificationInstance.get(`posts/${id}`);
  return data.data;
}
