import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import HelpYouLayout from "@/components/page-layout/helpYouLayout/components/helpYouLayout";

export default function HelpYou() {
  return <HelpYouLayout />;
}

HelpYou.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
