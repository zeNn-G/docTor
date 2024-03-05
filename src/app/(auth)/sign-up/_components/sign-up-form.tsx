"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signUp } from "@/lib/actions";
import { toast } from "sonner";

export function SingUpForm() {
  const x = useFormStatus();

  console.log(x);
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
        <Button type="submit">Sign Up</Button>
      </form>
    </>
  );
}