import fs from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(), out=path.join(root,'jobs'), manifest=path.join(root,'jobs-static.json');
const mapThai=s=>String(s||'').toLowerCase()
  .replace(/ผู้จัดการ/g,'manager').replace(/ผู้ช่วย/g,'assistant').replace(/หัวหน้างาน|หัวหน้า/g,'supervisor')
  .replace(/วิศวกร/g,'engineer').replace(/ช่างเทคนิค/g,'technician').replace(/ช่าง/g,'technician')
  .replace(/เจ้าหน้าที่/g,'officer').replace(/พนักงาน/g,'staff').replace(/ฝ่ายผลิต|ผลิต/g,'production')
  .replace(/บัญชี/g,'accounting').replace(/การเงิน/g,'finance').replace(/ทรัพยากรบุคคล|บุคคล/g,'human-resources')
  .replace(/ธุรการ/g,'administration').replace(/จัดซื้อ/g,'purchasing').replace(/คลังสินค้า/g,'warehouse')
  .replace(/โลจิสติกส์/g,'logistics').replace(/คุณภาพ|ควบคุมคุณภาพ/g,'quality-control').replace(/ประกันคุณภาพ/g,'quality-assurance')
  .replace(/ขาย/g,'sales').replace(/การตลาด/g,'marketing').replace(/ไอที|เทคโนโลยีสารสนเทศ/g,'it')
  .replace(/โปรแกรมเมอร์/g,'programmer').replace(/นักพัฒนา/g,'developer').replace(/ออกแบบ/g,'designer')
  .replace(/ขับรถ|คนขับรถ/g,'driver').replace(/รักษาความปลอดภัย/g,'security').replace(/แม่บ้าน/g,'housekeeping');
function slugifyEnglish(text,id){let s=mapThai(text).normalize('NFKD').replace(/[\u0E00-\u0E7F]/g,' ').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').replace(/-+/g,'-').slice(0,72);if(!s)s='job-opening';return `${s}-${id.slice(0,8)}`}
const escAttr=s=>String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
let rows=[];try{rows=JSON.parse(await fs.readFile(manifest,'utf8'))}catch{process.exit(0)}
const jobs=[];
for(const r of rows){try{const p=path.join(out,r.slug,'index.html');const html=await fs.readFile(p,'utf8');const m=html.match(/<title>(.*?) \| (.*?) \| WebHub Jobs<\/title>/i);const title=(m?.[1]||'job').replace(/&amp;/g,'&').replace(/&#39;/g,"'");const company=(m?.[2]||'').replace(/&amp;/g,'&').replace(/&#39;/g,"'");jobs.push({...r,oldSlug:r.slug,newSlug:slugifyEnglish(`${title}-${company}`,r.id),html})}catch{jobs.push({...r,oldSlug:r.slug,newSlug:`job-opening-${r.id.slice(0,8)}`,html:''})}}
const replacements=new Map(jobs.map(x=>[x.oldSlug,x.newSlug]));
for(const j of jobs){if(!j.html)continue;let html=j.html;for(const [oldSlug,newSlug] of replacements){html=html.split(encodeURIComponent(oldSlug)).join(encodeURIComponent(newSlug));html=html.split(oldSlug).join(newSlug)}const newDir=path.join(out,j.newSlug);await fs.mkdir(newDir,{recursive:true});await fs.writeFile(path.join(newDir,'index.html'),html,'utf8');if(j.oldSlug!==j.newSlug){const target=`../${encodeURIComponent(j.newSlug)}/`;const redirect=`<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"><link rel="canonical" href="https://webhub.asia/jobs/${encodeURIComponent(j.newSlug)}/"><meta http-equiv="refresh" content="0;url=${escAttr(target)}"><script>location.replace(${JSON.stringify(target)})</script></head><body><a href="${escAttr(target)}">Moved</a></body></html>`;await fs.mkdir(path.join(out,j.oldSlug),{recursive:true});await fs.writeFile(path.join(out,j.oldSlug,'index.html'),redirect,'utf8')}}
await fs.writeFile(manifest,JSON.stringify(jobs.map(x=>({id:x.id,slug:x.newSlug})),null,2)+'\n','utf8');
console.log(`Converted ${jobs.length} job URLs to English-only slugs`);