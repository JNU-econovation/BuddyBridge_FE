import styles from "@/components/common/Header/User/User.module.scss";
import classNames from "classnames/bind";

import { ROUTE } from "@/constants/route";

import Link from "next/link";

const cn = classNames.bind(styles);

export default function User() {
  return (
    <Link className={cn("login")} href={ROUTE.LOGIN}>
      로그인
    </Link>
  );
}
