export interface PostListResponse {
  success: boolean;
  data: {
    content: PostType[];
    totalElements: number;
    last: boolean;
  };
  error: {
    message: string;
    code: string;
    status: number;
  };
}
export interface PostType {
  id: number;
  title: string;
  district: "광주광역시" | "북구" | "서구" | "동구" | "남구" | "광산구";
  postType: "TAKER" | "GIVER";
  postStatus: "RECRUITING" | "FINISHED";
  disabilityType: "시각장애" | "청각장애" | "지적장애" | "지체장애" | "자폐성장애" | "뇌병변장애" | "정신장애" | "없음";
  assistance: {
    assistanceType: "학습" | "이동" | "식사";
    assistanceStartTime: Date;
    assistanceEndTime: Date;
  };
  schedule: {
    startDate: Date;
    endDate: Date;
    scheduleType: "정기" | "비정기";
  };
  isLiked: boolean;
}
