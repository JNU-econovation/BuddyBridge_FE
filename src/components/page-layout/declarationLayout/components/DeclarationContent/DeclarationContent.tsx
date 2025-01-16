import classNames from "classnames/bind";

import Link from "next/link";

import styles from "@/components/page-layout/declarationLayout/components/DeclarationContent/DeclarationContent.module.scss";
import { ROUTE } from "@/constants/route";
import { formatDateString } from "@/utils";

const cn = classNames.bind(styles);

export interface DeclarationContentProps {
  id?: number;
  postId: number;
  reportContent: string;
  reportDate: Date;
  reportType: string;
  reported: string;
  reporter: string;
  checkId: number;
  setCheckId: (checkId: number) => void;
}

export default function DeclarationContent({
  id,
  postId,
  reportContent,
  reportDate,
  reportType,
  reported,
  reporter,
  checkId,
  setCheckId,
}: DeclarationContentProps) {
  const handleCheckBoxClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    if (checkId !== id) {
      setCheckId(id as number);
    } else {
      setCheckId(0);
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
          <input type="checkbox" checked={checkId === id} onClick={handleCheckBoxClick} />
        </div>
        <p className={cn("reporter")}>{reported}</p>
        <p className={cn("postInfo")}>{postId}번</p>
        <p className={cn("declarationContent")}>{reportContent}</p>
        <div className={cn("declarationTypeBox")}>
          <p className={cn("declarationType")}>{reportType}</p>
        </div>
        <p className={cn("declarationPeople")}>{reporter}</p>
        <p className={cn("declarationDate")}>{formatDateString(reportDate)}</p>
      </Link>
    </li>
  );
}
