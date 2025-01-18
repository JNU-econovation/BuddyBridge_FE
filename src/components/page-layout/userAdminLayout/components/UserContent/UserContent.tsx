import classNames from "classnames/bind";

import styles from "@/components/page-layout/userAdminLayout/components/UserContent/UserContent.module.scss";

const cn = classNames.bind(styles);

export interface UserContentProps {
  age: number;
  disabilityType: "시각장애" | "청각장애" | "지적장애" | "지체장애" | "자폐성장애" | "뇌병변장애" | "정신장애" | "없음";
  email: string;
  gender: "남성" | "여성";
  id: number;
  name: string;
  nickname: string;
  reportedCount: number;
  checkId: number[];
  setCheckId: (checkId: number[]) => void;
}

export default function UserContent({
  age,
  disabilityType,
  email,
  gender,
  id,
  name,
  nickname,
  reportedCount,
  checkId,
  setCheckId,
}: UserContentProps) {
  const handleCheckBoxClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    if (!checkId.includes(id)) {
      setCheckId([...checkId, id]);
    } else {
      setCheckId(checkId.filter((checkId) => checkId !== id));
    }
  };

  return (
    <li>
      <div className={cn("container")}>
        <div className={cn("check")}>
          <input type="checkbox" checked={checkId.includes(id)} onClick={handleCheckBoxClick} />
        </div>
        <p className={cn("name")}>{name}</p>
        <p className={cn("nickname")}>{nickname}</p>
        <p className={cn("gender")}>{gender}</p>
        <p className={cn("age")}>{age}</p>
        <p className={cn("disabilityType")}>{disabilityType}</p>
        <p className={cn("email")}>{email}</p>
        <div className={cn("reportedCountBox")}>
          <p className={cn("reportedCount", { danger: reportedCount >= 3 })}>{reportedCount}</p>
        </div>
      </div>
    </li>
  );
}
