import { axiosInstance } from "@/apis/axiosInstance";

export default async function postCertificationRequest(matchingId: number) {
  const { data } = await axiosInstance.post(`v1/matchings/${matchingId}/certification-requests`, {});

  return data.data;
}
