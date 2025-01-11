import { axiosInstance } from "@/apis/axiosInstance";

export default async function putMatchingStatus(chatingRoomId: number, status: string) {
  const { data } = await axiosInstance.put(
    `matching/${chatingRoomId}`,
    JSON.stringify({
      matchingStatusEvent: status,
    }),
  );
  return data.data;
}
