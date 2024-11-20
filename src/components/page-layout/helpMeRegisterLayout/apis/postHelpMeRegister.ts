import { axiosCertificationInstance } from "@/apis/axiosInstance";

import { helpMeFormData } from "../types";

export default async function postHelpMeReister(content: helpMeFormData) {
  const { data } = await axiosCertificationInstance.post(`posts`, {
    ...content,
  });

  return data.data;
}
