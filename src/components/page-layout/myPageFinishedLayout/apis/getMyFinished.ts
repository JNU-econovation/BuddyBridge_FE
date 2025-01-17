import { axiosInstance } from "@/apis/axiosInstance";
import { MyFinishedPostResponse } from "@/types/post";

export default async function getMyFinished(pageId: number, memberRole: string, isToggleOn: boolean) {
  const { data } = await axiosInstance.get<MyFinishedPostResponse>(
    `my-page/posts/completed-matchings?memberRole=${memberRole}&page=${pageId}&size=4&isCompleted=${isToggleOn}`,
  );
  return data.data;
}
