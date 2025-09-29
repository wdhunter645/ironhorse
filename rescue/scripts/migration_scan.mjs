#!/usr/bin/env node
import fs from 'fs', path from 'path';
const req=['media_assets','quotes','photos','matchups','votes','charities','milestones','posts','events'];
function sqlFiles(d){const out=[]; if(!fs.existsSync(d)) return out; for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name); if(e.isDirectory()) out.push(...sqlFiles(p)); else if(e.isFile()&&p.endsWith('.sql')) out.push(p);} return out;}
const files=sqlFiles('supabase/migrations'); const sql=files.map(f=>fs.readFileSync(f,'utf8').toLowerCase()).join('\n');
const missing=req.filter(t=>!sql.includes(`create table if not exists public.${t}`)&&!sql.includes(`create table public.${t}`));
fs.mkdirSync('rescue/.state',{recursive:true}); fs.writeFileSync('rescue/.state/migrations.json',JSON.stringify({files:files.length,missing},null,2));
if(missing.length){console.log('MIGRATIONS STATUS: MISSING ->',missing.join(', ')); process.exit(1);} else {console.log('MIGRATIONS STATUS: OK');}
