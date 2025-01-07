import { axiosInstance } from "@/apis/axiosInstance";
import { PostDetailResponse } from "@/types/post";

export default async function getGiverDetail(id: string) {
  const { data } = await axiosInstance.get<PostDetailResponse>(`posts/${id}`);
  return data.data;
}
