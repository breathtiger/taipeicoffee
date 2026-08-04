import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "台北咖啡｜一杯咖啡，讓生活慢一點",
  description: "嚴選阿拉比卡精品咖啡豆、濾掛咖啡與新鮮烘焙，陪你留住生活裡的美好時光。",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" /></head><body>{children}</body></html>;
}
