import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import postLogOut from "@/components/common/Header/apis/postLogOut";
import styles from "@/components/common/Header/User/DropDown/DropDown.module.scss";
import openToast from "@/components/common/Toast/features/openToast";
import { ROUTE } from "@/constants/route";
import NoImg from "@/images/noimg.png";
import { ErrorResponse } from "@/types/error";

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
      await queryClient.removeQueries({ queryKey: ["userLogIn"] });
      await queryClient.invalidateQueries({ queryKey: ["mainHelpMePostList"] });
      await queryClient.invalidateQueries({ queryKey: ["mainHelpYouPostList"] });
      router.push(ROUTE.HOME);
      openToast("success", "로그아웃되었습니다.");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.error.invalidParams) {
        openToast("error", error.response.data.error.invalidParams[0].message);
      } else if (error.response?.data.error.message) {
        openToast("error", error.response.data.error.message);
      } else {
        openToast("error", "로그아웃이 실패하였습니다.");
      }
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
        <p>{data?.nickname}님</p>
      </div>
      <Link href={ROUTE.MY_PAGE} className={cn("myPage")}>
        마이페이지
      </Link>
      {data?.role === "ADMIN" && (
        <Link href={ROUTE.ADMIN_DECLARATION} className={cn("adminPage")}>
          관리자페이지
        </Link>
      )}
      <button onClick={handleLogoutClick} className={cn("logout")}>
        로그아웃
      </button>
    </div>
  );
}
