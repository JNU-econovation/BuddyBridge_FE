import { axiosInstance } from "@/apis/axiosInstance";

export default async function deleteMatching(chattingRoomNumber: number) {
  const { data } = await axiosInstance.delete(`matching/${chattingRoomNumber}`);
  return data.data;
}
