export default interface PostData {
  assistanceType: string;
  content: string;
  createdAt: Date;
  district: string;
  assistanceEndTime: string;
  id: number;
  modifiedAt: Date;
  postStatus: string;
  postType: string;
  scheduleDetails: string;
  scheduleType: string;
  assistanceStartTime: string;
  title: string;
  startDate: string;
  endDate: string;
  matchingDoneCount: number;
  headcount: number;
  disabilityType: string;
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
}
