import classNames from "classnames/bind";

import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/components/page-layout/myPageLayout/components/MyPageNav/MyPageNav.module.scss";

import { MY_PAGE_NAV } from "../../constants";

const cn = classNames.bind(styles);

export default function MyPageNav() {
  const router = useRouter();

  return (
    <div className={cn("container")}>
      {MY_PAGE_NAV.map(({ title, content }) => (
        <div key={title} className={cn("box")}>
          <p className={cn("title")}>{title}</p>
          <div className={cn("contentBox")}>
            {content.map(({ href, name }) => (
              <Link href={href} className={cn("button", { pick: router.pathname === href })} key={name}>
                {name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
