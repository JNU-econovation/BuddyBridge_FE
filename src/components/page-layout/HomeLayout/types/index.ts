export default interface PostData {
  assistance: {
    assistanceType: string;
    assistanceStartTime: string;
    assistanceEndTime: string;
  }

  schedule: {
    scheduleType: string;
    startDate: string;
    endDate: string;
  }
  content: string;
  createdAt: Date;
  district: string;
  id: number;
  modifiedAt: Date;
  postStatus: string;
  postType: string;
  scheduleDetails: string;
  title: string;
  disabilityType: string;
  isLiked: boolean;
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
