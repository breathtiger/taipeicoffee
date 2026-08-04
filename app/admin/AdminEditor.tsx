"use client";
import { useEffect, useState } from "react";
import type { SiteContent } from "../site-content";

export default function AdminEditor({ email }: { email: string }) {
  const [data, setData] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState("正在讀取內容…");
  useEffect(() => { fetch('/api/content').then(r => { if (!r.ok) throw new Error(); return r.json(); }).then(setData).then(() => setStatus('')).catch(() => setStatus('無法讀取內容，請確認此帳號具有管理權限。')); }, []);
  const update = (key: keyof SiteContent, value: string) => setData(d => d ? ({...d, [key]: value}) : d);
  const save = async () => { if (!data) return; setStatus('儲存中…'); const r = await fetch('/api/content', {method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)}); setStatus(r.ok ? '✓ 已儲存，首頁內容已更新。' : '儲存失敗，請稍後再試。'); };
  if (!data) return <div className="admin-shell"><div className="admin-panel"><p>{status}</p></div></div>;
  return <main className="admin-shell"><div className="admin-panel"><div className="d-flex justify-content-between align-items-start gap-3 mb-4"><div><p className="section-kicker mb-1">TAIPEI COFFEE CMS</p><h1>網站內容管理</h1><p className="text-secondary mb-0">登入帳號：{email}</p></div><div className="d-flex gap-2"><a className="btn btn-outline-secondary" href="/">檢視首頁</a><a className="btn btn-coffee" href="/signout-with-chatgpt?return_to=/">登出</a></div></div>
    <section className="admin-group"><h2>首頁主視覺</h2><Field label="主標題" value={data.heroTitle} onChange={v=>update('heroTitle',v)} textarea/><Field label="副標題" value={data.heroSubtitle} onChange={v=>update('heroSubtitle',v)} /></section>
    <section className="admin-group"><h2>品牌故事</h2><Field label="標題" value={data.storyTitle} onChange={v=>update('storyTitle',v)} /><Field label="內容" value={data.storyText} onChange={v=>update('storyText',v)} textarea/></section>
    <section className="admin-group"><h2>聯絡資訊</h2><div className="row"><div className="col-md-6"><Field label="客服電話" value={data.phone} onChange={v=>update('phone',v)} /></div><div className="col-md-6"><Field label="電子信箱" value={data.email} onChange={v=>update('email',v)} /></div></div></section>
    <section className="admin-group"><h2>商品內容</h2>{data.products.map((p,i)=><div className="row mb-3" key={i}><div className="col-md-4"><Field label={`商品 ${i+1} 名稱`} value={p.name} onChange={v=>setData({...data,products:data.products.map((x,j)=>j===i?{...x,name:v}:x)})}/></div><div className="col-md-8"><Field label="商品說明" value={p.description} onChange={v=>setData({...data,products:data.products.map((x,j)=>j===i?{...x,description:v}:x)})}/></div></div>)}</section>
    <section className="admin-group"><h2>顧客好評</h2>{data.reviews.map((r,i)=><div className="row mb-3" key={i}><div className="col-md-4"><Field label={`顧客 ${i+1}`} value={r.name} onChange={v=>setData({...data,reviews:data.reviews.map((x,j)=>j===i?{...x,name:v}:x)})}/></div><div className="col-md-8"><Field label="評語" value={r.text} onChange={v=>setData({...data,reviews:data.reviews.map((x,j)=>j===i?{...x,text:v}:x)})}/></div></div>)}</section>
    <div className="admin-savebar"><span>{status}</span><button className="btn btn-gold btn-lg" onClick={save}>儲存全部變更</button></div>
  </div></main>;
}

function Field({label,value,onChange,textarea=false}:{label:string,value:string,onChange:(v:string)=>void,textarea?:boolean}) { return <label className="form-label w-100"><span>{label}</span>{textarea?<textarea className="form-control mt-2" rows={3} value={value} onChange={e=>onChange(e.target.value)}/>:<input className="form-control mt-2" value={value} onChange={e=>onChange(e.target.value)}/>}</label> }
