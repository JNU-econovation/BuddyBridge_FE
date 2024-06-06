import RootLayout from "@/components/common/RootLayout/RootLayout";
import HelpMeRegisterLayout from "@/components/page-layout/helpMeRegisterLayout/components/helpMeRegisterLayout";
import { ReactElement } from "react";

HelpMeRegister.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default function HelpMeRegister() {
  return <HelpMeRegisterLayout />;
}
