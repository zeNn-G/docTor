"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { signUp } from "@/lib/actions";
import { SubmitButton } from "@/components/submit-button";

export function SingUpForm() {
  const [state, formAction] = useFormState(signUp, null);

  return (
    <>
      <form action={formAction} className="mt-5 w-full max-w-xl space-y-8">
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
        <SubmitButton className="w-full"> Sign Up</SubmitButton>
      </form>
    </>
  );
}
