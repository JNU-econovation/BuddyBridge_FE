import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import CertificationLayout from "@/components/page-layout/certificationLayout/components/certificationLayout";

export default function Certification() {
  return <CertificationLayout />;
}

Certification.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
