import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import HelpYouRegisterLayout from "@/components/page-layout/helpYouRegisterLayout/components/helpYouRegisterLayout";

HelpMeRegister.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default function HelpMeRegister() {
  return <HelpYouRegisterLayout />;
}
