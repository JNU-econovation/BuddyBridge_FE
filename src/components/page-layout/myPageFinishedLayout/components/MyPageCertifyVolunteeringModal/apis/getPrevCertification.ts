import { axiosInstance } from "@/apis/axiosInstance";

export default async function putComment(matchingId:number) {
  const { data } = await axiosInstance.get(`v1/matchings/${matchingId}/cerifications`);

  return data.data;
}