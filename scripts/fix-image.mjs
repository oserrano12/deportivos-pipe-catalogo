import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: p } = await supabase.from('products').select('id, slug').ilike('slug', '%-formato-%').single();
  
  if (p) {
    const { error } = await supabase.from('products').update({ images: ['/women1.png'] }).eq('id', p.id);
    console.log(error || 'Successfully updated to local image!');
  } else {
    console.log('Product not found');
  }
}

run();
