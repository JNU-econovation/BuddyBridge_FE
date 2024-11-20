import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function postLogOut() {
  const { data } = await axiosCertificationInstance.post("oauth/logout", {});
  return data.data;
}
