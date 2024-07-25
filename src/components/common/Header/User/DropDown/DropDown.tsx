import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/components/common/Header/User/DropDown/DropDown.module.scss";
import openToast from "@/components/common/Toast/features/openToast";
import { ROUTE } from "@/constants/route";
import NoImg from "@/images/noimg.png";
import useUserInfoStore from "@/stores/kakaoInnfo";

import getLogOut from "../../apis/getLogOut";

const cn = classNames.bind(styles);

interface DropDownProps {
  isNameClick: boolean;
}

export default function DropDown({ isNameClick }: DropDownProps) {
  const { userInfo, setUserInfo } = useUserInfoStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const clearUserInfoStorage = useUserInfoStore.persist.clearStorage;

  const logOutMutation = useMutation({
    mutationFn: getLogOut,
    onSuccess: async () => {
      // todo : queryKey를 0이 아니라 page로 바꿔야함.

      await router.push(ROUTE.HOME);
      openToast("success", "로그아웃되었습니다.");
      setUserInfo(null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      clearUserInfoStorage();
    },
  });

  const handleLogoutClick = () => {
    logOutMutation.mutate();
  };

  return (
    <div className={cn("dropDownContainer", { hidden: isNameClick })}>
      <div className={cn("myProfileContainer")}>
        <p>내 프로필</p>
        <Image
          className={cn("img")}
          src={userInfo?.profileImageUrl ? userInfo?.profileImageUrl : NoImg}
          width={80}
          height={80}
          alt="카카오톡 프로필"
        />
      </div>
      <Link href={ROUTE.MY_PAGE} className={cn("myPage")}>
        마이페이지
      </Link>
      <button onClick={handleLogoutClick} className={cn("logout")}>
        로그아웃
      </button>
    </div>
  );
}
