"use server";
import { cookies } from "next/headers";
export const getSingleRole = async (id: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/role/restaurant/role/${id}`,
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
    throw new Error(errorData.message || "failed to get role");
  }
  const singleRole = await response.json();
  return singleRole;
};
