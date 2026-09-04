import type { Metadata } from "next";
import { defaultContent, getSiteContent } from "../site-content";

export const metadata: Metadata = {
  title: "感謝您的選購｜台北咖啡",
  description: "感謝您選購台北咖啡，我們將盡快為您服務。",
};

export const dynamic = "force-dynamic";

export default async function ThankYouPage() {
  const content = await getSiteContent().catch(() => defaultContent);

  return (
    <main className="thank-you-page">
      <section className="thank-you-card" aria-labelledby="thank-you-title">
        <div className="thank-you-mark" aria-hidden="true">✓</div>
        <p className="section-kicker">TAIPEI COFFEE</p>
        <h1 id="thank-you-title">感謝您的選購</h1>
        <p className="thank-you-lead">我們已收到您的選購意願，客服人員將盡快與您聯繫，為您確認商品與訂購細節。</p>
        <div className="thank-you-actions">
          <a className="btn btn-gold btn-lg" href="/">返回首頁</a>
          <a className="btn btn-coffee btn-lg" href={`tel:${content.phone.replace(/-/g, "")}`}>致電客服 {content.phone}</a>
        </div>
      </section>
    </main>
  );
}
