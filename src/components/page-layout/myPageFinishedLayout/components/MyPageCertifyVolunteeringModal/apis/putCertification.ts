import { axiosInstance } from "@/apis/axiosInstance";
import { formType } from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/CertifyVolunteeringModal/apis/postCertificationsForm";

export default async function putComment(matchingId:number, body: formType) {
  const { data } = await axiosInstance.put(`v1/matchings/${matchingId}/cerifications`, {
    ...body,
  });

  return data.data;
}