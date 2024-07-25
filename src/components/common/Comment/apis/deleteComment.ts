import axiosInstance from "@/apis/axiosInstance";

export default async function deleteComment(id: number) {
  const { data } = await axiosInstance.delete(`comments/${id}`, { withCredentials: true });
  return data.data;
}
