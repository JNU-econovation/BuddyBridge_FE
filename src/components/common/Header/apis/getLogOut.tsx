import axiosInstance from "@/apis/axiosInstance";

export default async function getLogOut() {
  const { data } = await axiosInstance.get("oauth/logout", {
    withCredentials: true,
  });
  return data.data.content;
}
