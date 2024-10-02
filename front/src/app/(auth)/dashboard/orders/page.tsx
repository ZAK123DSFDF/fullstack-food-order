import { checkAuth } from "@/app/actions/user/checkAuth";
import Orders from "@/app/components/Orders";
import { redirect } from "next/navigation";

export default async function orders() {
  const data: any = await checkAuth();
  if (!data.isAuthenticated) {
    redirect("/login");
  } else if (data.role === "CUSTOMER") {
    redirect("/");
  }
  return <Orders />;
}
