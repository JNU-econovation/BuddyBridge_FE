import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import HelpMeRegisterLayout from "@/components/page-layout/helpMeRegisterLayout/components/helpMeRegisterLayout";

HelpMeRegister.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default function HelpMeRegister() {
  return <HelpMeRegisterLayout />;
}
