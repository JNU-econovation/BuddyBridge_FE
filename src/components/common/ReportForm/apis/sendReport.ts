import { axiosInstance } from "@/apis/axiosInstance";

interface reportProps {
    reportType: string;
    reportReason: string;
}

export default async function sendReport(contentType: string, id: number, content:reportProps) {
  const { data } = await axiosInstance.post(`v1/reports/${contentType}/${id}`,{...content});
  return data.data;
}