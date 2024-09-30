"use server";
import { cookies } from "next/headers";
export const createRestaurant = async (formData: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/restaurant/create`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: formData,
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "failed to create Restaurant");
  }
  const createdRestaurant = await response.json();
  return createdRestaurant;
};
