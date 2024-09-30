"use server";
import { cookies } from "next/headers";
export const deactivateServant = async (id: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/delete/${id}`,
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
    throw new Error(errorData.message || "failed to delete");
  }
  const deleteData = await response.json();
  return deleteData;
};
