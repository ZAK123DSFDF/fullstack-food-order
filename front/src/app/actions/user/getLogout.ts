"use server";
import { cookies } from "next/headers";
export const getLogout = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
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
    throw new Error(errorData.message || "failed to logout");
  }
  const logoutData = await response.json();
  return logoutData;
};
