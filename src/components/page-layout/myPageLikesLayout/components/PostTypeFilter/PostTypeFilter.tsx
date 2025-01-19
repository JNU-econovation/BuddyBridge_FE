import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useRouter } from "next/router";

import styles from "./PostTypeFilter.module.scss";

const cn = classNames.bind(styles);

export interface PostTypeFilterProps {
  postType: "TAKER" | "GIVER";
  pageId: string;
  queryKey: string;
  route: string;
}

export default function PostTypeFilter({ queryKey, route, postType, pageId }: PostTypeFilterProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleFilterClick = (postType: string) => {
    const updateQuery = {
      ...router.query,
      postType: postType,
    };

    router.push({
      pathname: route,
      query: updateQuery,
    });

    queryClient.invalidateQueries({ queryKey: [queryKey, pageId, postType] });
  };

  return (
    <div className={cn("postTypeFilterBox")}>
      <button
        onClick={()=>handleFilterClick("TAKER")}
        className={cn("takerBox", { picked: postType === "TAKER" })}
      >
        도와줄래요?
        <div className={cn("taker", { picked: postType === "TAKER" })}>
        </div>
      </button>
      <button
        onClick={()=>handleFilterClick("GIVER")}
        className={cn("giverBox", { picked: postType === "GIVER" })}
      >
        도와줄게요!
        <div className={cn("giver", { picked: postType === "GIVER" })}>
        </div>
      </button>
    </div>
  );
}
