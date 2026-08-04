import { env } from "cloudflare:workers";

export type SiteContent = {
  heroTitle: string;
  heroSubtitle: string;
  storyTitle: string;
  storyText: string;
  phone: string;
  email: string;
  products: { name: string; description: string }[];
  reviews: { name: string; text: string }[];
};

export const defaultContent: SiteContent = {
  heroTitle: "台北咖啡｜一杯咖啡，讓生活慢一點，也更美好。",
  heroSubtitle: "讓每一口咖啡，成為生活最美好的開始。",
  storyTitle: "品牌溫暖故事",
  storyText: "我們相信，再忙碌的生活，都值得留下一段屬於自己的咖啡時光。精品咖啡不只是少數人的享受，而是每位努力生活的人，都能輕鬆擁有的日常儀式。",
  phone: "02-2508-1234",
  email: "service@taipeicoffee.com",
  products: [
    { name: "經典精品濾掛咖啡組", description: "早晨提神、午後療癒，送禮自用兩相宜。四款風味，一次收藏。" },
    { name: "嚴選世界精品咖啡豆", description: "專業烘焙曲線，保留咖啡最純粹的香氣與層次，提供手沖與研磨服務。" },
  ],
  reviews: [
    { name: "林先生／科技業工程師", text: "每天上班前沖一杯台北咖啡，香氣很舒服，喝完不會心悸，專注力也提升很多！" },
    { name: "陳太太／全職媽媽", text: "身為全職媽媽，能有這樣安心的咖啡，真的很棒！加入豆奶後口感溫潤。" },
    { name: "許小姐／行銷專員", text: "喝過很多濾掛，台北咖啡的香氣與層次真的很細緻，送禮也很有質感！" },
  ],
};

const createSql = `CREATE TABLE IF NOT EXISTS site_content (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  content TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT
)`;

export async function ensureContentTable() {
  if (!env.DB) throw new Error("DB unavailable");
  await env.DB.prepare(createSql).run();
}

export async function getSiteContent(): Promise<SiteContent> {
  await ensureContentTable();
  const row = await env.DB.prepare("SELECT content FROM site_content WHERE id = 1").first<{content: string}>();
  return row ? JSON.parse(row.content) : defaultContent;
}

export async function saveSiteContent(content: SiteContent, email: string) {
  await ensureContentTable();
  await env.DB.prepare("INSERT INTO site_content (id, content, updated_at, updated_by) VALUES (1, ?, CURRENT_TIMESTAMP, ?) ON CONFLICT(id) DO UPDATE SET content = excluded.content, updated_at = CURRENT_TIMESTAMP, updated_by = excluded.updated_by").bind(JSON.stringify(content), email).run();
}
