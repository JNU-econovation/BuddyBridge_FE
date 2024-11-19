import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function postReadAllNotification() {
  const { data } = await axiosCertificationInstance.post(`notifications/read-all`, {});
  return data;
}
