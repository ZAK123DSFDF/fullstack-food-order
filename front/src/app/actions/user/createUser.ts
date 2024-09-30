"use server";
import { cookies } from "next/headers";
export const createUser = async (userData: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/create`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify(userData),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "failed to check");
  }
  const userResData = await response.json();
  return userResData;
};
