import { axiosInstance } from "@/apis/axiosInstance";

export default async function getCertification(matchingId: number) {
  const { data } = await axiosInstance.get(`v1/matchings/${matchingId}/certifications`);

  return data.data;
}
