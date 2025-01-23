import { axiosInstance } from "@/apis/axiosInstance";

import { helpMeFormData } from "../../helpMeRegisterLayout/types";

export default async function putHelpMeRegister(content: helpMeFormData, contentId: string) {
  const { data } = await axiosInstance.put(`posts/${contentId}`, {
    ...content,
  });
  return data.data;
}
