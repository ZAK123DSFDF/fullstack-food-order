import { checkAuth } from "@/app/actions/user/checkAuth";
import AddAdmin from "@/app/components/AddAdmin";
import { redirect } from "next/navigation";

export default async function addAdmin() {
  const data = await checkAuth();
  if (!data.isAuthenticated) {
    redirect("/login");
  } else if (data.role === "SERVANT") {
    redirect("/dashboard/orders");
  } else if (data.role === "CUSTOMER") {
    redirect("/");
  }
  return (
    <>
      <AddAdmin />
    </>
  );
}
