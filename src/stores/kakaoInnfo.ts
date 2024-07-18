import { create } from "zustand";

import { KaKaoUserInfo } from "@/types/user";

interface UserInfoState {
  userInfo: KaKaoUserInfo | null;
  setUserInfo: (userInfo: KaKaoUserInfo) => void;

  code: string;
  setCode: (code: string) => void;
}

const useUserInfoStore = create<UserInfoState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo: userInfo }),
  code: "",
  setCode: (code) => set({ code: code }),
}));

export default useUserInfoStore;
