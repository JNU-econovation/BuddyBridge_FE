export interface MyWriteCommentResponse {
  success: boolean;
  data: {
    content: CommentType[];
    totalElements: number;
    last: boolean;
  };
  error: {
    message: string;
    code: string;
    status: number;
  };
}

export interface CommentType {
  assistanceType: "학습" | "이동" | "식사";
  commentId: number;
  content: string;
  disabilityType: "시각장애" | "청각장애" | "지적장애" | "지체장애" | "자폐성장애" | "뇌병변장애" | "정신장애" | "없음";
  postCreatedAt: Date;
  postId: number;
  postStatus: "RECRUITING" | "FINISHED";
  postTitle: string;
  postType: "TAKER" | "GIVER";
}
