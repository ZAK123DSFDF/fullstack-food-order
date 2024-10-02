import { checkAuth } from "@/app/actions/user/checkAuth";
import AddRestaurant from "@/app/components/AddRestaurant";
import { redirect } from "next/navigation";

export default async function addRestaurant() {
  const data = await checkAuth();
  if (!data.isAuthenticated) {
    redirect("/login");
  }
  return (
    <>
      <AddRestaurant />
    </>
  );
}
