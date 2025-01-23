import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/chatLayout/components/chatLayout.module.scss";
import { ROUTE } from "@/constants/route";

import ChatingRoom from "./ChatingRoom/ChatingRoom";
import ChatList from "./ChatList/ChatList";
import MyInfo from "./ChatList/MyInfo/MyInfo";
import getMyInfo from "../../myPageEditLayout/apis/getMyInfo";

const cn = classNames.bind(styles);

export default function ChatLayout() {
  const router = useRouter();

  const { data: myInfoData, isFetching } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getMyInfo(),
  });

  useEffect(() => {
    if (!myInfoData && !isFetching) {
      router.push(ROUTE.LOGIN);
      openToast("error", "로그인을 해주세요.");
    }
  }, [myInfoData, router, isFetching]);

  const [matchingState, setMatchingState] = useState<"ALL" | "PENDING" | "DONE">("ALL");

  return (
    <div className={cn("container")}>
      <MyInfo />
      <ChatList matchingState={matchingState} setMatchingState={setMatchingState} />
      <ChatingRoom matchingState={matchingState} />
    </div>
  );
}
