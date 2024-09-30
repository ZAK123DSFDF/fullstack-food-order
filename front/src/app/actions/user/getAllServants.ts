"use server";
import { cookies } from "next/headers";
export const getAllServants = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/all`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "failed to get servants data");
  }
  const servantData = await response.json();
  return servantData;
};
