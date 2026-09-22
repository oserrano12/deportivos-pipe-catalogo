import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: p, error: fetchErr } = await supabase.from('products').select('*').limit(1).single();
  
  if (fetchErr || !p) {
    console.error("Error fetching product:", fetchErr);
    return;
  }
  
  delete p.id;
  delete p.created_at;
  
  p.name = p.name + ' (Formato Premium)';
  p.slug = p.slug + '-formato-' + Date.now();
  p.base_sku = p.base_sku + '-FMT';
  
  // Clean, transparent, 1:1 sneaker image
  p.images = ['https://raw.githubusercontent.com/bedimcode/responsive-ecommerce-website-sneakers/master/assets/img/women1.png'];
  
  const { error: insertErr } = await supabase.from('products').insert([p]);
  
  if (insertErr) {
    console.error("Error inserting:", insertErr);
  } else {
    console.log("Success! Duplicated product as", p.name);
  }
}

run();
