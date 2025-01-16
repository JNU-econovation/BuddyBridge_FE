import { axiosInstance } from "@/apis/axiosInstance";

export default async function getCommentDetail(reportId: number) {
  const { data } = await axiosInstance.get(`v1/reports/${reportId}/comment`);

  return data.data;
}
