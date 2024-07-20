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
      {MY_PAGE_NAV.map((nav) => (
        <div key={nav.title} className={cn("box")}>
          <p className={cn("title")}>{nav.title}</p>
          <div className={cn("contentBox")}>
            {nav.content.map((content) => (
              <Link
                href={content.href}
                className={cn("button", { pick: router.pathname === content.href })}
                key={content.name}
              >
                {content.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
