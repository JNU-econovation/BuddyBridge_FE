import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function postLikes(postId: number) {
  const { data } = await axiosCertificationInstance.post(`posts/likes/${postId}`, {});
  return data;
}
