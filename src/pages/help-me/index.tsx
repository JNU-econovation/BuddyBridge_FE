import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import HelpMeLayout from "@/components/page-layout/helpMeLayout/components/helpMeLayout";

export default function HelpMe() {
  return <HelpMeLayout />;
}

HelpMe.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
