"use server";
import { cookies } from "next/headers";
export const getAllActiveRoles = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/role/restaurant/active`,
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
    throw new Error(errorData.message || "failed to get roles");
  }
  const allActiveRoles = await response.json();
  return allActiveRoles;
};
