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
import FilterTag from "@/components/common/Filter/FilterTag";

import PostData from "../../HomeLayout/types";

import { useState,useRef } from "react";

import useOutsideClick from "@/hooks/useOutsideClick";

import Arrow from "@/../public/icons/arrow_down.svg";

const cn = classNames.bind(styles);

export default function HelpYouLayout() {
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
      "GIVER",
      page, 
      8, 
      "recruiting",
      `${disabilityType}`,
      `${assistanceType}`
    ),
    placeholderData: keepPreviousData,
  });

  

  const handleFilter = (category: string, optionId: string) => {

    const searchParams = new URLSearchParams(params.toString());
    const selectedDisabilityType = searchParams.get("disabilityType") ?? '';
    const selectedAssistanceType = searchParams.get("assistanceType") ?? '';

    var disabililtyTypeList = selectedDisabilityType && selectedDisabilityType !== 'null' ? selectedDisabilityType.split(',') : [];
    var assistanceTypeList = selectedAssistanceType && selectedAssistanceType !== 'null' ? selectedAssistanceType.split(',') : [];


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

  return (
    <main className={cn("container")}>
      <div className={cn("box")}>
        <div className={cn("typeContainer")}>
          <p className={cn("title")}> 
            버디브릿지는 일상에서 모두가 서로에게 <br/>
            따뜻한 온정을 전하는 세상을 만듭니다.
          </p>
          <Filter searchParams={params} handleFilter={handleFilter}/>
        </div>
      </div>
      <FilterTag searchParams={params} handleFilter={handleFilter}/>
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
