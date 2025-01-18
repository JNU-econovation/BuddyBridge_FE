import { axiosInstance } from "@/apis/axiosInstance";

export interface formType {
  volunteerDate: Date;
  assistanceType: "학습" | "식사" | "이동" | "기타";
  startTime: Date;
  endTime: Date;
  content: string;
}

export default async function postCertificationsForm(body: formType, matchingId: number) {
  const { data } = await axiosInstance.post(`v1/matchings/${matchingId}/certifications`, body);

  return data.data;
}
