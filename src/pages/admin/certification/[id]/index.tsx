import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import CertificationDetailLayout from "@/components/page-layout/certificationDetailLayout/components/CertificationDetailLayout";

export default function CertificationDetail() {
  return <CertificationDetailLayout />;
}

CertificationDetail.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
