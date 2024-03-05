import { redirect } from "next/navigation";

import { validateRequest } from "@/lib/validate-request";
import SingUpForm from "./_components/sign-up-form";

const SignupPage = async () => {
  const { user } = await validateRequest();

  if (user) redirect("/");

  return <SingUpForm />;
};

export default SignupPage;
