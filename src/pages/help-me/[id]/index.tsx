import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import HelpMeDetailLayout from "@/components/page-layout/helpMeDetailLayout/components/helpMeDetailLayout";

export default function HelpMeDetail() {
  return <HelpMeDetailLayout />;
}

HelpMeDetail.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
