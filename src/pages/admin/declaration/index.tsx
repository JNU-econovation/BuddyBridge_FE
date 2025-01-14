import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import DeclarationLayout from "@/components/page-layout/declarationLayout/components/declarationLayout";

export default function Declaration() {
  return <DeclarationLayout />;
}

Declaration.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
