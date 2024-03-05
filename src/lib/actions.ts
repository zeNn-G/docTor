"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Scrypt } from "lucia";
import { lucia } from "@/lib/auth";
import { db } from "@/server/db";

import {
  type SignupInput,
  signupSchema,
  type SigninInput,
  singinSchema,
} from "@/validators";
import { users } from "@/server/db/schema";

import { validateRequest } from "./validate-request";

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
}

export async function signUp(
  _: any,
  formData: FormData,
): Promise<ActionResponse<SignupInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = signupSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        username: err.fieldErrors.username?.[0],
        password: err.fieldErrors.password?.[0],
      },
    };
  }

  const { username, password } = parsed.data;

  const existingUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.username, username),
    columns: { username: true },
  });

  if (existingUser) {
    return {
      formError: "Cannot create account with that email",
    };
  }

  const hashedPassword = await new Scrypt().hash(password);

  const insertedUser = await db
    .insert(users)
    .values({
      username,
      hashedPassword,
    })
    .returning({
      userId: users.id,
    });

  if (!insertedUser[0]) {
    return {
      formError: "Failed to create user",
    };
  }

  const session = await lucia.createSession(insertedUser[0].userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/");
}

export async function signIn(
  _: any,
  formData: FormData,
): Promise<ActionResponse<SigninInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = singinSchema.safeParse(obj);

  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        username: err.fieldErrors.username?.[0],
        password: err.fieldErrors.password?.[0],
      },
    };
  }

  const { username, password } = parsed.data;

  const existingUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.username, username),
  });

  if (!existingUser) {
    return {
      formError: "Incorrect email or password",
    };
  }

  if (!existingUser || !existingUser?.hashedPassword) {
    return {
      formError: "Incorrect email or password",
    };
  }

  const validPassword = await new Scrypt().verify(
    existingUser.hashedPassword,
    password,
  );
  if (!validPassword) {
    return {
      formError: "Incorrect email or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/");
}

export async function logout(): Promise<{ error: string } | void> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "No session found",
    };
  }
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}
