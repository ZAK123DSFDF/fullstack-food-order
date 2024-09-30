"use server";
import { cookies } from "next/headers";
export const checkAuth = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/check`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "failed to check");
  }
  const authData = await response.json();
  return authData;
};
