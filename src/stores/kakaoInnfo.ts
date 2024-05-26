import { KaKaoUserInfo } from "@/types/user";
import { create } from "zustand";

interface UserInfoState {
  userInfo: KaKaoUserInfo | null;

  setUserInfo: (userInfo: KaKaoUserInfo) => void;
}

const useUserInfoStore = create<UserInfoState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo: userInfo }),
}));

export default useUserInfoStore;
