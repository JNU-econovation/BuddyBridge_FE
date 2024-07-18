import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import ChatLayout from "@/components/page-layout/chatLayout/components/chatLayout";

export default function Chat() {
  return <ChatLayout />;
}

Chat.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
