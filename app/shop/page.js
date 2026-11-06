import ShopCatalog from '../shop-catalog';
import {categories} from '../catalog';

export const metadata = {title:'Shop — Luzna'};

export default async function ShopPage({searchParams}) {
  const params = await searchParams;
  const category = categories.some(item=>item.id===params.category) ? params.category : '';
  const query = typeof params.q==='string' ? params.q : '';
  return <ShopCatalog key={JSON.stringify([category,query])} category={category} query={query}/>;
}
