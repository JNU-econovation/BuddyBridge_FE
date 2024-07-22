import axiosInstance from "@/apis/axiosInstance";

export default async function getChatingRoom(limit: number, cursor: number, chatingRoomNumber: number) {
  if (cursor !== 0) {
    const { data } = await axiosInstance.get(`chat/matchings/${chatingRoomNumber}?limit=${limit}&cursor=${cursor}`, {
      withCredentials: true,
    });
    return data.data;
  } else {
    const { data } = await axiosInstance.get(`chat/matchings/${chatingRoomNumber}?limit=${limit}`, {
      withCredentials: true,
    });
    return data.data;
  }
}
