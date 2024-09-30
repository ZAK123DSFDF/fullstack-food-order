"use server";
import { cookies } from "next/headers";
export const getAllRoles = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/role/restaurant`,
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
  const allRoles = await response.json();
  return allRoles;
};
