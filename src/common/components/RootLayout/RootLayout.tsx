import { ReactNode } from "react";
// import Gnb from "@/common/components/Gnb/GlobalNavigationBar";
// import Footer from "@/common/components/Footer/Footer";
import styles from "@/common/components/RootLayout/RootLayout.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

interface RootLayoutProps {
  children: ReactNode;
  needFooter?: boolean;
}

export default function RootLayout({ children, needFooter = true }: RootLayoutProps) {
  return (
    <div className={cn("container")}>
      {/* <Gnb /> */}
      <main className={cn("children")}>{children}</main>
      {/* {needFooter && <Footer />} */}
    </div>
  );
}
