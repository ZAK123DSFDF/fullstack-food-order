import { checkAuth } from "./actions/user/checkAuth";
import Home from "./components/Home";

export default async function page() {
  const data: any = await checkAuth();
  console.log("this is the user", data.isAuthenticated);
  return (
    <>
      <Home data={data} />
    </>
  );
}
