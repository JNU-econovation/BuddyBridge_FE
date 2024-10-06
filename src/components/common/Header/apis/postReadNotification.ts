import axiosInstance from "@/apis/axiosInstance";

export default async function postReadNotification(notificationId: string) {
  const { data } = await axiosInstance.post(
    `notifications/${notificationId}/read`,
    {},
    {
      withCredentials: true,
    },
  );
  return data;
}
