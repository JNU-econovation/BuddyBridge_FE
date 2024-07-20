import axiosInstance from "@/apis/axiosInstance";

import { FormType } from "../components/MyInfoEditFrom/MyInfoEditForm";

export default async function putMyInfo(body: FormType) {
  const { data } = await axiosInstance.put(
    `users/info`,
    {
      ...body,
    },
    {
      withCredentials: true,
    },
  );
  return data.data;
}
