import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import MyPageLikesLayout from "@/components/page-layout/myPageLikesLayout/components/myPageLikesLayout";

export default function MyPageLikes() {
  return <MyPageLikesLayout />;
}

MyPageLikes.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
