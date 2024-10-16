import classNames from "classnames/bind";

import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/components/common/Header/Header.module.scss";
import User from "@/components/common/Header/User/User";
import { ROUTE } from "@/constants/route";
import Logo from "@/images/logo.svg";

const cn = classNames.bind(styles);

export default function Header() {
  const router = useRouter();
  const pathname = router.pathname;
  const helpMe = pathname.split("/")[1] === "help-me" && "helpMe";
  const helpYou = pathname.split("/")[1] === "help-you" && "helpYou";
  const myWrite = pathname.split("/")[1] === "feedback" && "feedback";

  return (
    <>
      <div className={cn("container")}>
        <header className={cn("header")}>
          <Link href={ROUTE.HOME} className={cn("logoContainer")}>
            <Logo />
          </Link>
          <nav className={cn("nav")}>
            <Link href={ROUTE.HELP_ME} className={cn("navContent", helpMe)}>
              도와줄래요?
            </Link>
            <Link href={ROUTE.HELP_YOU} className={cn("navContent", helpYou)}>
              도와줄게요!
            </Link>
            <Link href={ROUTE.FEEDBACK} className={cn("navContent", myWrite)}>
              피드백
            </Link>
          </nav>
          <User />
        </header>
      </div>
    </>
  );
}
