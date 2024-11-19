import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function putComment(id: string, comment: string) {
  const { data } = await axiosCertificationInstance.put(`comments/${id}`, {
    content: comment,
  });

  return data.data;
}
