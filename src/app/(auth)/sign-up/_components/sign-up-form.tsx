"use client";
import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signupSchema } from "@/validators";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { api } from "@/trpc/react";
import { useFormState } from "react-dom";
import { signUp } from "@/lib/actions";
import { Label } from "@/components/ui/label";

export default function SingUpForm() {
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
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
