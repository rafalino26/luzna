'use client';
import { useState } from 'react';
const products = [
  {name:'Layla Abaya', shade:'Onyx', price:489000, tag:'TERBARU', color:'#242320'},
  {name:'Safa Abaya', shade:'Olive', price:525000, color:'#686b4b'},
  {name:'Noura Abaya', shade:'Taupe', price:499000, color:'#8b725c'},
  {name:'Inaya Abaya', shade:'Ivory', price:549000, color:'#e7d8bd'},
];
const money = n => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
function Icon({kind}) {
 const paths={search:<><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4 4"/></>, user:<><circle cx="12" cy="8" r="3"/><path d="M5 20v-2a7 7 0 0 1 14 0v2"/></>, bag:<><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>};
 return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" aria-hidden="true">{paths[kind]}</svg>;
}
export default function Home(){
 const [query,setQuery]=useState(''), [panel,setPanel]=useState(null), [size,setSize]=useState('M'), [bag,setBag]=useState([]);
 const items=products.map((p,i)=>({...p,i})).filter(p=>(p.name+' '+p.shade).toLowerCase().includes(query.toLowerCase()));
 function add(p){const id=p.i+'-'+size;setBag(prev=>prev.some(x=>x.id===id)?prev.map(x=>x.id===id?{...x,qty:x.qty+1}:x):[...prev,{...p,id,size,qty:1}]);setPanel('bag');}
 return <>
 <div className="ribbon">LUZNA STUDIO <span>✦</span> KOLEKSI PERDANA</div>
 <header className="nav"><nav aria-label="Navigasi utama"><a href="#koleksi">Koleksi</a><a href="#cerita">Tentang Luzna</a></nav><a className="logo" href="#" aria-label="Luzna, beranda">luzna<span>.</span></a>
 <div className="actions"><button aria-label="Cari produk" onClick={()=>setPanel('search')}><Icon kind="search"/></button><button aria-label="Akun" onClick={()=>setPanel('account')}><Icon kind="user"/></button><button aria-label="Tas belanja" onClick={()=>setPanel('bag')}><Icon kind="bag"/>{bag.length>0&&<sup>{bag.reduce((s,x)=>s+x.qty,0)}</sup>}</button></div></header>
 <main>
 <section className="hero"><div className="intro"><div className="eyebrow"><span/> THE FIRST EDIT · 01</div><h1>Anggun dalam<br/><em>kesederhanaan.</em></h1><p>Busana modest dengan siluet lembut dan warna yang mudah dipadukan, untuk menemani hari-harimu.</p><a className="cta" href="#koleksi">Jelajahi koleksi <span>↗</span></a></div><div className="hero-photo" role="img" aria-label="Kampanye koleksi Luzna dengan abaya olive dan ivory"><span>01 / THE FIRST EDIT</span></div></section>
 <section id="koleksi" className="collection"><div className="section-head"><div><div className="eyebrow">PILIHAN LUZNA</div><h2>Koleksi perdana</h2></div><p>Empat warna, satu siluet yang mengalir.</p></div>
 {query&&<p>Hasil untuk “{query}” <button className="link" onClick={()=>setQuery('')}>Hapus pencarian</button></p>}
 <div className="grid">{items.map(p=><article key={p.name}><button className="product" aria-label={'Lihat '+p.name} onClick={()=>{setSize('M');setPanel(p);}}><div className={'photo photo'+p.i}>{p.tag&&<span>{p.tag}</span>}</div><div className="product-meta"><h3>{p.name}</h3><span>{money(p.price)}</span></div><div className="shade"><i style={{background:p.color}}/>{p.shade}</div></button></article>)}</div>{!items.length&&<p>Produk belum ditemukan.</p>}</section>
 <section id="cerita" className="story"><span className="eyebrow">TENTANG LUZNA</span><h2>Untuk hari yang kamu jalani.</h2><p>Luzna berangkat dari gagasan sederhana: busana yang mudah dipakai, nyaman dipadukan, dan terasa seperti diri sendiri.</p></section>
 </main><footer><a className="logo" href="#">luzna<span>.</span></a><p>Konsep storefront · Foto, produk, dan harga ilustrasi.</p><a href="#koleksi">Kembali ke koleksi ↑</a></footer>
 {panel&&<div className="overlay" onClick={()=>setPanel(null)}><section className="panel" role="dialog" aria-modal="true" aria-label="Panel toko" onClick={e=>e.stopPropagation()} onKeyDown={e=>e.key==='Escape'&&setPanel(null)}><button autoFocus className="close" aria-label="Tutup panel" onClick={()=>setPanel(null)}>×</button>
 {panel==='search'?<><h2>Cari produk</h2><form onSubmit={e=>{e.preventDefault();setPanel(null);document.getElementById('koleksi').scrollIntoView();}}><label htmlFor="search">Nama produk atau warna</label><input id="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Contoh: Olive"/><button className="cta">Cari koleksi</button></form></>:panel==='account'?<><h2>Akun Luzna</h2><p>Ini tampilan awal halaman akun pelanggan.</p><label htmlFor="email">Alamat email</label><input id="email" type="email" placeholder="nama@email.com" disabled/><button className="cta" disabled>Masuk</button></>:panel==='bag'?<><h2>Tas belanja</h2>{bag.length===0?<p>Tas belanja kamu masih kosong.</p>:<><ul className="bag-list">{bag.map(p=><li key={p.id}><div>{p.name}<small>{p.shade} · {p.size} · {p.qty} buah</small></div><div>{money(p.price*p.qty)}<button className="link" onClick={()=>setBag(prev=>prev.filter(x=>x.id!==p.id))}>Hapus</button></div></li>)}</ul><p className="subtotal">Subtotal <strong>{money(bag.reduce((s,p)=>s+p.price*p.qty,0))}</strong></p><button className="cta" disabled>Checkout · segera hadir</button></>}</>:<><div className={'photo detail photo'+panel.i}/><div className="eyebrow">{panel.shade}</div><h2>{panel.name}</h2><p>{money(panel.price)}</p><fieldset><legend>Ukuran</legend>{['S','M','L','XL'].map(s=><button key={s} className={size===s?'selected':''} aria-pressed={size===s} onClick={()=>setSize(s)}>{s}</button>)}</fieldset><button className="cta" onClick={()=>add(panel)}>Tambahkan ke tas <span>+</span></button></>}
 </section></div>}
 </>;
}
