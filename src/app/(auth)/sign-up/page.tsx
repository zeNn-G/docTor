import { redirect } from "next/navigation";

import { validateRequest } from "@/lib/validate-request";
import { SingUpForm } from "./_components/sign-up-form";

const SignupPage = async () => {
  const { user } = await validateRequest();

  if (user) redirect("/");

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <SingUpForm />
    </div>
  );
};

export default SignupPage;
