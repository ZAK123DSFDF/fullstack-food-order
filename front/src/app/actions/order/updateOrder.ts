"use server";
import { cookies } from "next/headers";
export const updateOrder = async (id: any, newStatus: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/order/status/${id}`,
    {
      method: "PATCH",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify(newStatus),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "failed to update status");
  }
  const updatedOrder = await response.json();
  return updatedOrder;
};
