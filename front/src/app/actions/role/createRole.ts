"use server";
import { cookies } from "next/headers";
export const createRole = async (roleData: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/role/create`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify(roleData),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "failed to create new role");
  }
  const roleResData = await response.json();
  return roleResData;
};
