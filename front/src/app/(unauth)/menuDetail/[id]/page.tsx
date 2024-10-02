import { checkAuth } from "@/app/actions/user/checkAuth";
import MenuDetail from "@/app/components/MenuDetail";
import { redirect } from "next/navigation";

export default async function menuDetail() {
  const data: any = await checkAuth();
  if (data.role === "SERVANT" || data.role === "ADMIN") {
    redirect("/dashboard/orders");
  }
  return <MenuDetail data={data} />;
}
