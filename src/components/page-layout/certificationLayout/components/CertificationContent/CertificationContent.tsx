import classNames from "classnames/bind";

import Link from "next/link";

import styles from "@/components/page-layout/certificationLayout/components/CertificationContent/CertificationContent.module.scss";
import { ROUTE } from "@/constants/route";
import Black_List from "@/icons/black_list.svg";
import { formatDateString } from "@/utils";

const cn = classNames.bind(styles);

export interface CertificationContentProps {
  certificationId?: number;
  postId: number;
  volunteerEmail: string;
  certificationCreatedDate: Date;
  isCertified: boolean;
  volunteerName: string;
  reporter: string;
  checkId: number;
  postType: "TAKER" | "GIVER";
  setCheckId: (checkId: number) => void;
  isBlackListed: boolean;
}

export default function CertificationContent({
  certificationId,
  postId,
  volunteerEmail,
  certificationCreatedDate,
  isCertified,
  volunteerName,
  checkId,
  postType,
  setCheckId,
  isBlackListed,
}: CertificationContentProps) {
  const handleCheckBoxClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    if (checkId !== certificationId) {
      setCheckId(certificationId as number);
    } else {
      setCheckId(0);
    }
  };

  return (
    <li>
      <Link href={`${ROUTE.ADMIN_CERTIFICATION}/${certificationId}`} className={cn("container")}>
        <div className={cn("check")}>
          <input type="checkbox" checked={checkId === certificationId} onClick={handleCheckBoxClick} />
        </div>
        <div className={cn("volunteerBox")}>
          <p className={cn("volunteerName")}>
            {volunteerName}
            {isBlackListed && <Black_List className={cn("blackList")} />}
          </p>
        </div>
        <p className={cn("volunteerPostInfo")}>
          {`${postType === "GIVER" ? "도와줄게요! " : "도와줄래요? "}${postId}`}번
        </p>
        <p className={cn("volunteerEmail")}>{volunteerEmail}</p>
        <div className={cn("volunteerGrantBox")}>
          <p className={cn("volunteerGrant", { Certified: isCertified })}>{isCertified ? "DONE" : "NONE"}</p>
        </div>
        <p className={cn("writeDate")}>{formatDateString(certificationCreatedDate)}</p>
      </Link>
    </li>
  );
}
