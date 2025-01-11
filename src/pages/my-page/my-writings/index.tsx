import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
//import MyPageMyContnetLayout from "@/components/page-layout/myPageHelpMeLayout/components/myPageHelpMeLayout";
import MyPageMyContentLayout from "@/components/page-layout/myPageMyContentLayout/components/myPageMyContent";

export default function MyPageHelpMe() {
  return <MyPageMyContentLayout />;
}

MyPageHelpMe.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};