import { redirect } from "next/navigation";
import { checkAuth } from "./actions/user/checkAuth";
import Home from "./components/Home";

export default async function page() {
  const data: any = await checkAuth();
  if (data.role === "SERVANT" || data.role === "ADMIN") {
    redirect("/dashboard/orders");
  }
  return (
    <>
      <Home data={data} />
    </>
  );
}
