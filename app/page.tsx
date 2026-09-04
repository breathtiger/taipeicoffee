import { defaultContent, getSiteContent } from "./site-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent().catch(() => defaultContent);

  return (
    <main>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top site-nav" aria-label="主要導覽">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2" href="#home">
            <span className="brand-mark">♜</span>
            <span><strong>台北咖啡</strong><small>TAIPEI COFFEE</small></span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="切換導覽"><span className="navbar-toggler-icon" /></button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
              <li className="nav-item"><a className="nav-link" href="#home">首頁</a></li>
              <li className="nav-item"><a className="nav-link" href="#story">關於我們</a></li>
              <li className="nav-item"><a className="nav-link" href="#products">產品介紹</a></li>
              <li className="nav-item"><a className="nav-link" href="#health">健康與匠心</a></li>
              <li className="nav-item"><a className="nav-link" href="#reviews">顧客好評</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">聯絡我們</a></li>
              <li className="nav-item"><a className="nav-link nav-icon" href="/admin" aria-label="登入後台">♙</a></li>
              <li className="nav-item"><a className="nav-link nav-icon" href="#products" aria-label="購物車">🛒</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <section id="home" className="hero" aria-label="台北咖啡主視覺">
        <div className="hero-mobile-copy container">
          <p className="eyebrow">TAIPEI COFFEE</p>
          <h1>{content.heroTitle}</h1>
          <p>{content.heroSubtitle}</p>
          <a className="btn btn-gold btn-lg" href="/thank-you" data-gtm-event="purchase_click">立即選購</a>
        </div>
      </section>

      <section id="story" className="section-pad">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5"><img className="story-img" src="/images/story.png" alt="窗邊暖光中的台北咖啡" /></div>
            <div className="col-lg-7">
              <p className="section-kicker">OUR STORY</p>
              <h2 className="section-title text-start">{content.storyTitle}</h2>
              <p className="lead-copy">{content.storyText}</p>
              <div className="row g-3 mt-3">
                {[['☀','上班前','一杯咖啡，開啟充滿效率的一天。'],['☕','午後慢活時','一杯咖啡，找回專注與靈感。'],['◒','假日早晨','在家與家人共享咖啡香。']].map(([icon,title,text]) => <div className="col-md-4" key={title}><div className="moment-card"><span>{icon}</span><h3>{title}</h3><p>{text}</p></div></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="health" className="section-pad health-section">
        <div className="container">
          <SectionHeading title="台北咖啡的健康與匠心堅持" />
          <div className="row g-0 mt-5">
            {[['◉','A. 嚴選 100% 阿拉比卡豆','不使用易造成心悸與失眠的高咖啡因羅布斯塔豆。台北咖啡堅持慢選高品質阿拉比卡咖啡豆，讓每杯都更溫和。'],['♟','B. 極致保鮮焙製','綠原酸具有抗氧化潛力，幫助日常維持活力。我們以小批次烘焙與嚴密包裝，留住新鮮香氣。'],['♨','C. 從挑豆到烘焙的匠心','從挑豆、烘焙、包裝，到每一杯沖煮出的香氣，我們堅持每一道細節，只希望您喝下的是一份安心與溫度。']].map(([icon,title,text]) => <div className="col-lg-4" key={title}><article className="value-card"><div className="value-icon">{icon}</div><h3>{title}</h3><p>{text}</p></article></div>)}
          </div>
          <div className="health-note mx-auto">💡 台北咖啡貼心提醒：搭配均衡飲食與適量飲用，才能完整享受咖啡的健康與美好。</div>
        </div>
      </section>

      <section id="products" className="section-pad">
        <div className="container">
          <SectionHeading title="明星產品展示" />
          <div className="row g-4 mt-4">
            {content.products.map((product, index) => <div className="col-lg-6" key={product.name}><article className="product-card h-100"><h3>{product.name}</h3><img src={index === 0 ? '/images/drip-set.png' : '/images/beans.png'} alt={product.name} /><div className="p-4"><p>{product.description}</p><div className="d-flex gap-3 justify-content-center flex-wrap"><button className="btn btn-gold">加入購物車 🛒</button><a className="btn btn-coffee" href="/thank-you" data-gtm-event="purchase_click" data-product-name={product.name}>快速結帳</a></div></div></article></div>)}
          </div>
        </div>
      </section>

      <section id="reviews" className="section-pad reviews-section">
        <div className="container">
          <SectionHeading title="品質認證與顧客好評" />
          <div className="row g-5 align-items-center mt-4">
            <div className="col-lg-5"><div className="quality-seal"><span>♛</span><strong>台北咖啡<br/>品質保證</strong><small>新鮮・安心・值得信賴</small></div><ul className="quality-list"><li>新鮮烘焙保證</li><li>100% 莊園級精品豆</li><li>無有害添加物</li></ul></div>
            <div className="col-lg-7 d-grid gap-3">{content.reviews.map((review, index) => <blockquote className="review-card" key={review.name}><div className="review-avatar">{['俊','婷','晴'][index] || '咖'}</div><p>「{review.text}」</p><footer><span className="stars">★★★★★</span> — {review.name}</footer></blockquote>)}</div>
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="container"><div className="row gy-4 align-items-start"><div className="col-lg-3"><div className="footer-brand">♜ 台北咖啡</div><p>一杯好咖啡，讓生活慢一點、也更美好。</p></div><div className="col-lg-3"><h3>客服專線</h3><a href={`tel:${content.phone.replace(/-/g,'')}`}>{content.phone}</a><p>週一至週五 09:00–18:00</p></div><div className="col-lg-3"><h3>電子信箱</h3><a href={`mailto:${content.email}`}>{content.email}</a><p>我們將盡快回覆您</p></div><div className="col-lg-3"><h3>追蹤我們</h3><div className="socials"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">◎</a></div></div></div><hr/><div className="d-flex flex-wrap justify-content-between gap-2"><small>© 2026 台北咖啡 版權所有。</small><small><a href="/admin">管理後台</a>　｜　隱私權政策　｜　退換貨條款</small></div></div>
      </footer>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" async />
    </main>
  );
}

function SectionHeading({ title }: { title: string }) {
  return <div className="heading-wrap"><span /><h2>{title}</h2><span /></div>;
}
