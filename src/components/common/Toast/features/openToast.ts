import { Bounce, toast } from "react-toastify";

import TOAST_TYPE from "@/components/common/Toast/constants/toastType";

type OpenToastType = keyof typeof TOAST_TYPE;

export default function openToast(type: OpenToastType, text: string, time = 3000) {
  toast[type](text, {
    position: "bottom-center",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}
