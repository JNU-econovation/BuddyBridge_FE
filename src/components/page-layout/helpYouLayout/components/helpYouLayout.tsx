import { keepPreviousData, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Link from "next/link";
import { useRouter } from "next/router";

import getPagenationItems from "@/components/common/Pagenation/apis/getHelpMeList";
import Pagination from "@/components/common/Pagenation/Pagenation";
import Post from "@/components/common/Post/Post";
import styles from "@/components/page-layout/helpYouLayout/components/helpYouLayout.module.scss";
import { ROUTE } from "@/constants/route";
import Filter from "@/components/common/Filter/Filter";

import PostData from "../../HomeLayout/types";

import { useState} from "react";

import Arrow from "@/../public/icons/arrow_down.svg";

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

  //
  const [clickedTypeBox, setClickedTypeBox] = useState(false);

  const handleTypeBoxClick = () => {
    setClickedTypeBox(true);
    console.log("페이지에서 clicked 업데이트",clickedTypeBox);
  };

  const handleClickedChange = () => {
    setClickedTypeBox(false);
  };
//

  const handleDisableClick = () => {};

  const handleHelpClick = () => {};

  const handleMatchingClick = () => {};

  return (
    <main className={cn("container")}>
      <div className={cn("box")}>
        <p className={cn("title")}>도와줄게요!리스트</p>
        <div className={cn("typeContainer")}>
          <div className={cn("typeBox")} onClick={handleTypeBoxClick}>
            <button onClick={handleDisableClick}>장애 유형</button>
            <button onClick={handleHelpClick}>도움 유형</button>
            <button onClick={handleMatchingClick}>매칭 유형</button>
            <Arrow className={cn("arrowBtn")}/>
          </div>
        </div>
      </div>
      <Filter postType="taker" clicked={clickedTypeBox} clickedChange={handleClickedChange}/>
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
          type="GIVER"
          currentPage={page}
          itemsPerPage={8}
          totalItems={data?.data.totalElements}
          setPage={setPage}
        />
      </div>
    </main>
  );
}
