import axiosInstance from "@/apis/axiosInstance";

export default async function getTakerDetail(id: string) {
  const { data } = await axiosInstance.get(`posts/${id}`, { withCredentials: true });
  return data.data;
}
