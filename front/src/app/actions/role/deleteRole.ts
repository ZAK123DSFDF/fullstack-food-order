"use server";
import { cookies } from "next/headers";
export const deleteRole = async (id: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/role/delete/${id}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "failed to delete role");
  }
  const deletedRole = await response.json();
  return deletedRole;
};
