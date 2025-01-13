import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import HelpYouEditLayout from "@/components/page-layout/helpYouEditLayout/components/helpYouEditLayout";

HelpYouEdit.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default function HelpYouEdit() {
  return <HelpYouEditLayout />;
}
