import { ReactNode } from "react";

import classNames from "classnames/bind";

import styles from "@/components/common/SignLayout/SignLayout.module.scss";
import LoginImg from "@/images/loginImg.svg";

const cn = classNames.bind(styles);

interface RootLayoutProps {
  children: ReactNode;
}

export default function SignLayout({ children }: RootLayoutProps) {
  return (
    <main className={cn("main")}>
      <div className={cn("container")}>
        <div className={cn("logoBox")}>
          <p className={cn("logoContent")}>
            안녕하세요,
            <br />
            누구나 온기를 전하도록 이어주는
            <br />
            버디브릿지입니다.
          </p>
          <LoginImg width={400} height={400} />
        </div>
        {children}
      </div>
    </main>
  );
}
