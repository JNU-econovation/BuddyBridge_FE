import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import MyPageEditLayout from "@/components/page-layout/myPageEditLayout/components/myPageEditLayout";

export default function MyPageEdit() {
  return <MyPageEditLayout />;
}

MyPageEdit.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout isMyPage={true}>{page}</RootLayout>;
};
