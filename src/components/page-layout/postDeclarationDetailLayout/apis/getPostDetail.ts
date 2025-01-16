import { axiosInstance } from "@/apis/axiosInstance";

export default async function getPostDetail(reportId: number) {
  const { data } = await axiosInstance.get(`v1/reports/${reportId}/post`);

  return data.data;
}
