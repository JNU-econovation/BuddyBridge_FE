import classNames from "classnames/bind";

import Link from "next/link";

import styles from "@/components/common/Header/Header.module.scss";
import User from "@/components/common/Header/User/User";
import { ROUTE } from "@/constants/route";
import BuddyBridge from "@/icons/buddy_bridge.svg";
import Logo from "@/images/logo.svg";

const cn = classNames.bind(styles);

export default function Header() {
  return (
    <>
      <header className={cn("header")}>
        <Link href={ROUTE.HOME} className={cn("logoContainer")}>
          <Logo width={91} height={46} />
          <BuddyBridge width={230} height={52} />
        </Link>
        <nav className={cn("nav")}>
          <Link href="/" className={cn("navContent")}>
            도와줄래요?
          </Link>
          <Link href="/" className={cn("navContent")}>
            도와줄게요!
          </Link>
          <Link href="/" className={cn("navContent")}>
            내가 쓴 글
          </Link>
        </nav>
        <User />
      </header>
    </>
  );
}
