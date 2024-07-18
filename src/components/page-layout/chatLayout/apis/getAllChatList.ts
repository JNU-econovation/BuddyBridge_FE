import axiosInstance from "@/apis/axiosInstance";

export default async function getAllChatList(limit: number, cursor: number) {
  if (cursor !== 0) {
    const { data } = await axiosInstance.get(`chat/matchings?limit=${limit}&cursor=${cursor}`, {
      withCredentials: true,
    });
    return data.data;
  } else {
    const { data } = await axiosInstance.get(`chat/matchings?limit=${limit}`, {
      withCredentials: true,
    });
    return data.data;
  }
}
