import { Bounce, toast } from "react-toastify";
import TOAST_TYPE from "@/common/components/Toast/constants/toastType";

type OpenToastType = keyof typeof TOAST_TYPE;

export default function openToast(type: OpenToastType, text: string, time = 3000) {
  toast[type](text, {
    position: "bottom-center", // 위치
    autoClose: time, // 시간
    hideProgressBar: false, // 로딩 바
    closeOnClick: true, // 클릭 -> 닫기
    pauseOnHover: false, // 마우스 오버 시간 멈추기
    draggable: false, // 드래그로 닫기
    progress: undefined, // 0이나 1을 넣으면 로딩 바 안움직임
    theme: "light",
    transition: Bounce, // 애니메이션
  });
}
