import axiosInstance from "@/apis/axiosInstance";

export default async function getAllComment(id: string, limit: number, cursor: number) {
  if (cursor) {
    const { data } = await axiosInstance.get(`comments/${id}?limit=${limit}&cursor=${cursor}`);
    return data.data;
  } else {
    const { data } = await axiosInstance.get(`comments/${id}?limit=${limit}`);
    return data.data;
  }
}
