"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { signUp } from "@/lib/actions";
import { SubmitButton } from "@/components/submit-button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export function SingUpForm() {
  const [state] = useFormState(signUp, null);

  return (
    <>
      <form
        action={async (formData: FormData) => {
          const result = await signUp("", formData);

          if (result.success) {
            toast.success(`Created account for ${formData.get("username")}`);
          }
        }}
        className="mt-5 w-full max-w-xl space-y-8"
      >
        <div className="space-y-2">
          <Label>Username</Label>
          <Input
            required
            placeholder="user_1234"
            name="username"
            type="text"
            autoComplete="off"
          />
          {state?.fieldError?.username ? (
            <p className="text-destructive">{state?.fieldError?.username}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            required
            placeholder="Recep"
            name="name"
            type="text"
            autoComplete="off"
          />
          {state?.fieldError?.name ? (
            <p className="text-destructive">{state?.fieldError?.username}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label>Surname</Label>
          <Input
            required
            placeholder="Ivedik"
            name="surname"
            type="text"
            autoComplete="off"
          />
          {state?.fieldError?.surname ? (
            <p className="text-destructive">{state?.fieldError?.username}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input
            placeholder="********"
            type="password"
            name="password"
            autoComplete="off"
          />
          {state?.fieldError?.password ? (
            <p className="text-destructive">{state?.fieldError?.password}</p>
          ) : null}
        </div>
        <div className="flex flex-col space-y-2">
          <Label>Admin Privileges</Label>
          <Checkbox name="isAdmin" />
        </div>
        <SubmitButton className="w-full"> Sign Up</SubmitButton>
      </form>
    </>
  );
}
