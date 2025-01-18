import { useEffect } from "react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Link from "next/link";
import { useRouter } from "next/router";

import Filter from "@/components/common/Filter/Filter";
import getPagenationItems from "@/components/common/Pagenation/apis/getHelpMeList";
import Pagination from "@/components/common/Pagenation/Pagenation";
import Post from "@/components/common/Post/Post";
import styles from "@/components/page-layout/helpMeLayout/components/helpMeLayout.module.scss";
import { ROUTE } from "@/constants/route";
import RegisterArrow from "@/icons/send_arrow.svg";
import { PostType } from "@/types/post";

const cn = classNames.bind(styles);

export default function HelpMeLayout() {
  const router = useRouter();
  const params = new URLSearchParams(router.query as any);

  const currentPage = params.get("page");
  const all = params.get("all") ?? "";
  const disabilityType = params.get("disabilityType") ?? "";
  const assistanceType = params.get("assistanceType") ?? "";
  const postStatus = params.get("postStatus") ?? "";
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
    queryKey: ["post", page, disabilityType, assistanceType, postStatus],
    queryFn: () => getPagenationItems("TAKER", page - 1, 8, all, postStatus, disabilityType, assistanceType),
    placeholderData: keepPreviousData,
    enabled: !!all || !!disabilityType || !!assistanceType || !!postStatus,
  });

  const handleFilter = (category: string, optionId: string) => {
    const searchParams = new URLSearchParams(params.toString());
    const selectedAllType = searchParams.get("allType") ?? "";
    const selectedDisabilityType = searchParams.get("disabilityType") ?? "";
    const selectedAssistanceType = searchParams.get("assistanceType") ?? "";
    const selectedPostStatus = searchParams.get("postStatus") ?? "";

    let allTypeList = selectedAllType ? selectedAllType.split(",") : [];
    let disabilityTypeList = selectedDisabilityType ? selectedDisabilityType.split(",") : [];
    let assistanceTypeList = selectedAssistanceType ? selectedAssistanceType.split(",") : [];
    let postStatusList = selectedPostStatus ? selectedPostStatus.split(",") : [];

    if (category === "all") {
      allTypeList.push(optionId);
      searchParams.set("all", allTypeList.join(","));
      searchParams.delete("disabilityType");
      searchParams.delete("assistanceType");
      searchParams.delete("postStatus");
    } else if (category === "disabilityType") {
      if (disabilityTypeList.includes(optionId)) {
        disabilityTypeList = disabilityTypeList.filter((e) => e !== optionId);
        if (disabilityTypeList.length === 0) {
          searchParams.delete("disabilityType");
        } else {
          searchParams.set("disabilityType", disabilityTypeList.join(","));
        }
      } else {
        disabilityTypeList.push(optionId);
        searchParams.set("disabilityType", disabilityTypeList.join(","));
        searchParams.delete("all");
      }
    } else if (category === "assistanceType") {
      if (assistanceTypeList.includes(optionId)) {
        assistanceTypeList = assistanceTypeList.filter((e) => e !== optionId);
        if (assistanceTypeList.length === 0) {
          searchParams.delete("assistanceType");
        } else {
          searchParams.set("assistanceType", assistanceTypeList.join(","));
        }
      } else {
        assistanceTypeList.push(optionId);
        searchParams.set("assistanceType", assistanceTypeList.join(","));
        searchParams.delete("all");
      }
    } else if (category === "postStatus") {
      if (postStatusList.includes(optionId)) {
        postStatusList = postStatusList.filter((e) => e !== optionId);
        if (postStatusList.length === 0) {
          searchParams.delete("postStatus");
        } else {
          searchParams.set("postStatus", postStatusList.join(","));
        }
      } else {
        postStatusList.push(optionId);
        searchParams.set("postStatus", postStatusList.join(","));
        searchParams.delete("all");
      }
    }

    router.replace({
      pathname: router.pathname,
      query: { ...Object.fromEntries(searchParams.entries()) },
    });
  };

  useEffect(() => {
    if (!params.has("allType")) {
      params.set("all", "true");
      router.replace(`${router.pathname}?${params.toString()}`);
    }
  }, []);

  return (
    <main className={cn("container")}>
      <div className={cn("filterContainer")}>
        <div className={cn("title")}>
          <p>버디브릿지는 일상에서 모두가 서로에게 </p>
          <p> 따뜻한 온정을 전하는 세상을 만듭니다.</p>
        </div>
        <Filter searchParams={params} handleFilter={handleFilter} />
      </div>
      <Link href={ROUTE.HELP_ME_REGISTER} className={cn("button")}>
        작성하기
        <RegisterArrow className={cn("arrow")} />
      </Link>
      <div className={cn("cardListContainer")}>
        <div className={cn("cardListBox")}>
          {data?.data.content.map((post: PostType) => (
            <Post data={post} key={post.id} />
          ))}
        </div>
        <Pagination currentPage={page} itemsPerPage={8} totalItems={data?.data.totalElements} setPage={setPage} />
      </div>
    </main>
  );
}
