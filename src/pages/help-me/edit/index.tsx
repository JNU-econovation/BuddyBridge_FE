import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import HelpMeEditLayout from "@/components/page-layout/helpMeEditLayout/components/helpMeEdit";

HelpMeEdit.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default function HelpMeEdit() {
  return <HelpMeEditLayout />;
}
