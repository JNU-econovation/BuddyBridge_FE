import { ReactElement } from "react";

import SignLayout from "@/components/common/SignLayout/SignLayout";
import AdminLoginLayout from "@/components/page-layout/adminLoginLayout/components/adminLoginLayout";

export default function AdminLogin() {
  return <AdminLoginLayout />;
}

AdminLogin.getLayout = function getLayout(page: ReactElement) {
  return <SignLayout>{page}</SignLayout>;
};
