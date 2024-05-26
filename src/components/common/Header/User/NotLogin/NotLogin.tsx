import Link from "next/link";

import styles from "@/components/common/Header/User/NotLogin/NotLogin.module.scss";
import classNames from "classnames/bind";

import { ROUTE } from "@/constants/route";

const cn = classNames.bind(styles);

export default function NotLogin() {
  return (
    <Link className={cn("login")} href={ROUTE.LOGIN}>
      로그인
    </Link>
  );
}
