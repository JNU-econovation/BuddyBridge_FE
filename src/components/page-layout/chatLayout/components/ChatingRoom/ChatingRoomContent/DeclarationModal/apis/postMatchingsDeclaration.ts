import { axiosInstance } from "@/apis/axiosInstance";

interface ContentType {
  reportType: "욕설/혐오/차별적 표현" | "불쾌한 표현" | "스팸/홍보/도배글" | "불법정보 포함" | "기타";
  reportReason: string;
}

export default async function postMatchingsDeclaration(content: ContentType, matchingId: number) {
  const { data } = await axiosInstance.post(`v1/reports/matchings/${matchingId}`, {
    ...content,
  });

  return data.data;
}
