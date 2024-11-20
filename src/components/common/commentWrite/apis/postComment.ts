import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function postComment(id: string, comment: string) {
  const { data } = await axiosCertificationInstance.post(`comments/${id}`, {
    content: comment,
  });

  return data.data;
}
