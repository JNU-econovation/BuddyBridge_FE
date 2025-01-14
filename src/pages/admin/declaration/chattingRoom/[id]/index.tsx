import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import ChattingRoomDeclarationDetailLayout from "@/components/page-layout/chattingRoomDeclarationDetailLayout/components/chattingRoomDeclarationDetailLayout";

export default function ChattingRoomDeclarationDetail() {
  return <ChattingRoomDeclarationDetailLayout />;
}

ChattingRoomDeclarationDetail.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
