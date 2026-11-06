'use client';
import Link from 'next/link';
import Icon from './ui-icon';
import {useRouter} from 'next/navigation';
import {createContext, useContext, useEffect, useRef, useState} from 'react';
import {categories, defaultSizes, money} from './catalog';

const OpenProduct = createContext(null);
const mainLinks = [
  {href:'/new-arrivals', label:'New Arrivals'},
  {href:'/about', label:'About Us'},
  {href:'/sale', label:'Sale'},
];

export default function Storefront({children}) {
  const router = useRouter();
  const mobileMenu = useRef(null);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 760px)');
    const closeOnDesktop = event => {
      if (!event.matches) mobileMenu.current?.close();
    };
    mobile.addEventListener('change', closeOnDesktop);
    return () => mobile.removeEventListener('change', closeOnDesktop);
  }, []);
  const [panel,setPanel] = useState(null);
  const [query,setQuery] = useState('');
  const [size,setSize] = useState('M');
  const [bag,setBag] = useState([]);
  function openProduct(product) {
    setSize(product.sizes?.[0] ?? 'M');
    setPanel(product);
  }
  function add(product) {
    const key = product.id+'-'+size;
    setBag(items => items.some(item=>item.key===key)
      ? items.map(item=>item.key===key ? {...item,qty:item.qty+1} : item)
      : [...items,{...product,key,size,qty:1}]);
    setPanel('bag');
  }

  return <OpenProduct.Provider value={openProduct}>
    <div className="ribbon">LUZNA STUDIO <span><Icon kind="sparkle" size={10}/></span> THE FIRST EDIT</div>
    <header className="nav">
      <button type="button" className="mobile-menu-trigger" aria-label="Buka menu" aria-haspopup="dialog" aria-controls="mobile-menu" onClick={()=>mobileMenu.current.showModal()}>
        <Icon kind="menu"/>
      </button>
      <Link className="logo" href="/" aria-label="Luzna, beranda">luzna<span>.</span></Link>
      <nav className="desktop-nav" aria-label="Navigasi utama">
        <div className="shop-nav"><Link href="/shop">Shop</Link><div className="shop-menu"><Link href="/shop">Shop All</Link>{categories.map(category=><Link key={category.id} href={'/shop?category='+category.id}>{category.name}</Link>)}</div></div>
        {mainLinks.map(({href,label})=><Link key={href} href={href}>{label}</Link>)}
      </nav>
      <div className="actions">
        {['search','account','bag'].map((kind,index)=><button key={kind} aria-label={['Cari produk','Akun','Tas belanja'][index]} onClick={()=>setPanel(kind)}>
          <Icon kind={kind}/>{kind==='bag'&&bag.length>0&&<sup>{bag.reduce((sum,item)=>sum+item.qty,0)}</sup>}
        </button>)}
      </div>
    </header>
    <dialog className="mobile-menu" id="mobile-menu" ref={mobileMenu} aria-label="Menu Luzna" onClick={event=>{
      if (event.target===event.currentTarget) mobileMenu.current.close();
    }}>
      <div className="mobile-menu-content">
        <div className="mobile-menu-heading">
          <Link className="logo" href="/" aria-label="Luzna, beranda" onClick={()=>mobileMenu.current.close()}>luzna<span>.</span></Link>
          <button type="button" className="close" autoFocus aria-label="Tutup menu" onClick={()=>mobileMenu.current.close()}><Icon kind="close"/></button>
        </div>
        <nav aria-label="Navigasi mobile" onClick={event=>{
          if (event.target.closest('a')) mobileMenu.current.close();
        }}>
          <Link href="/shop">Shop <Icon kind="arrow" size={16}/></Link>
          <div className="mobile-menu-categories">{categories.map(category=><Link key={category.id} href={'/shop?category='+category.id}>{category.name}</Link>)}</div>
          {mainLinks.map(({href,label})=><Link key={href} href={href}>{label}</Link>)}
        </nav>
      </div>
    </dialog>
    {children}
    <footer><Link className="logo" href="/">luzna<span>.</span></Link><p>Konsep storefront · Foto, produk, dan harga ilustrasi.</p><Link href="/shop">Jelajahi Shop <Icon kind="arrow" size={15}/></Link></footer>
    {panel&&<div className="overlay" onClick={()=>setPanel(null)}>
      <section className="panel" role="dialog" aria-modal="true" aria-label="Panel toko" onClick={e=>e.stopPropagation()} onKeyDown={e=>{if(e.key==='Escape')setPanel(null);}}>
        <button autoFocus className="close" aria-label="Tutup panel" onClick={()=>setPanel(null)}>×</button>
        {panel==='search' ? <><h2>Cari produk</h2><form onSubmit={e=>{e.preventDefault();setPanel(null);router.push('/shop?q='+encodeURIComponent(query.trim()));}}>
          <label htmlFor="search">Nama produk atau warna</label><input id="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Contoh: Olive"/><button className="cta">Cari koleksi</button>
        </form></> : panel==='account' ? <><h2>Akun Luzna</h2><p>Ini tampilan awal halaman akun pelanggan.</p><label htmlFor="email">Alamat email</label><input id="email" placeholder="nama@email.com" disabled/><button className="cta" disabled>Masuk</button></>
        : panel==='bag' ? <><h2>Tas belanja</h2>{bag.length===0 ? <p>Tas belanja kamu masih kosong.</p> : <>
          <ul className="bag-list">{bag.map(item=><li key={item.key}><div>{item.name}<small>{item.shade} · {item.size} · {item.qty} buah</small></div><div>{money(item.price*item.qty)}<button className="link" onClick={()=>setBag(items=>items.filter(p=>p.key!==item.key))}>Hapus</button></div></li>)}</ul>
          <p className="subtotal">Subtotal <strong>{money(bag.reduce((sum,item)=>sum+item.price*item.qty,0))}</strong></p><button className="cta" disabled>Checkout · segera hadir</button>
        </>}</> : <><div className={'photo detail photo'+panel.photo}/><div className="eyebrow">{panel.shade}</div><h2>{panel.name}</h2><p>{money(panel.price)}</p>
          <fieldset><legend>Ukuran</legend>{(panel.sizes??defaultSizes).map(option=><button key={option} className={size===option?'selected':''} aria-pressed={size===option} onClick={()=>setSize(option)}>{option}</button>)}</fieldset>
          <button className="cta" onClick={()=>add(panel)}>Tambahkan ke tas <span>+</span></button>
        </>}
      </section>
    </div>}
  </OpenProduct.Provider>;
}

export function ProductGrid({items}) {
  const openProduct = useContext(OpenProduct);
  return <div className="grid">{items.map(product=><article key={product.id}>
    <button className="product" aria-label={'Lihat '+product.name} onClick={()=>openProduct(product)}>
      <div className={'photo photo'+product.photo}>{(product.original||product.fresh)&&<span>{product.original?'SALE':'NEW'}</span>}</div>
      <div className="product-meta"><h3>{product.name}</h3><span>{product.original&&<del>{money(product.original)}</del>} {money(product.price)}</span></div>
      <div className="shade"><i style={{background:product.color}}/>{product.shade}</div>
    </button>
  </article>)}</div>;
}
