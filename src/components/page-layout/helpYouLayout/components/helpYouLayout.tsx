import { keepPreviousData, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Link from "next/link";
import { useRouter } from "next/router";

import getPagenationItems from "@/components/common/Pagenation/apis/getHelpMeList";
import Pagination from "@/components/common/Pagenation/Pagenation";
import Post from "@/components/common/Post/Post";
import styles from "@/components/page-layout/helpYouLayout/components/helpYouLayout.module.scss";
import { ROUTE } from "@/constants/route";

import PostData from "../../HomeLayout/types";

const cn = classNames.bind(styles);

export default function HelpYouLayout() {
  const router = useRouter();
  const params = new URLSearchParams(router.query as any);
  const currentPage = params.get("page");
  const page = Number(currentPage) || 1;

  const setPage = (newPage: number) => {
    const pathName = router.pathname;
    params.set("page", newPage.toString());
    router.replace({
      pathname: pathName,
      query: { ...Object.fromEntries(params.entries()) },
    });
  };

  const { data } = useQuery({
    queryKey: ["post", page],
    queryFn: () => getPagenationItems("GIVER", page, 8),
    placeholderData: keepPreviousData,
  });

  const handleDisableClick = () => {};

  const handleHelpClick = () => {};

  const handleMatchingClick = () => {};

  return (
    <main className={cn("container")}>
      <div className={cn("box")}>
        <p className={cn("title")}>도와줄래요!리스트</p>
        <div className={cn("typeContainer")}>
          <div className={cn("typeBox")}>
            <p>#</p>
            <button onClick={handleDisableClick}>장애 유형</button>
            <button onClick={handleHelpClick}>도움 유형</button>
            <button onClick={handleMatchingClick}>매칭 유형</button>
          </div>
        </div>
      </div>
      <div className={cn("cardListContainer")}>
        <div className={cn("cardListBox")}>
          {data?.data.content.map((post: PostData) => (
            <Post data={post} key={post.id} />
          ))}
          <Link href={ROUTE.HELP_YOU_REGISTER} className={cn("button")}>
            작성하기
          </Link>
        </div>
        <Pagination
          type="giver"
          currentPage={page + 1}
          itemsPerPage={8}
          totalItems={data?.data.totalElements}
          setPage={setPage}
        />
      </div>
    </main>
  );
}
