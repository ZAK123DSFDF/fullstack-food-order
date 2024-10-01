import { checkAuth } from "@/app/actions/user/checkAuth";
import MenuDetail from "@/app/components/MenuDetail";

export default async function menuDetail() {
  const data: any = await checkAuth();
  return <MenuDetail data={data} />;
}
