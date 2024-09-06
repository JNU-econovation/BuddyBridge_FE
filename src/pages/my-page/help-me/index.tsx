import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import MyPageHelpMeLayout from "@/components/page-layout/myPageHelpMeLayout/components/myPageHelpMeLayout";

export default function MyPageHelpMe() {
  return <MyPageHelpMeLayout />;
}

MyPageHelpMe.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
