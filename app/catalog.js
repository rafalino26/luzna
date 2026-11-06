export const categories = [
  { id: 'abaya', name: 'Abaya', photo: 0 },
  { id: 'khimar', name: 'Khimar', photo: 1 },
  { id: 'outer-abaya', name: 'Outer Abaya', photo: 2 },
  { id: 'essentials', name: 'Essentials', photo: 3 },
];

export const products = [
  { id:'layla', name:'Layla Abaya', category:'abaya', shade:'Onyx', price:489000, fresh:true, photo:0, color:'#242320' },
  { id:'safa', name:'Safa Khimar', category:'khimar', shade:'Olive', price:249000, fresh:true, photo:1, color:'#686b4b', sizes:['All size'] },
  { id:'noura', name:'Noura Outer Abaya', category:'outer-abaya', shade:'Taupe', price:449000, original:529000, photo:2, color:'#8b725c' },
  { id:'inaya', name:'Inaya Essential Set', category:'essentials', shade:'Ivory', price:319000, fresh:true, photo:3, color:'#e7d8bd' },
  { id:'amira', name:'Amira Abaya', category:'abaya', shade:'Ivory', price:529000, photo:3, color:'#e7d8bd' },
  { id:'hana', name:'Hana Khimar', category:'khimar', shade:'Onyx', price:189000, original:229000, photo:0, color:'#242320', sizes:['All size'] },
  { id:'raya', name:'Raya Outer Abaya', category:'outer-abaya', shade:'Olive', price:479000, fresh:true, photo:1, color:'#686b4b', sizes:['M','L','XL'] },
  { id:'lina', name:'Lina Essential Set', category:'essentials', shade:'Taupe', price:279000, original:329000, photo:2, color:'#8b725c', sizes:['S','M','L'] },
];

export const defaultSizes = ['S','M','L','XL'];
export const money = n => new Intl.NumberFormat('id-ID', {style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
