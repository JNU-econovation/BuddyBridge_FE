import axiosInstance from "@/apis/axiosInstance";

export default async function deletePost(id: number) {
  const { data } = await axiosInstance.delete(`posts/${id}`, { withCredentials: true });
  return data.data;
}
