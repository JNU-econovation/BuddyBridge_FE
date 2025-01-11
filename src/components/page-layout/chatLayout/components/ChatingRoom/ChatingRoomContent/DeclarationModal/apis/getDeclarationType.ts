import { axiosInstance } from "@/apis/axiosInstance";

type DeclarationType = "욕설/혐오/차별적 표현" | "불쾌한 표현" | "스팸/홍보/도배글" | "불법정보 포함" | "기타";

export interface DeclarationTypeResponse {
  success: boolean;
  data: DeclarationType[];
  error: {
    message: string;
    code: string;
    status: number;
  };
}

export default async function getDeclarationType() {
  const { data } = await axiosInstance.get<DeclarationTypeResponse>(`v1/reports/types`);

  return data.data;
}
