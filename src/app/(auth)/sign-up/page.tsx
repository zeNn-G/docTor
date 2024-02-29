import { validateRequest } from "@/lib/validate-request";
import SingUpForm from "./_components/sign-up-form";
import { redirect } from "next/navigation";

const SignupPage = async () => {
  const { user } = await validateRequest();

  if (user) redirect("/");

  return <SingUpForm />;
};

export default SignupPage;
