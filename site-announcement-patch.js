(()=>{
if(document.querySelector('#webhubAnnouncement'))return;
const KEY='webhub-announcement-seen-20260906-image-v1';
try{if(sessionStorage.getItem(KEY)==='1')return}catch{}
const style=document.createElement('style');style.textContent=`
#webhubAnnouncement{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:16px;background:rgba(2,6,23,.72);backdrop-filter:blur(8px)}
#webhubAnnouncement *{box-sizing:border-box}
#webhubAnnouncement .wh-image-wrap{position:relative;width:min(1380px,96vw);max-height:94vh;border-radius:24px;overflow:hidden;box-shadow:0 30px 100px rgba(0,0,0,.42);background:#0b3b70}
#webhubAnnouncement .wh-image{display:block;width:100%;height:auto;max-height:94vh;object-fit:contain;background:#0b3b70}
#webhubAnnouncement .wh-x{position:absolute;right:1.4%;top:1.8%;z-index:6;width:46px;height:46px;border-radius:50%;border:2px solid #fff;background:#172033;color:#fff;font:700 30px/1 Arial,sans-serif;display:grid;place-items:center;cursor:pointer;box-shadow:0 5px 18px rgba(0,0,0,.35)}
#webhubAnnouncement .wh-hotspot{position:absolute;z-index:5;border:0;background:transparent;cursor:pointer;color:transparent;font-size:0}
#webhubAnnouncement .wh-jobs{left:24.2%;bottom:5.7%;width:24.2%;height:9.9%}
#webhubAnnouncement .wh-post{left:49.8%;bottom:5.7%;width:23%;height:9.9%}
@media(max-width:700px){#webhubAnnouncement{padding:8px;align-items:center}#webhubAnnouncement .wh-image-wrap{width:100%;border-radius:16px;max-height:96vh}#webhubAnnouncement .wh-image{max-height:96vh}.wh-x{width:38px!important;height:38px!important;font-size:25px!important;right:1.5%!important;top:1.5%!important}}
`;document.head.appendChild(style);
const o=document.createElement('div');o.id='webhubAnnouncement';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-label','ประกาศ WebHub-Job');o.innerHTML=`<section class="wh-image-wrap"><img class="wh-image" src="./webhub-popup.png.png?v=20260906-1" alt="WebHub-Job ศูนย์รวมคนหางานทั่วประเทศไทย ค้นหางานง่าย ลงประกาศงานฟรี 100%"><button class="wh-x" id="whX" type="button" aria-label="ปิดประกาศ">×</button><button class="wh-hotspot wh-jobs" id="whJobs" type="button" aria-label="ค้นหางานเลย">ค้นหางานเลย</button><button class="wh-hotspot wh-post" id="whPost" type="button" aria-label="ลงประกาศงานฟรี">ลงประกาศงานฟรี</button></section>`;document.body.appendChild(o);
const close=()=>{try{sessionStorage.setItem(KEY,'1')}catch{}o.remove();style.remove()};
o.querySelector('#whX').onclick=close;
o.querySelector('#whJobs').onclick=()=>{close();location.hash='jobs';setTimeout(()=>document.querySelector('#jobs')?.scrollIntoView({behavior:'smooth',block:'start'}),40)};
o.querySelector('#whPost').onclick=()=>{close();setTimeout(()=>document.querySelector('[data-post-job]')?.click(),30)};
o.addEventListener('click',e=>{if(e.target===o)close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.querySelector('#webhubAnnouncement'))close()},{once:true});
})();