"use server";

import { cookies } from "next/headers";

export const getLogin = async ({ email, password }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "failed to check");
  }
  const userResData = await response.json();
  if (userResData) {
    cookies().set({
      name: "token",
      value: userResData.token,
      httpOnly: true,
    });
  }
  return userResData;
};
