import Link from 'next/link';
import Icon from '../ui-icon';

export const metadata = {title:'About Us — Luzna'};

export default function About(){
  return <main>
    <section className="hero about-hero">
      <div className="intro">
        <div className="eyebrow"><span/> ABOUT US</div>
        <h1>Kenali <em>Luzna.</em></h1>
        <p>Luzna berangkat dari gagasan sederhana: busana yang mudah dipakai, nyaman dipadukan, dan terasa seperti diri sendiri.</p>
        <Link className="cta" href="/shop">Jelajahi koleksi <Icon kind="arrow" size={17}/></Link>
      </div>
      <div className="hero-photo" role="img" aria-label="Dua busana dari koleksi perdana Luzna"/>
    </section>
  </main>;
}
