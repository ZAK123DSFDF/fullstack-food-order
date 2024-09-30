"use server";
import { cookies } from "next/headers";
export const updateRole = async (roleData: any, id: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/role/update/${id}`,
    {
      method: "PATCH",
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
    throw new Error(errorData.message || "failed to update role");
  }
  const updatedRole = await response.json();
  return updatedRole;
};
