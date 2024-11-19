import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function getNotifications(limit: number, cursor: number) {
  if (cursor !== 0) {
    const { data } = await axiosCertificationInstance.get(`notifications?limit=${limit}&cursor=${cursor}`);
    return data.data;
  } else {
    const { data } = await axiosCertificationInstance.get(`notifications?limit=${limit}`);
    return data.data;
  }
}
