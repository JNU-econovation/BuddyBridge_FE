import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Link from "next/link";

import { ROUTE } from "@/constants/route";

import styles from "./PostTypeFilter.module.scss";

const cn = classNames.bind(styles);

export interface PostTypeFilterProps {
  postType: "TAKER" | "GIVER";
  pageId: string;
}

export default function PostTypeFilter({ postType, pageId }: PostTypeFilterProps) {
  const queryClient = useQueryClient();

  const handleFilterClick = () => {
    queryClient.invalidateQueries({ queryKey: ["LikesList", pageId, postType] });
  };

  return (
    <div className={cn("postTypeFilterBox")}>
      <Link
        onClick={handleFilterClick}
        href={`${ROUTE.MY_PAGE_Likes}?postType=TAKER`}
        className={cn("taker", { picked: postType === "TAKER" })}
      >
        도와줄래요?
      </Link>
      <Link
        onClick={handleFilterClick}
        href={`${ROUTE.MY_PAGE_Likes}?postType=GIVER`}
        className={cn("giver", { picked: postType === "GIVER" })}
      >
        도와줄게요!
      </Link>
    </div>
  );
}
