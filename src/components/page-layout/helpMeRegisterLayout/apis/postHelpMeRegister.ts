import { axiosCertificationInstance } from "@/apis/axiosInstance";

import { helpMeFormData } from "../types";

export default async function postHelpMeRegister(content: helpMeFormData) {
  const { data } = await axiosCertificationInstance.post(`posts`, {
    ...content,
  });

  return data.data;
}
