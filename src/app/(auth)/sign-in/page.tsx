import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import React from "react";
import { SingInForm } from "./_components/sign-in-form";

const SignInPage = async () => {
  const { user } = await validateRequest();

  if (user) redirect("/");

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="text-3xl font-bold">Sign In</h1>
      <SingInForm />
    </div>
  );
};

export default SignInPage;
