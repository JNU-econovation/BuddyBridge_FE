import axiosInstance from "@/apis/axiosInstance";

export default async function getTestLogin(userId: string) {
  const { data } = await axiosInstance.get(`oauth/login/${userId}`, {
    withCredentials: true,
  });
  return data.data;
}
