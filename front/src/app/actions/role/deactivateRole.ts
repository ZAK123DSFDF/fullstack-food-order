"use server";
import { cookies } from "next/headers";
export const deactivateRole = async (id: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/role/deactivate/${id}`,
    {
      method: "PATCH",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "failed to deactivate role");
  }
  const deactivatedData = await response.json();
  return deactivatedData;
};
