import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function deletePost(id: number) {
  const { data } = await axiosCertificationInstance.delete(`posts/${id}`);
  return data.data;
}
