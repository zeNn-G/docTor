import React from "react";
import { redirect } from "next/navigation";

import { validateRequest } from "@/lib/validate-request";
import { SingUpForm } from "./_components/sign-up-form";

const CreateUserPage = async () => {
  const { user } = await validateRequest();

  if (!user?.isAdmin) redirect("/");

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <SingUpForm />
    </div>
  );
};

export default CreateUserPage;
