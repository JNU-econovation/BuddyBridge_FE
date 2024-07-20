import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import MyPageLayout from "@/components/page-layout/myPageLayout/components/myPageLayout";

export default function MyPage() {
  return <MyPageLayout />;
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
