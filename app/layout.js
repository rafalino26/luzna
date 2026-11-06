import './globals.css';
import Storefront from './storefront';

export const metadata = {title:'Luzna — Modest essentials',description:'Koleksi modest wear Luzna.'};

export default function Layout({children}) {
  return <html lang="id"><body><Storefront>{children}</Storefront></body></html>;
}
