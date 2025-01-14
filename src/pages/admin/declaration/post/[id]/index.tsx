import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import PostDeclarationDetailLayout from "@/components/page-layout/postDeclarationDetailLayout/components/postDeclarationDetailLayout";

export default function postDeclarationDetail() {
  return <PostDeclarationDetailLayout />;
}

postDeclarationDetail.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
