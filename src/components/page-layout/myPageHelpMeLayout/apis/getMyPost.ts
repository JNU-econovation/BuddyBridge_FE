import { axiosCertificationInstance } from "@/apis/axiosInstance";

export default async function getMyPost(pageId: string, postType: string) {
  const { data } = await axiosCertificationInstance.get(`/posts/my-page?post-type=${postType}&page=${pageId}&size=4`);
  return data.data;
}
