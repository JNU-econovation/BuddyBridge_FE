import { axiosInstance } from "@/apis/axiosInstance";

export default async function getReportTypes() {
    const { data } = await axiosInstance.get(`v1/reports/types`);
    console.log(data);
    return data.data;
}