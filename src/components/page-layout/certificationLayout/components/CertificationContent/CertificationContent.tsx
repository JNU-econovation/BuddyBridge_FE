import classNames from "classnames/bind";

import Link from "next/link";

import styles from "@/components/page-layout/certificationLayout/components/CertificationContent/CertificationContent.module.scss";
import { formatDateString } from "@/utils";

const cn = classNames.bind(styles);

export interface CertificationContentProps {
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

export default function CertificationContent({
  id,
  postId,
  reportContent,
  reportDate,
  reportType,
  reported,
  checkId,
  setCheckId,
}: CertificationContentProps) {
  const handleCheckBoxClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    if (checkId !== id) {
      setCheckId(id as number);
    } else {
      setCheckId(0);
    }
  };

  return (
    <li>
      <Link href={"/"} className={cn("container")}>
        <div className={cn("check")}>
          <input type="checkbox" checked={checkId === id} onClick={handleCheckBoxClick} />
        </div>
        <p className={cn("volunteer")}>{reported}</p>
        <p className={cn("volunteerPostInfo")}>{postId}번</p>
        <p className={cn("volunteerEmail")}>{reportContent}</p>
        <div className={cn("volunteerGrantBox")}>
          <p className={cn("volunteerGrant")}>{reportType}</p>
        </div>
        <p className={cn("writeDate")}>{formatDateString(reportDate)}</p>
      </Link>
    </li>
  );
}
