import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import MyPageFinishedLayout from "@/components/page-layout/myPageFinishedLayout/components/myPageFinishedLayout";

export default function MyPageEdit() {
  return <MyPageFinishedLayout />;
}

MyPageEdit.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};