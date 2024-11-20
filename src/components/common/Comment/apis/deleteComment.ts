import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function deleteComment(id: number) {
  const { data } = await axiosCertificationInstance.delete(`comments/${id}`);
  return data.data;
}
