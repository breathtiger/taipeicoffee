import { getChatGPTUser } from "../../chatgpt-auth";
import { defaultContent, getSiteContent, saveSiteContent, type SiteContent } from "../../site-content";

function isAdmin(email: string) {
  const allowed = process.env.ADMIN_EMAIL?.toLowerCase();
  return Boolean(allowed) && allowed === email.toLowerCase();
}

export async function GET() {
  const user = await getChatGPTUser();
  if (!user || !isAdmin(user.email)) return Response.json({error:'Unauthorized'}, {status:401});
  return Response.json(await getSiteContent().catch(() => defaultContent));
}

export async function PUT(request: Request) {
  const user = await getChatGPTUser();
  if (!user || !isAdmin(user.email)) return Response.json({error:'Unauthorized'}, {status:401});
  const body = await request.json() as SiteContent;
  if (!body.heroTitle || !body.storyText || !Array.isArray(body.products) || !Array.isArray(body.reviews)) return Response.json({error:'Invalid content'}, {status:400});
  await saveSiteContent(body, user.email);
  return Response.json({ok:true});
}
