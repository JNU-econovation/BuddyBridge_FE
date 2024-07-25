import { create } from "zustand";
import { persist } from "zustand/middleware";

import { KaKaoUserInfo } from "@/types/user";

interface UserInfoState {
  userInfo: KaKaoUserInfo | null;
  setUserInfo: (userInfo: KaKaoUserInfo | null) => void;

  code: string;
  setCode: (code: string) => void;
}

const useUserInfoStore = create(
  persist<UserInfoState>(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo) => set({ userInfo: userInfo }),
      code: "",
      setCode: (code) => set({ code: code }),
    }),
    {
      name: "userInfoStorage",
    },
  ),
);

export default useUserInfoStore;
