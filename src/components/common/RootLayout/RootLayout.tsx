import { ReactNode } from "react";

import styles from "@/components/RootLayout/RootLayout.module.scss";
import classNames from "classnames/bind";

import Header from "@/components/common/Header/Header";

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
