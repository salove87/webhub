import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const manifestPath = path.join(root, 'jobs-static.json');
const MARKER = 'webhub-rich-job-share-v2';

async function readManifest() {
  try {
    const data = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function enhancementScript() {
  return `<script data-webhub="${MARKER}">(function(){
  function clean(v){return String(v||'').replace(/\\s+/g,' ').trim()}
  function shareText(){
    const title=clean(document.querySelector('h1')?.textContent);
    const company=clean(document.querySelector('.company-name')?.textContent).replace(/●/g,'').trim();
    const locationText=clean(document.querySelector('.meta span')?.textContent);
    const jobUrl=window.location.href;
    const basics=[...document.querySelectorAll('.info-grid .info-row')].map(row=>{
      const label=clean(row.querySelector('small')?.textContent);
      const value=clean(row.querySelector('b')?.textContent);
      return label&&value?label+': '+value:'';
    }).filter(Boolean);
    return [
      title?'ตำแหน่งงาน: '+title:'',
      company?'บริษัท: '+company:'',
      locationText,
      basics.length?'':'',
      basics.length?'ข้อมูลพื้นฐาน':'',
      ...basics,
      '',
      'ดูรายละเอียดและสมัครงาน:',
      jobUrl
    ].filter((v,i,a)=>!(v===''&&a[i-1]==='')).join('\\n');
  }
  function install(){
    const box=document.querySelector('#share .share');
    if(!box)return;
    if(!box.querySelector('[data-line-share]')){
      const a=document.createElement('a');
      a.dataset.lineShare='1';
      a.textContent='LINE';
      a.target='_blank';
      a.rel='noopener';
      a.href='#';
      a.addEventListener('click',function(e){
        e.preventDefault();
        const text=shareText();
        window.open('https://line.me/R/msg/text/?'+encodeURIComponent(text),'_blank','noopener');
      });
      const copy=[...box.querySelectorAll('button')].find(b=>clean(b.textContent).includes('คัดลอก'));
      box.insertBefore(a,copy||null);
    }
    const copy=[...box.querySelectorAll('button')].find(b=>clean(b.textContent).includes('คัดลอก'));
    if(copy&&!copy.dataset.richCopy){
      copy.dataset.richCopy='1';
      copy.onclick=null;
      copy.addEventListener('click',async function(){
        try{
          await navigator.clipboard.writeText(shareText());
          const old=this.textContent;
          this.textContent='คัดลอกแล้ว ✓';
          setTimeout(()=>this.textContent=old,1400);
        }catch{
          const ta=document.createElement('textarea');
          ta.value=shareText();
          ta.style.position='fixed';ta.style.opacity='0';
          document.body.appendChild(ta);ta.select();
          document.execCommand('copy');ta.remove();
          const old=this.textContent;
          this.textContent='คัดลอกแล้ว ✓';
          setTimeout(()=>this.textContent=old,1400);
        }
      });
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();</script>`;
}

async function enhance(file) {
  let html;
  try { html = await fs.readFile(file, 'utf8'); } catch { return false; }
  if (html.includes(MARKER)) return false;
  if (!html.includes('</body>')) throw new Error(`Missing </body>: ${file}`);
  html = html.replace('</body>', `${enhancementScript()}</body>`);
  await fs.writeFile(file, html, 'utf8');
  return true;
}

const rows = await readManifest();
let changed = 0;
for (const item of rows) {
  const slug = typeof item === 'string' ? item : item?.slug;
  if (!slug) continue;
  if (await enhance(path.join(root, 'jobs', slug, 'index.html'))) changed++;
}
console.log(`Enhanced share tools on ${changed}/${rows.length} static job page(s)`);
