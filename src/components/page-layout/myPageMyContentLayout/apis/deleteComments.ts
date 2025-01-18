import { axiosInstance } from "@/apis/axiosInstance";

export default async function deletePosts(commentIds: number[]) {
  const { data } = await axiosInstance.delete(`/comments`, {
    data: { commentIds },
  });
  return data.data;
}