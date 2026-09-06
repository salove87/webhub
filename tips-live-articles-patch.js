import{getApp}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import{getFirestore,collection,getDocs,query,where}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const app=getApp(),db=getFirestore(app);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons={'คู่มือสมัครงาน':'🧭','Jobs Update':'💼','HR':'👥','Resume':'📄','เงินเดือน':'💰','สิทธิแรงงาน':'⚖️','Career':'🚀','ตลาดงาน':'📈','เทคนิคสัมภาษณ์':'💬'};
let staticSlugs=new Set();
try{const r=await fetch('./articles-static.json?v='+Date.now(),{cache:'no-store'});if(r.ok)staticSlugs=new Set(await r.json())}catch{}
const href=a=>{const s=a.slug||a.id;return staticSlugs.has(s)?`articles/${encodeURIComponent(s)}/`:`article.html?slug=${encodeURIComponent(s)}`};
function addCss(){if(document.querySelector('#liveTipsCss'))return;const s=document.createElement('style');s.id='liveTipsCss';s.textContent=`
#tips.tips-updates{max-width:1180px;padding:58px 24px 64px}
#tips .tips-head{align-items:center;margin-bottom:24px}
#tips .tips-head h2{font-size:clamp(28px,3.2vw,40px);letter-spacing:.01em}
#tips .tips-head a{font-size:16px;color:#f97316}
#tips .tips-list{display:grid!important;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr)!important;gap:28px!important;border:0!important;border-radius:0!important;overflow:visible!important;background:transparent!important}
#tips .tips-featured{display:block;text-decoration:none;color:#0f172a;min-width:0}
#tips .tips-featured-media{aspect-ratio:16/9;border-radius:8px;overflow:hidden;background:#e2e8f0;margin-bottom:14px}
#tips .tips-featured-media img{width:100%;height:100%;object-fit:cover;display:block}
#tips .tips-featured-fallback{width:100%;height:100%;display:grid;place-items:center;font-size:72px;background:linear-gradient(135deg,#eff6ff,#f8fafc)}
#tips .tips-featured h3{margin:0;font-size:clamp(20px,2vw,28px);line-height:1.45;font-weight:700;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
#tips .tips-featured small{display:block;color:#0284c7;font-weight:800;font-size:13px;margin-bottom:6px}
#tips .tips-side{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px 18px;align-content:start}
#tips .tips-card{display:block;text-decoration:none;color:#0f172a;min-width:0}
#tips .tips-card-media{aspect-ratio:16/9;border-radius:7px;overflow:hidden;background:#e2e8f0;margin-bottom:10px}
#tips .tips-card-media img{width:100%;height:100%;object-fit:cover;display:block}
#tips .tips-card-fallback{width:100%;height:100%;display:grid;place-items:center;font-size:34px;background:#eff6ff}
#tips .tips-card small{display:block;color:#0284c7;font-weight:800;font-size:11px;margin-bottom:4px}
#tips .tips-card h3{margin:0;font-size:16px;line-height:1.55;font-weight:600;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
#tips .tips-live-note{padding:32px;color:#64748b;text-align:center;grid-column:1/-1}
@media(max-width:900px){#tips .tips-list{grid-template-columns:1fr!important}#tips .tips-side{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:600px){#tips.tips-updates{padding:44px 16px 48px}#tips .tips-head{margin-bottom:18px}#tips .tips-head h2{font-size:28px}#tips .tips-head a{font-size:14px}#tips .tips-list{gap:22px!important}#tips .tips-side{grid-template-columns:1fr 1fr;gap:18px 12px}#tips .tips-card h3{font-size:14px}#tips .tips-featured h3{font-size:20px}}
`;document.head.appendChild(s)}
const media=(a,featured=false)=>{const icon=icons[a.category]||'📝';if(a.coverUrl)return `<div class="${featured?'tips-featured-media':'tips-card-media'}"><img src="${esc(a.coverUrl)}" alt="${esc(a.title||'บทความ')}" loading="lazy"></div>`;return `<div class="${featured?'tips-featured-media':'tips-card-media'}"><div class="${featured?'tips-featured-fallback':'tips-card-fallback'}">${icon}</div></div>`};
async function mount(){const sec=document.querySelector('#tips');if(!sec)return false;addCss();const list=sec.querySelector('.tips-list');const all=sec.querySelector('.tips-head a');if(all){all.href='articles.html';all.textContent='ดูทั้งหมด >'}if(!list)return true;list.innerHTML='<div class="tips-live-note">กำลังโหลดบทความล่าสุด…</div>';try{const snap=await getDocs(query(collection(db,'articles'),where('status','==','published')));const rows=snap.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(b.publishedAt?.seconds||b.updatedAt?.seconds||0)-(a.publishedAt?.seconds||a.updatedAt?.seconds||0)).slice(0,7);if(!rows.length){list.innerHTML='<div class="tips-live-note">ยังไม่มีบทความที่เผยแพร่</div>';return true}const first=rows[0],rest=rows.slice(1);list.innerHTML=`<a class="tips-featured" href="${href(first)}">${media(first,true)}<small>${esc(first.category||'บทความ')}</small><h3>${esc(first.title||'บทความ')}</h3></a><div class="tips-side">${rest.map(a=>`<a class="tips-card" href="${href(a)}">${media(a)}<small>${esc(a.category||'บทความ')}</small><h3>${esc(a.title||'บทความ')}</h3></a>`).join('')}</div>`}catch(e){console.error('tips live articles',e);list.innerHTML='<div class="tips-live-note">ไม่สามารถโหลดบทความล่าสุดได้ในขณะนี้</div>'}return true}
if(!await mount()){let n=0;const t=setInterval(async()=>{if(await mount()||++n>40)clearInterval(t)},150)}
