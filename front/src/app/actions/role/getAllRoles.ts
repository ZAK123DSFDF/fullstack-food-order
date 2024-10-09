"use server";
import { cookies } from "next/headers";
export const getAllRoles = async (
  globalSearch: string,
  name: string,
  createdAt: string,
  active: string,
  sortBy: string,
  sortOrder: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/role/restaurant?globalSearch=${
      globalSearch ? globalSearch : ""
    }&name=${name ? name : ""}&createdAt=${createdAt ? createdAt : ""}&active=${
      active ? active : ""
    }&sortBy=${sortBy ? sortBy : ""}&sortOrder=${sortOrder ? sortOrder : ""}`,
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
