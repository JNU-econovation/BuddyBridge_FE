import { axiosInstance } from "@/apis/axiosInstance";

export default async function getPostEnums() {
  const { data } = await axiosInstance.get("posts/enums");

  return data.data;
}
