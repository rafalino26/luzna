'use client';
import Link from 'next/link';
import Icon from './ui-icon';
import {useState} from 'react';
import {categories, defaultSizes, products} from './catalog';
import {ProductGrid} from './storefront';

const emptyFilters = {category:'',shade:'',size:'',price:'',sort:''};
const views = {
  all:{title:'Shop',subtitle:'Jelajahi semua koleksi Luzna.'},
  new:{title:'New Arrivals',subtitle:'Pilihan terbaru dari The First Edit.'},
  sale:{title:'Sale',subtitle:'Pilihan Luzna dengan harga spesial.'},
};
const shades = [...new Set(products.map(product=>product.shade))];

function SelectFilter({label,value,onChange,options,placeholder='Semua'}) {
  return <label className="filter-field">{label}<select value={value} onChange={event=>onChange(event.target.value)}>
    <option value="">{placeholder}</option>
    {options.map(option=><option key={option.id} value={option.id}>{option.name}</option>)}
  </select></label>;
}

const optionList = values => values.map(value=>({id:value,name:value}));

export default function ShopCatalog({view='all',category='',query=''}) {
  const [filters,setFilters]=useState({...emptyFilters,category});
  const [search,setSearch]=useState(query);
  const [filterOpen,setFilterOpen]=useState(false);
  const update=key=>value=>setFilters(previous=>({...previous,[key]:value}));
  const searchTerm=search.trim().toLowerCase();
  const items=products.filter(product=>{
    if(view==='new'&&!product.fresh || view==='sale'&&!product.original) return false;
    return (!filters.category||product.category===filters.category)
      && (!filters.shade||product.shade===filters.shade)
      && (!filters.size||(product.sizes??defaultSizes).includes(filters.size))
      && (!filters.price||(filters.price==='under' ? product.price<350000 : product.price>=350000))
      && (!searchTerm||(product.name+' '+product.shade).toLowerCase().includes(searchTerm));
  });
  if(filters.sort==='low') items.sort((a,b)=>a.price-b.price);
  if(filters.sort==='high') items.sort((a,b)=>b.price-a.price);
  if(filters.sort==='new') items.sort((a,b)=>Number(!!b.fresh)-Number(!!a.fresh));

  const count=Object.entries(filters).filter(([key,value])=>key!=='sort'&&value).length;
  const reset=()=>{setFilters(emptyFilters);setSearch('');};

  return <main>
    <section className="catalog-banner">
      <div className="eyebrow"><Link href="/">LUZNA</Link> / {views[view].title.toUpperCase()}</div>
      <h1>{views[view].title}</h1><p>{views[view].subtitle}</p>
    </section>
    <section className="collection shop-collection">
      <div className="category-tabs" aria-label="Kategori produk">
        <button aria-pressed={!filters.category} onClick={()=>update('category')('')}>Shop All</button>
        {categories.map(option=><button key={option.id} aria-pressed={filters.category===option.id} onClick={()=>update('category')(option.id)}>{option.name}</button>)}
      </div>
      <div className="catalog-toolbar">
        <button className="filter-toggle" aria-expanded={filterOpen} aria-controls="shop-filters" onClick={()=>setFilterOpen(!filterOpen)}><Icon kind="filter" size={16}/> Filter{count>0?' ('+count+')':''}</button>
        <p aria-live="polite">{items.length} produk</p>
        <SelectFilter label="Urutkan" value={filters.sort} onChange={update('sort')} placeholder="Rekomendasi" options={[{id:'new',name:'Terbaru'},{id:'low',name:'Harga terendah'},{id:'high',name:'Harga tertinggi'}]}/>
      </div>
      <div className="filter-fields" id="shop-filters" hidden={!filterOpen}>
        <SelectFilter label="Kategori" value={filters.category} onChange={update('category')} options={categories}/>
        <SelectFilter label="Warna" value={filters.shade} onChange={update('shade')} options={optionList(shades)}/>
        <SelectFilter label="Ukuran" value={filters.size} onChange={update('size')} options={optionList([...defaultSizes,'All size'])}/>
        <SelectFilter label="Harga" value={filters.price} onChange={update('price')} options={[{id:'under',name:'Di bawah Rp350.000'},{id:'over',name:'Rp350.000 ke atas'}]}/>
        <button className="link" onClick={reset}>Reset filter</button>
      </div>
      {search&&<p className="search-result">Hasil untuk “{search}” <button className="link" onClick={()=>setSearch('')}>Hapus pencarian</button></p>}
      {items.length ? <ProductGrid items={items}/> : <div className="empty"><p>Tidak ada produk yang cocok.</p><button className="link" onClick={reset}>Tampilkan semua produk</button></div>}
    </section>
  </main>;
}
