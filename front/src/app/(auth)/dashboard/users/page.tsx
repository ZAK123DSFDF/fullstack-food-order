import { checkAuth } from "@/app/actions/user/checkAuth";
import Users from "@/app/components/Users";
import { redirect } from "next/navigation";

export default async function users() {
  const data = await checkAuth();
  if (!data.isAuthenticated) {
    redirect("/login");
  } else if (data.role === "CUSTOMER") {
    redirect("/");
  }
  return <Users />;
}
