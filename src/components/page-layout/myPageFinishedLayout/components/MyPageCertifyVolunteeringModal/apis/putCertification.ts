import { axiosInstance } from "@/apis/axiosInstance";
import { formType } from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/RegisterCertifyVolunteeringModal/apis/postCertificationsForm";

export default async function putComment(matchingId:number, body: formType) {
  const { data } = await axiosInstance.put(`v1/matchings/${matchingId}/certifications`, {
    ...body,
  });

  return data.data;
}