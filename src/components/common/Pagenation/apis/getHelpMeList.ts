import axiosInstance from "@/apis/axiosInstance";

export default async function getPagenationItems(postType: string, page: number, limit: number) {
  const { data } = await axiosInstance.get(
    `posts?post-type=${postType}&page=${page}&size=${limit}&sorted=modifiedAt,DESC&post-status=RECRUITING`,
  );
  return data;
}
