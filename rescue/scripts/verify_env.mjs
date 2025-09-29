#!/usr/bin/env node
const req=['NEXT_PUBLIC_SITE_URL','NEXT_PUBLIC_SUPABASE_URL','NEXT_PUBLIC_SUPABASE_ANON_KEY','SUPABASE_SERVICE_ROLE_KEY','ADMIN_EMAILS','B2_KEY_ID','B2_APP_KEY','B2_BUCKET','B2_ENDPOINT','PUBLIC_B2_BASE_URL'];
const miss=req.filter(k=>!process.env[k]||String(process.env[k]).trim()==='');
let status='OK'; if(miss.length===req.length) status='BLOCKED'; else if(miss.length) status='MISSING';
import fs from 'fs'; fs.mkdirSync('rescue/.state',{recursive:true}); fs.writeFileSync('rescue/.state/env.json',JSON.stringify({status,missing:miss},null,2));
console.log(`ENV STATUS: ${status}${miss.length?' -> '+miss.join(', '):''}`); if(status!=='OK') process.exit(status==='BLOCKED'?2:1);
