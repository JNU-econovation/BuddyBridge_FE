import classNames from "classnames/bind";

import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/components/common/AdminNav/AdminNav.module.scss";
import { ROUTE } from "@/constants/route";

const cn = classNames.bind(styles);

export default function AdminNav() {
  const router = useRouter();

  const path = router.pathname.split("/");

  return (
    <nav className={cn("container")}>
      <p className={cn("title")}>관리자</p>
      <Link href={ROUTE.ADMIN_DECLARATION} className={cn("declaration", { active: path.includes("declaration") })}>
        신고 관리
      </Link>
      <Link href={ROUTE.ADMIN_USER} className={cn("user", { active: path.includes("user") })}>
        사용자 관리
      </Link>
      <Link
        href={ROUTE.ADMIN_CERTIFICATION}
        className={cn("certification", { active: path.includes("certification") })}
      >
        봉사 인증 관리
      </Link>
    </nav>
  );
}
