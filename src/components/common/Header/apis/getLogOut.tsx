import axiosInstance from "@/apis/axiosInstance";

export default async function getLogOut() {
  const { data } = await axiosInstance.get("users/info", {
    withCredentials: true,
  });
  return data.data.content;
}
