import classNames from "classnames/bind";

import Link from "next/link";

import styles from "@/components/common/MyPageMenu/MyPageMenu.module.scss";
import { MY_PAGE_NAV } from "@/components/page-layout/myPageLayout/constants";

const cn = classNames.bind(styles);

export default function MyPageMenu() {
  const a = MY_PAGE_NAV;
  return (
    <div className={cn("container")}>
      <p className={cn("title")}>마이</p>
      <div className={cn("navBox")}>
        {MY_PAGE_NAV.map(({ name, href }) => (
          <Label content={name} href={href} key={name} />
        ))}
      </div>
    </div>
  );
}

interface LabelProps {
  content: string;
  href: string;
}

function Label({ content, href }: LabelProps) {
  return (
    <Link href={href} className={cn("labelContainer")}>
      {content}
    </Link>
  );
}
