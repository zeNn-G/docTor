import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import React from "react";
import { SingInForm } from "./_components/sign-in-form";

const SignInPage = async () => {
  const { user } = await validateRequest();

  if (user) redirect("/");

  return <SingInForm />;
};

export default SignInPage;
