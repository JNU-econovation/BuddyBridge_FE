import axiosInstance from "@/apis/axiosInstance";

import { helpMeFormData } from "../types";

export default async function postHelpMeReister(content: helpMeFormData) {
  const { data } = await axiosInstance.post(
    `posts`,
    {
      ...content,
    },
    {
      withCredentials: true,
    },
  );

  return data.data;
}
