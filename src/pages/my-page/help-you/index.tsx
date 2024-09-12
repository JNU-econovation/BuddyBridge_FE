import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import MyPageHelpYouLayout from "@/components/page-layout/myPageHelpYouLayout/components/myPageHelpYouLayout";

export default function MyPageHelpYou() {
  return <MyPageHelpYouLayout />;
}

MyPageHelpYou.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
