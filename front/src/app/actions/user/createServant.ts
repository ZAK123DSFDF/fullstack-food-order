"use server";
import { cookies } from "next/headers";
export const createServant = async ({
  name,
  email,
  password,
  phoneNumber,
  location,
  servantRoleId,
}: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/createServant`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phoneNumber,
        location,
        servantRoleId,
      }),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "failed to check");
  }
  const servantResData = await response.json();
  return servantResData;
};
