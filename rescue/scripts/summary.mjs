#!/usr/bin/env node
import fs from 'fs';
function read(n,d){try{return JSON.parse(fs.readFileSync(`rescue/.state/${n}.json`,'utf8'))}catch{return d}}
const env=read('env',{status:'UNKNOWN',missing:[]});
let secrets='UNKNOWN'; try{const s=fs.readFileSync('rescue/.state/secrets.txt','utf8'); secrets=s.trim().length?'FOUND':'OK';}catch{}
const mig=read('migrations',{missing:[]});
console.log('\n==============================\nIRONHORSE RESCUE SUMMARY\n------------------------------');
console.log(`env:        ${env.status}${env.missing?.length?' -> '+env.missing.join(', '):''}`);
console.log(`secrets:    ${secrets}`);
console.log(`migrations: ${mig.missing?.length?'MISSING -> '+mig.missing.join(', '):'OK'}`);
console.log('next steps: ',[
  env.status!=='OK'?'Set missing env vars in Vercel and update .env.example.':null,
  secrets==='FOUND'?'Rotate exposed secrets and scrub history if needed.':null,
  (mig.missing?.length||0)?'Add idempotent migrations for missing tables.':null
].filter(Boolean).join(' | ')||'All good.');
console.log('==============================\n');
