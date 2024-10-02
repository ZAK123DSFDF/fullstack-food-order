import { checkAuth } from "@/app/actions/user/checkAuth";
import AddMenu from "@/app/components/AddMenu";
import { redirect } from "next/navigation";

export default async function addMenu() {
  const data: any = await checkAuth();
  if (!data.isAuthenticated) {
    redirect("/login");
  } else if (data.role === "CUSTOMER") {
    redirect("/");
  }
  return <AddMenu />;
}
