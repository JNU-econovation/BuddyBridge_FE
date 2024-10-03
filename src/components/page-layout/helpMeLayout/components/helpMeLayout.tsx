import { keepPreviousData, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Link from "next/link";
import { useRouter } from "next/router";

import getPagenationItems from "@/components/common/Pagenation/apis/getHelpMeList";
import Pagination from "@/components/common/Pagenation/Pagenation";
import Post from "@/components/common/Post/Post";
import styles from "@/components/page-layout/helpMeLayout/components/helpMeLayout.module.scss";
import { ROUTE } from "@/constants/route";
import Filter from "@/components/common/Filter/Filter";
import FilterTag from "@/components/common/Filter/FilterTag";

import PostData from "../../HomeLayout/types";

import { useState, useRef } from "react";

import useOutsideClick from "@/hooks/useOutsideClick";

import Arrow from "@/../public/icons/arrow_down.svg"

const cn = classNames.bind(styles);

export default function HelpMeLayout() {
  const router = useRouter();
  const params = new URLSearchParams(router.query as any);
  const currentPage = params.get("page");
  const disabilityType = params.get("disabilityType") ?? '';
  const assistanceType = params.get("assistanceType") ?? '';
  const page = Number(currentPage) || 1;
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const setPage = (newPage: number) => {
    const pathName = router.pathname;
    params.set("page", newPage.toString());
    router.replace({
      pathname: pathName,
      query: { ...Object.fromEntries(params.entries()) },
    });
  };

  const { data } = useQuery({
    queryKey: ["post", page, disabilityType, assistanceType, params.get("postType")],
    queryFn: () => getPagenationItems(
      "TAKER",
      page, 
      8, 
      `${disabilityType}`,
      `${assistanceType}`
    ),
    placeholderData: keepPreviousData,
  });
  
  const handleFilter = (category: string, optionId: string) => {

    const searchParams = new URLSearchParams(params.toString());
    const selectedDisabilityType = searchParams.get("disabilityType") ?? '';
    const selectedAssistanceType = searchParams.get("assistanceType") ?? '';

    var disabililtyTypeList = selectedDisabilityType ? selectedDisabilityType.split(',') : [];
    var assistanceTypeList = selectedAssistanceType ? selectedAssistanceType.split(',') : [];

    if (category === "disabilityType") {
      if (disabililtyTypeList.includes(optionId)) {
        disabililtyTypeList = disabililtyTypeList.filter((e)=>e !== optionId)
        searchParams.set("disabilityType", disabililtyTypeList.join(','));
      } else {
        disabililtyTypeList.push(optionId);
        searchParams.set("disabilityType", disabililtyTypeList.join(','));
      }
    } else if (category === "assistanceType") {
      if (assistanceTypeList.includes(optionId)) {
        assistanceTypeList = assistanceTypeList.filter((e)=>e !== optionId)
        searchParams.set("assistanceType", assistanceTypeList.join(','));
      } else {
        assistanceTypeList.push(optionId)
        searchParams.set("assistanceType", assistanceTypeList.join(','));
      }
    }

    router.replace({
      pathname: router.pathname,
      query: { ...Object.fromEntries(searchParams.entries()) },
    });
  };

  const handleDisableClick = () => {};

  const handleHelpClick = () => {};

  const handleMatchingClick = () => {};

  const filterRef = useRef<HTMLDivElement>(null);
  const filterRef2 = useRef<HTMLDivElement>(null);
  useOutsideClick([filterRef, filterRef2], () => setIsVisible(false));

  return (
    <main className={cn("container")}>
      <div className={cn("box")}>
        <p className={cn("title")}>도와줄래요?리스트</p>
        <div className={cn("typeContainer")}>
          <div className={cn("typeBox")} onClick={()=>setIsVisible(true)}>
            <button onClick={handleDisableClick}>장애 유형</button>
            <button onClick={handleHelpClick}>도움 유형</button>
            <button onClick={handleMatchingClick}>매칭 유형</button>
            <Arrow className={cn("arrowBtn")}/>
          </div>
          {isVisible? <Filter searchParams={params} handleFilter={handleFilter} ref={filterRef}/> : null}
        </div>
      </div>
      <FilterTag searchParams={params} handleFilter={handleFilter} ref={filterRef2}/>
      <div className={cn("cardListContainer")}>
        <div className={cn("cardListBox")}>
          {data?.data.content.map((post: PostData) => (
            <Post data={post} key={post.id} />
          ))}
          <Link href={ROUTE.HELP_ME_REGISTER} className={cn("button")}>
            작성하기
          </Link>
        </div>
        <Pagination
          type="TAKER"
          currentPage={page}
          itemsPerPage={8}
          totalItems={data?.data.totalElements}
          setPage={setPage}
        />
      </div>
    </main>
  );
}
