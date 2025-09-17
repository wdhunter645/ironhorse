import { supabase } from './supabaseClient';

async function testSupabaseAccess() {
  // Replace 'test_table' and columns with your actual table/schema
  const testData = { name: 'CopilotTest', created_at: new Date().toISOString() };

  // Insert
  const insertRes = await supabase.from('test_table').insert([testData]).select();
  console.log('Insert Result:', insertRes);

  // Read
  const readRes = await supabase.from('test_table').select('*').eq('name', 'CopilotTest');
  console.log('Read Result:', readRes);

  // Update
  const updateRes = await supabase.from('test_table').update({ name: 'CopilotTestUpdated' }).eq('name', 'CopilotTest');
  console.log('Update Result:', updateRes);

  // Delete
  const deleteRes = await supabase.from('test_table').delete().eq('name', 'CopilotTestUpdated');
  console.log('Delete Result:', deleteRes);
}

testSupabaseAccess().catch(console.error);