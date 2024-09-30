"use server";
import { cookies } from "next/headers";
export const addAdmin = async (userData: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/restaurant/addAdmin`,
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
    throw new Error(errorData.message || "failed to admin");
  }
  const addAdmin = await response.json();
  return addAdmin;
};
