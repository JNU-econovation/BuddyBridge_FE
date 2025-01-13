import { axiosInstance } from "@/apis/axiosInstance";

export default async function deletePosts(postIds: number[]) {
  const { data } = await axiosInstance.delete(`/posts`, {
    data: { postIds },
  });
  return data.data;
}
