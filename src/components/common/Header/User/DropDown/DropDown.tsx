import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import postLogOut from "@/components/common/Header/apis/postLogOut";
import styles from "@/components/common/Header/User/DropDown/DropDown.module.scss";
import openToast from "@/components/common/Toast/features/openToast";
import { ROUTE } from "@/constants/route";
import NoImg from "@/images/noimg.png";

import getLogIn from "../../apis/getLogIn";

const cn = classNames.bind(styles);

interface DropDownProps {
  isNameClick: boolean;
}

export default function DropDown({ isNameClick }: DropDownProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["userLogIn"],
    queryFn: () => getLogIn(),
  });

  const logOutMutation = useMutation({
    mutationFn: postLogOut,
    onSuccess: async () => {
      window.localStorage.removeItem("accessToken");
      window.localStorage.removeItem("refreshToken");

      openToast("success", "로그아웃되었습니다.");
      await router.push(ROUTE.HOME);
      queryClient.invalidateQueries({ queryKey: ["userLogIn"] });
      queryClient.invalidateQueries({ queryKey: ["giverPost"] });
      queryClient.invalidateQueries({ queryKey: ["takerPost"] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["userLogIn"] });
      openToast("error", "로그아웃이 실패하였습니다.");
    },
  });

  const handleLogoutClick = async () => {
    await logOutMutation.mutate();
  };

  return (
    <div className={cn("dropDownContainer", { hidden: isNameClick })}>
      <div className={cn("myProfileContainer")}>
        <p>내 프로필</p>
        <Image
          className={cn("img")}
          src={data?.profileImageUrl ? data?.profileImageUrl : NoImg}
          width={80}
          height={80}
          alt="카카오톡 프로필"
        />
        <p>{data.nickname}</p>
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
