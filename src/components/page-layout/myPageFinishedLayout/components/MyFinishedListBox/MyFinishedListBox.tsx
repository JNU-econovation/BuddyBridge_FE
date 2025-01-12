import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import AssistanceTypeFilter, {
  AssistanceTypeFilterProps,
} from "@/components/common/AssistanceTypeFilter/AssistanceTypeFilter";
import Pagination from "@/components/common/Pagenation/Pagenation";
//import PostTypeFilter from "@/components/page-layout/myPageLikesLayout/components/PostTypeFilter/PostTypeFilter";
import { ROUTE } from "@/constants/route";

import styles from "./MyFinishedListBox.module.scss";
import getMyFinished from "../../apis/getMyFinished";
import MyFinishedList from "../MyFinishedList/MyFinishedList";

const cn = classNames.bind(styles);

export default function MyFinishedListBox() {
  const router = useRouter();
  const memberRole = (router.query.memberRole as AssistanceTypeFilterProps["memberRole"]) || "TAKER";
  const pageId = router.query.pageId || "1";
  const params = new URLSearchParams(router.query as any);

  const {
    data: FinishedList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Finished", pageId, memberRole],
    queryFn: () => getMyFinished(`${pageId}`, memberRole),
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
        <MyFinishedList finishedList={FinishedList.content} />
        <div className={cn("paginationBox")}>
          <Pagination
            type={memberRole}
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
