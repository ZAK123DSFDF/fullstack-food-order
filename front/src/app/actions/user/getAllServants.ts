"use server";
import { cookies } from "next/headers";
export const getAllServants = async (
  globalSearch: any,
  name: any,
  phoneNumber: any,
  email: any,
  location: any,
  active: any,
  sortBy: any,
  sortOrder: any
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/all?globalSearch=${
      globalSearch ? globalSearch : ""
    }&name=${name ? name : ""}&phoneNumber=${
      phoneNumber ? phoneNumber : ""
    }&email=${email ? email : ""}&location=${location ? location : ""}&active=${
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
    throw new Error(errorData.message || "failed to get servants data");
  }
  const servantData = await response.json();
  return servantData;
};
