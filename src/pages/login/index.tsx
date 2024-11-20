import { ReactElement } from "react";

import SignLayout from "@/components/common/SignLayout/SignLayout";
import LoginLayout from "@/components/page-layout/loginLayout/components/loginLayout";

export default function Login() {
  return <LoginLayout />;
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <SignLayout>{page}</SignLayout>;
};
