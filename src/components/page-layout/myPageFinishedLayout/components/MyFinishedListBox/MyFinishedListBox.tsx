import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import AssistanceTypeFilter, {
  AssistanceTypeFilterProps,
} from "@/components/common/AssistanceTypeFilter/AssistanceTypeFilter";
import Pagination from "@/components/common/Pagenation/Pagenation";

import styles from "./MyFinishedListBox.module.scss";
import getMyFinished from "../../apis/getMyFinished";
import CompleteToggle from "../CompleteToggle/CompleteToggle";
import MyFinishedList from "../MyFinishedList/MyFinishedList";

const cn = classNames.bind(styles);

export default function MyFinishedListBox() {
  const router = useRouter();
  const memberRole = (router.query.memberRole as AssistanceTypeFilterProps["memberRole"]) || "TAKER";
  const pageId = Number(router.query.pageId) || 1;
  const params = new URLSearchParams(router.query as any);
  const [isToggleOn, setIsToggleOn] = useState(false);

  const toggleSwitch = () => {
    setIsToggleOn((prev) => !prev);
  };

  const {
    data: FinishedList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Finished", pageId, memberRole, isToggleOn],
    queryFn: () => getMyFinished(pageId - 1, memberRole, isToggleOn),
    enabled: !!memberRole,
  });

  const setPage = (newPage: number) => {
    const pathName = router.pathname;
    params.set("pageId", newPage.toString());
    router.replace({
      pathname: pathName,
      query: { ...Object.fromEntries(params.entries()) },
    });
  };

  if (isLoading || !FinishedList) return <div>로딩...</div>;

  if (isError) return <div>에러...</div>;

  return (
    <div className={cn("myPageFinishedList")}>
      <AssistanceTypeFilter pageId={`${pageId}`} memberRole={memberRole} />
      <div className={cn("myFinishedListBox")}>
        <CompleteToggle isOn={isToggleOn} toggleSwitch={toggleSwitch} />
        <MyFinishedList
          finishedList={FinishedList.content}
          memberRole={memberRole}
          pageId={pageId}
          isToggleOn={isToggleOn}
        />
        <div className={cn("paginationBox")}>
          <Pagination
            currentPage={Number(pageId)}
            itemsPerPage={4}
            totalItems={Number(FinishedList?.totalElements)}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}
