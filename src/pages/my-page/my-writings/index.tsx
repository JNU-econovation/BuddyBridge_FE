import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import MyPageMyContentLayout from "@/components/page-layout/myPageMyContentLayout/components/myPageMyContentLayout";

export default function MyPageHelpMe() {
  return <MyPageMyContentLayout />;
}

MyPageHelpMe.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};