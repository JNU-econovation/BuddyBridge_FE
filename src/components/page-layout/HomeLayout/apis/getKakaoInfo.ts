import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function getKakaoInfo(code: string) {
  const { data } = await axiosCertificationInstance.post("oauth/login", { authorizationCode: code });
  return data.data;
}
