import { checkAuth } from "@/app/actions/user/checkAuth";
import OrderHistory from "@/app/components/OrderHistory";
import { redirect } from "next/navigation";

export default async function orderHistory() {
  const data = await checkAuth();
  if (data.role === "SERVANT" || data.role === "ADMIN") {
    redirect("/dashboard/orders");
  }
  return <OrderHistory />;
}
