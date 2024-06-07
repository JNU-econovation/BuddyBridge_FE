export interface helpMeFormData {
  title: string;
  gender: "남성" | "여성";
  schedule: {
    startDate: Date;
    endDate: Date;
    scheduleType: "정기" | "비정기";
  };
  scheduleDetail: string;
  district:
    | "광주광역시"
    | "광주광역시 북구"
    | "광주광역시 서구"
    | "광주광역시 남구"
    | "광주광역시 동구"
    | "광주광역시 광산구";
  assistanceType: "교육" | "생활";
  content: string;
  postType: string;
  age: number;
  disability: "시각장애" | "청각장애" | "지적장애" | "지체장애" | "자폐성장애" | "뇌병변장애" | "정신장애";
  member: number;
}
