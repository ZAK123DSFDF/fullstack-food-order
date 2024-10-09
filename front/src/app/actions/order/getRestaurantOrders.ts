"use server";
import { cookies } from "next/headers";
export const getRestaurantOrders = async (
  globalSearch: string,
  orderStatus: string,
  menuName: string,
  count: string,
  price: string,
  createdAt: string,
  customerName: string,
  customerEmail: string,
  customerPhoneNumber: string,
  customerLocation: string,
  sortBy: string,
  sortOrder: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/order/restaurant?globalSearch=${
      globalSearch ? globalSearch : ""
    }&orderStatus=${orderStatus ? orderStatus : ""}&menuName=${
      menuName ? menuName : ""
    }&count=${count ? +count : ""}&price=${price ? +price : ""}&createdAt=${
      createdAt ? createdAt : ""
    }&customerName=${customerName ? customerName : ""}&customerEmail=${
      customerEmail ? customerEmail : ""
    }&customerPhoneNumber=${
      customerPhoneNumber ? customerPhoneNumber : ""
    }&customerLocation=${customerLocation ? customerLocation : ""}&sortBy=${
      sortBy ? sortBy : ""
    }&sortOrder=${sortOrder ? sortOrder : ""}`,
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
