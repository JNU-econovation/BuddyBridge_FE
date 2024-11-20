import { ReactElement } from "react";

import SignLayout from "@/components/common/SignLayout/SignLayout";
import SignUpLayout from "@/components/page-layout/signUpLayout/components/signUpLayout";

export default function SignUp() {
  return <SignUpLayout />;
}

SignUp.getLayout = function getLayout(page: ReactElement) {
  return <SignLayout>{page}</SignLayout>;
};
