"use server";
import { cookies } from "next/headers";
export const createOrder = async (orderData: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/order/create`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify(orderData),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "failed to create order");
  }
  const createdOrder = await response.json();
  return createdOrder;
};
