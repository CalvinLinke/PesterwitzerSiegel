import MenuEditor from "@/components/admin/MenuEditor";
import { getMenu, isBlobConfigured } from "@/lib/menu/store";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const menu = await getMenu();
  return <MenuEditor initial={menu} blobConfigured={isBlobConfigured()} />;
}
