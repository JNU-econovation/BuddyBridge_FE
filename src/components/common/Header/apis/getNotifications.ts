import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function getNotifications(limit: number, cursor: number, type: string, isRead: string) {
  if (cursor !== 0) {
    const { data } = await axiosCertificationInstance.get(`notifications?limit=${limit}&cursor=${cursor}&type=${type}&is-read=${isRead}`, {
      withCredentials: true,
    });
    return data.data;
  } else {
    const { data } = await axiosCertificationInstance.get(`notifications?limit=${limit}&type=${type}&is-read=${isRead}`, {
      withCredentials: true,
    });
    return data.data;
  }
}
