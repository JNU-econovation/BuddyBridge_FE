import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function postReadNotification(notificationId: string) {
  const { data } = await axiosCertificationInstance.post(`notifications/${notificationId}/read`, {});
  return data;
}
