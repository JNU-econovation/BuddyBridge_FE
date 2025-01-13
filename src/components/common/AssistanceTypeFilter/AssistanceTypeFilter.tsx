import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import { ROUTE } from "@/constants/route";

import styles from "./AssistanceTypeFilter.module.scss";

const cn = classNames.bind(styles);

export interface AssistanceTypeFilterProps {
  memberRole: "TAKER" | "GIVER";
  pageId: string;
}

export default function AssistanceTypeFilter({ memberRole, pageId }: AssistanceTypeFilterProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleFilterClick = (memberRole: string) => {
    const updateQuery = {
      ...router.query,
      memberRole: memberRole,
    };

    router.push({
      pathname: ROUTE.MY_PAGE_Finished,
      query: updateQuery,
    });

    queryClient.invalidateQueries({ queryKey: ["Finisehd", pageId, memberRole] });
  };

  return (
    <div className={cn("assistanceTypeFilterBox")}>
      <button onClick={() => handleFilterClick("TAKER")} className={cn("takerBox", { picked: memberRole === "TAKER" })}>
        도움을 받았어요
        <div className={cn("taker", { picked: memberRole === "TAKER" })}></div>
      </button>
      <button onClick={() => handleFilterClick("GIVER")} className={cn("giverBox", { picked: memberRole === "GIVER" })}>
        도움을 줬어요
        <div className={cn("giver", { picked: memberRole === "GIVER" })}></div>
      </button>
    </div>
  );
}
