import { requireChatGPTUser } from "../chatgpt-auth";
import AdminEditor from "./AdminEditor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");
  return <AdminEditor email={user.email} />;
}
