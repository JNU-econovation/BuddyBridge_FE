import { ReactElement } from "react";

import RootLayout from "@/components/common/RootLayout/RootLayout";
import UserAdminLayout from "@/components/page-layout/userAdminLayout/components/userAdminLayout";

export default function User() {
  return <UserAdminLayout />;
}

User.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
