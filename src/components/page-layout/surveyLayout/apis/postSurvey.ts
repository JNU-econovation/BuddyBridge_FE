import { axiosInstance } from "@/apis/axiosInstance";

import { SurveyData } from "../components/surveyLayout";

export default async function postSurvey(content: SurveyData) {
  const { data } = await axiosInstance.post(`v1/surveys`, {
    ...content,
  });
  return data.data;
}
