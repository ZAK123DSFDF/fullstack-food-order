import { checkAuth } from "@/app/actions/user/checkAuth";
import Roles from "@/app/components/Roles";
import { redirect } from "next/navigation";

export default async function roles() {
  const data = await checkAuth();
  if (!data.isAuthenticated) {
    redirect("/login");
  } else if (data.role === "CUSTOMER") {
    redirect("/");
  }
  return <Roles />;
}
