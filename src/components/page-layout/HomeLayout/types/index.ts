export default interface PostData {
  assistanceType: string;
  content: string;
  createdAt: Date;
  district: string;
  endTime: string;
  id: number;
  modifiedAt: Date;
  postStatus: string;
  postType: string;
  scheduleDetails: string;
  scheduleType: string;
  startTime: string;
  title: string;
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
