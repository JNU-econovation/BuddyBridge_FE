import axiosInstance from "@/apis/axiosInstance";
import { FilterParams } from "./filterGiverPost";

export default async function filterGiverPost({disabilityType, assistanceType}:FilterParams) {
    const { data } = await axiosInstance.get(
        `posts?post-type=TAKER&disabilityType=${disabilityType}&assistanceType=${assistanceType}`,);
    return data.data.content;
}