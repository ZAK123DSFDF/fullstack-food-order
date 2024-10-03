"use server";
import { cookies } from "next/headers";
export const getRestaurantOrders = async (
  globalSearch: any,
  orderStatus: any,
  menuName: any,
  count: any,
  price: any,
  customerName: any,
  customerEmail: any,
  customerPhoneNumber: any,
  customerLocation: any
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/order/restaurant`,
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
    throw new Error(errorData.message || "failed to get orders");
  }
  const restaurantOrders = await response.json();
  return restaurantOrders;
};
