import { axiosCertificationInstance } from "@/apis/axiosInstance";

import { FormType } from "../components/MyInfoEditFrom/MyInfoEditForm";

export default async function putMyInfo(body: FormType) {
  const { data } = await axiosCertificationInstance.put(`users/info`, {
    ...body,
  });
  return data.data;
}
