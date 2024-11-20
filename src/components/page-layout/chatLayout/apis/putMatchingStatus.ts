import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function putMatchingStatus(chatingRoomId: number, status: string) {
  const { data } = await axiosCertificationInstance.put(`matching/${chatingRoomId}`, {
    matchingStatus: status,
  });
  return data.data;
}
