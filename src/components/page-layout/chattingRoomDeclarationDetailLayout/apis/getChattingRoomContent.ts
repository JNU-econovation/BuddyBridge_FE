import { axiosInstance } from "@/apis/axiosInstance";

export default async function getChattingRoomContent(limit: number, cursor: number, reportId: number) {
  if (cursor !== 0) {
    const { data } = await axiosInstance.get(`v1/reports/${reportId}/chat?limit=${limit}&cursor=${cursor}`);
    return data.data;
  } else {
    const { data } = await axiosInstance.get(`v1/reports/${reportId}/chat?limit=${limit}`);
    return data.data;
  }
}
