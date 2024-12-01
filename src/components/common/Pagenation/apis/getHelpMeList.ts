import { axiosInstance } from "@/apis/axiosInstance";

export default async function getPagenationItems(
  postType: string,
  page: number,
  limit: number,
  allType: string,
  postStatus: string,
  disabilityType: string,
  assistanceType: string,
) {
  const url = allType
    ? `posts?post-type=${postType}&page=${page}&size=${limit}&sorted=modifiedAt,DESC`
    : `posts?post-type=${postType}&page=${page}&size=${limit}&sorted=modifiedAt,DESC&post-status=${postStatus}&disability-type=${disabilityType}&assistance-type=${assistanceType}`;

  const { data } = await axiosInstance.get(url);

  return data;
}
