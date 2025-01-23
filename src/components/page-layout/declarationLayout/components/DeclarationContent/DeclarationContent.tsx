import classNames from "classnames/bind";

import Link from "next/link";

import styles from "@/components/page-layout/declarationLayout/components/DeclarationContent/DeclarationContent.module.scss";
import { ROUTE } from "@/constants/route";
import Black_List from "@/icons/black_list.svg";
import { formatDateString } from "@/utils";

const cn = classNames.bind(styles);

export interface DeclarationContentProps {
  id?: number;
  postId: number;
  reportContent: string;
  reportDate: Date;
  reportType: string;
  reportedName: string;
  reporterName: string;
  checkId: {
    id: number;
    reportedId: number;
  };
  setCheckId: (checkId: { id: number; reportedId: number }) => void;
  isBlackListed: boolean;
  reportedId: number;
  postType: "GIVER" | "TAKER";
}

export default function DeclarationContent({
  id,
  postId,
  reportContent,
  reportDate,
  reportType,
  reportedName,
  reporterName,
  checkId,
  reportedId,
  setCheckId,
  isBlackListed,
  postType,
}: DeclarationContentProps) {
  const handleCheckBoxClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    if (checkId.id !== id) {
      setCheckId({ id: id as number, reportedId });
    } else {
      setCheckId({ id: 0, reportedId: 0 });
    }
  };

  function changeDeclarationType(type: "게시글" | "댓글" | "채팅방") {
    if (type === "게시글") {
      return "post";
    } else if (type === "댓글") {
      return "comment";
    } else {
      return "chattingRoom";
    }
  }

  return (
    <li>
      <Link
        href={`${ROUTE.ADMIN_DECLARATION}/${changeDeclarationType(
          reportContent.split(" ")[0] as "게시글" | "댓글" | "채팅방",
        )}/${id}`}
        className={cn("container")}
      >
        <div className={cn("check")}>
          <input type="checkbox" checked={checkId.id === id} onClick={handleCheckBoxClick} />
        </div>
        <div className={cn("reportedBox")}>
          <p className={cn("reported")}>
            {reportedName}
            {isBlackListed && <Black_List className={cn("blackList")} />}
          </p>
        </div>
        <p className={cn("postInfo")}>{`${postType === "TAKER" ? "도와줄래요?" : "도와줄게요!"} ${postId}`}번</p>
        <p className={cn("declarationContent")}>{reportContent}</p>
        <div className={cn("declarationTypeBox")}>
          <p className={cn("declarationType")}>{reportType}</p>
        </div>
        <p className={cn("declarationPeople")}>{reporterName}</p>
        <p className={cn("declarationDate")}>{formatDateString(reportDate)}</p>
      </Link>
    </li>
  );
}
