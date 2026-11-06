import Link from 'next/link';
import Icon from './ui-icon';
import {categories, products} from './catalog';
import {ProductGrid} from './storefront';

export default function Home(){
  return <main>
    <section className="hero">
      <div className="intro"><div className="eyebrow"><span/> THE FIRST EDIT · 01</div><h1>Elegance<br/><em>in Sunnah</em></h1><p>Busana modest dengan siluet lembut dan warna yang mudah dipadukan, untuk menemani hari-harimu.</p><Link className="cta" href="/shop">Jelajahi koleksi <Icon kind="arrow" size={17}/></Link></div>
      <div className="hero-photo" role="img" aria-label="Kampanye koleksi Luzna dengan abaya olive dan ivory"><span>01 / THE FIRST EDIT</span></div>
    </section>
    <section className="collection category-section">
      <div className="center-heading"><div className="eyebrow">01 / THE WARDROBE</div><h2>Shop by Category</h2><p>Temukan potongan yang cocok untuk gayamu.</p></div>
      <div className="grid">{categories.map((category,index)=><Link className={'category-card photo photo'+category.photo} key={category.id} href={'/shop?category='+category.id}>
        <small>0{index+1}</small><span>{category.name}<Icon kind="arrow" size={17}/></span>
      </Link>)}</div>
    </section>
    <section className="collection selections">
      <div className="section-head"><div><div className="eyebrow">02 / THE LUZNA EDIT</div><h2>Selections</h2></div><Link className="text-link" href="/shop">Lihat semua produk <Icon kind="arrow" size={15}/></Link></div>
      <ProductGrid items={products.slice(0,4)}/>
    </section>
    <section className="story"><span className="eyebrow">ABOUT LUZNA</span><h2>Untuk hari yang kamu jalani.</h2><p>Luzna berangkat dari gagasan sederhana: busana yang mudah dipakai, nyaman dipadukan, dan terasa seperti diri sendiri.</p><Link className="text-link" href="/about">Kenali Luzna <Icon kind="arrow" size={15}/></Link></section>
  </main>;
}
