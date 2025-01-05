import { axiosInstance } from "@/apis/axiosInstance";

import { helpMeFormData } from "../types";

export default async function patchHelpMeRegister(content: helpMeFormData, contentId: string) {
  const { data } = await axiosInstance.patch(`posts/${contentId}`, {
    ...content,
  });
  return data.data;
}
