const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  console.log('Seeding brands and categories...');

  const brands = [
    { name: 'Nike', slug: 'nike' }, { name: 'Adidas', slug: 'adidas' }, 
    { name: 'Puma', slug: 'puma' }, { name: 'Reebok', slug: 'reebok' }, 
    { name: 'New Balance', slug: 'new-balance' }, { name: 'Jordan', slug: 'jordan' }, 
    { name: 'Converse', slug: 'converse' }, { name: 'Vans', slug: 'vans' }, 
    { name: 'Fila', slug: 'fila' }, { name: 'Under Armour', slug: 'under-armour' }, 
    { name: 'Asics', slug: 'asics' }, { name: 'Skechers', slug: 'skechers' }, 
    { name: 'Balenciaga', slug: 'balenciaga' }, { name: 'Gucci', slug: 'gucci' }
  ];

  const categories = [
    { name: 'Zapatillas Running', slug: 'running' }, { name: 'Zapatillas Lifestyle', slug: 'lifestyle' }, 
    { name: 'Basketball', slug: 'basketball' }, { name: 'Skateboarding', slug: 'skateboarding' }, 
    { name: 'Deportes', slug: 'deportes' }, { name: 'Ropa', slug: 'ropa' }, { name: 'Accesorios', slug: 'accesorios' }
  ];

  const { data: existingBrands } = await supabase.from('brands').select('slug');
  const existingBrandSlugs = new Set(existingBrands?.map(b => b.slug) || []);
  
  for (const b of brands) {
    if (!existingBrandSlugs.has(b.slug)) {
      await supabase.from('brands').insert(b);
      console.log(`Inserted brand: ${b.name}`);
    } else {
      console.log(`Skipped brand (exists): ${b.name}`);
    }
  }

  const { data: existingCats } = await supabase.from('categories').select('slug');
  const existingCatSlugs = new Set(existingCats?.map(c => c.slug) || []);
  
  for (const c of categories) {
    if (!existingCatSlugs.has(c.slug)) {
      await supabase.from('categories').insert(c);
      console.log(`Inserted category: ${c.name}`);
    } else {
      console.log(`Skipped category (exists): ${c.name}`);
    }
  }

  console.log('Seed complete!');
}

run().catch(console.error);
