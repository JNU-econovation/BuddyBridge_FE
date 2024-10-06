import axiosInstance from "@/apis/axiosInstance";

export default async function getPagenationItems(postType: string, page: number, limit: number,postStatus: string,disabilityType: string, assistanceType: string) {
  
  let url = `posts?post-type=${postType}&page=${page}&size=${limit}&sorted=modifiedAt,DESC&post-status=${postStatus}&disability-type=${disabilityType}&assistance-type=${assistanceType}`;

  const { data } = await axiosInstance.get(url);

  return data;

}
