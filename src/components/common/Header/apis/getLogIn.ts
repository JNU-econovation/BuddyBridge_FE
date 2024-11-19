import { axiosInstance } from "@/apis/axiosInstance";

export default async function getLogIn() {
  const accessToken = localStorage.getItem("accessToken");

  const { data } = await axiosInstance.get("users/info", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data.data;
}
