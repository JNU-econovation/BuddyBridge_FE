import { ReactNode } from "react";

import classNames from "classnames/bind";

import Header from "@/components/common/Header/Header";
import styles from "@/components/common/RootLayout/RootLayout.module.scss";

const cn = classNames.bind(styles);

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className={cn("container")}>
      <Header />
      <main className={cn("children")}>{children}</main>
    </div>
  );
}
