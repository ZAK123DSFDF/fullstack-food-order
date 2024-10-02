"use server";
import { cookies } from "next/headers";
export const createMenu = async (formData: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/menu/create`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        Cookie: cookies().toString(),
      },
      body: formData,
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "failed to create menu");
  }
  const bookData = await response.json();
  return bookData;
};
