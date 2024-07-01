import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import HelpYouDetailLayout from "@/components/page-layout/helpYouDetailLayout/components/helpYouDetailLayout";

export default function HelpYouDetail() {
  return <HelpYouDetailLayout />;
}

HelpYouDetail.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
