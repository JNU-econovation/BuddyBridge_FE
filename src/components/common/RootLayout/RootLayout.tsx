import { ReactNode } from "react";

import classNames from "classnames/bind";

import Header from "@/components/common/Header/Header";
import styles from "@/components/common/RootLayout/RootLayout.module.scss";

import Footer from "../Footer/Footer";

const cn = classNames.bind(styles);

interface RootLayoutProps {
  children: ReactNode;
  isMainPage?: boolean;
}

export default function RootLayout({ children, isMainPage }: RootLayoutProps) {
  return (
    <div className={cn("container")}>
      <Header />
      <main className={cn("children")}>{children}</main>
      <Footer isMainPage={isMainPage} />
    </div>
  );
}
