import axiosInstance from "@/apis/axiosInstance";

export interface MyLikesRes {
  content: {
    assistanceType: "생활" | "교육";
    author: {
      age: number;
      disabilityType: string;
      email: string;
      gender: string;
      memberId: number;
      name: string;
      nickname: string;
      profileImageUrl: string;
    };
    content: string;
    createdAt: string;
    disabilityType: string | null;
    district: string;
    endTime: string;
    id: number;
    modifiedAt: string;
    postStatus: "RECRUITING" | "FINISHED";
    postType: "TAKER" | "GIVER";
    scheduleDetails: string;
    scheduleType: string;
    startTime: string;
    title: string;
  }[];
  last: boolean;
  totalElements: number;
}

export default async function getMyLikes(pageId: string, postType: string): Promise<MyLikesRes> {
  const { data } = await axiosInstance.get(`posts/likes/my-page?post-type=${postType}&page=${pageId}&size=4`, {
    withCredentials: true,
  });
  return data.data;
}
