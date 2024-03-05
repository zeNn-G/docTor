"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signIn } from "@/lib/actions";

export function SingInForm() {
  const [state, formAction] = useFormState(signIn, null);

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
        {state?.formError ? (
          <p className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-red-500">
            {state?.formError}
          </p>
        ) : null}
        <Button type="submit">Sign In</Button>
      </form>
    </>
  );
}
