import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import CommentDeclarationDetailLayout from "@/components/page-layout/commentDeclarationDetailLayout/components/commentDeclarationDetailLayout";

export default function commentDeclarationDetail() {
  return <CommentDeclarationDetailLayout />;
}

commentDeclarationDetail.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
