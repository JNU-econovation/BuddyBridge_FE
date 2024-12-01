import { axiosInstance } from "@/apis/axiosInstance";

import { helpMeFormData } from "../types";

export default async function postHelpMeRegister(content: helpMeFormData) {
  const { data } = await axiosInstance.post(`posts`, {
    ...content,
  });

  return data.data;
}
