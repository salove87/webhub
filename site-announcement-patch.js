(()=>{
if(document.querySelector('#webhubAnnouncement'))return;
const KEY='webhub-announcement-seen-20260906';
try{if(sessionStorage.getItem(KEY)==='1')return}catch{}
const style=document.createElement('style');
style.textContent=`
#webhubAnnouncement{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:22px;background:rgba(2,6,23,.72);backdrop-filter:blur(10px)}
#webhubAnnouncement .wh-ann-card{width:min(940px,100%);max-height:min(90vh,860px);overflow:auto;background:linear-gradient(145deg,#fff 0%,#f8fbff 62%,#eff8ff 100%);border:1px solid rgba(125,211,252,.65);border-radius:30px;box-shadow:0 35px 110px rgba(2,6,23,.38);padding:38px;position:relative}
#webhubAnnouncement .wh-ann-kicker{display:inline-flex;align-items:center;gap:8px;padding:7px 13px;border-radius:999px;background:#e0f2fe;color:#0369a1;font-size:13px;font-weight:800;margin-bottom:14px}
#webhubAnnouncement h2{font-size:clamp(34px,6vw,64px);line-height:1.08;letter-spacing:-.035em;margin:0;color:#082f49}
#webhubAnnouncement h2 span{color:#0284c7}
#webhubAnnouncement .wh-ann-lead{font-size:clamp(17px,2.2vw,22px);line-height:1.75;color:#475569;margin:18px 0 22px;max-width:820px}
#webhubAnnouncement .wh-ann-highlight{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:22px 0}
#webhubAnnouncement .wh-ann-highlight>div{background:#fff;border:1px solid #dbe5ee;border-radius:18px;padding:18px}
#webhubAnnouncement .wh-ann-highlight b{display:block;color:#075985;font-size:20px;margin-bottom:4px}
#webhubAnnouncement .wh-ann-highlight span{color:#64748b;font-size:13px;line-height:1.6}
#webhubAnnouncement .wh-ann-points{display:grid;grid-template-columns:1fr 1fr;gap:10px 22px;padding:18px 20px;margin:18px 0;background:#082f49;color:#fff;border-radius:20px}
#webhubAnnouncement .wh-ann-points div{display:flex;gap:9px;align-items:flex-start;line-height:1.55;font-size:14px}
#webhubAnnouncement .wh-ann-points i{font-style:normal;color:#38bdf8;font-weight:900}
#webhubAnnouncement .wh-ann-goal{margin:18px 0;padding:16px 18px;border-left:4px solid #0ea5e9;background:#f0f9ff;border-radius:0 14px 14px 0;color:#0f172a;font-weight:700;line-height:1.7}
#webhubAnnouncement .wh-ann-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}
#webhubAnnouncement .wh-ann-actions button{border:0;border-radius:13px;min-height:48px;padding:0 20px;font:inherit;font-weight:800;cursor:pointer}
#webhubAnnouncement .wh-ann-post{background:#0284c7;color:#fff}
#webhubAnnouncement .wh-ann-jobs{background:#fff;color:#075985;border:1px solid #bae6fd!important}
#webhubAnnouncement .wh-ann-close{width:100%;margin-top:18px;background:#0f172a;color:#fff}
#webhubAnnouncement .wh-ann-note{text-align:center;color:#64748b;font-size:12px;margin-top:10px}
@media(max-width:700px){#webhubAnnouncement{padding:12px;align-items:flex-end}#webhubAnnouncement .wh-ann-card{padding:24px 18px 18px;border-radius:24px 24px 16px 16px;max-height:94vh}#webhubAnnouncement .wh-ann-highlight{grid-template-columns:1fr}#webhubAnnouncement .wh-ann-points{grid-template-columns:1fr}#webhubAnnouncement .wh-ann-actions{display:grid;grid-template-columns:1fr 1fr}#webhubAnnouncement .wh-ann-actions button{padding:0 12px}}
`;
document.head.appendChild(style);
const overlay=document.createElement('div');
overlay.id='webhubAnnouncement';
overlay.setAttribute('role','dialog');
overlay.setAttribute('aria-modal','true');
overlay.setAttribute('aria-labelledby','webhubAnnouncementTitle');
overlay.innerHTML=`<section class="wh-ann-card">
  <div class="wh-ann-kicker">🚀 ประกาศจาก WebHub Jobs</div>
  <h2 id="webhubAnnouncementTitle">โอกาสใหม่ของการหางานและหาคน<br><span>เริ่มต้นที่นี่ ฟรี 100%</span></h2>
  <p class="wh-ann-lead">WebHub Jobs เปิดพื้นที่ให้ผู้หางานและนายจ้างทั่วประเทศไทยเชื่อมต่อกันได้ง่ายขึ้น โปร่งใสขึ้น และเข้าถึงโอกาสได้มากขึ้น โดยผู้หางานใช้งานฟรี และนายจ้างสามารถลงประกาศรับสมัครงานได้ฟรี ไม่มีค่าลงประกาศ</p>
  <div class="wh-ann-highlight">
    <div><b>ลงประกาศฟรี</b><span>นายจ้างสร้างประกาศงานและส่งให้ทีมงานตรวจสอบก่อนเผยแพร่ได้โดยไม่เสียค่าใช้จ่าย</span></div>
    <div><b>สมัครงานฟรี</b><span>ผู้หางานค้นหา บันทึกตำแหน่ง สมัครงาน และติดตามโอกาสใหม่ได้โดยไม่มีค่าธรรมเนียม</span></div>
    <div><b>เชื่อมคนกับงาน</b><span>รวมตำแหน่งงานจากหลากหลายสายอาชีพ บริษัท และพื้นที่ทั่วประเทศไทยไว้ในจุดเดียว</span></div>
  </div>
  <div class="wh-ann-points">
    <div><i>✓</i><span>ประกาศงานผ่านขั้นตอนตรวจสอบก่อนแสดงสู่สาธารณะ</span></div>
    <div><i>✓</i><span>มีพื้นที่แยกชัดเจนสำหรับผู้หางานและนายจ้าง</span></div>
    <div><i>✓</i><span>รองรับการค้นหางานตามตำแหน่ง สายงาน รูปแบบงาน และจังหวัด</span></div>
    <div><i>✓</i><span>มีระบบบันทึกงาน สมัครงาน และจัดการผู้สมัครภายในแพลตฟอร์ม</span></div>
    <div><i>✓</i><span>เปิดโอกาสให้บริษัททุกขนาดเข้าถึงผู้สมัครได้ง่ายขึ้น</span></div>
    <div><i>✓</i><span>เน้นความปลอดภัย โปร่งใส และไม่เรียกเก็บเงินจากผู้สมัคร</span></div>
  </div>
  <div class="wh-ann-goal">เป้าหมายของ WebHub Jobs คือการเติบโตเป็นศูนย์รวมโอกาสการทำงานที่ดีที่สุดแห่งหนึ่งของประเทศไทย — พื้นที่ที่คนหางานเจองานที่ใช่ และนายจ้างเจอคนที่พร้อมเติบโตไปด้วยกัน</div>
  <div class="wh-ann-actions"><button class="wh-ann-post" type="button" id="whAnnPost">ลงประกาศงานฟรี</button><button class="wh-ann-jobs" type="button" id="whAnnJobs">ค้นหางานตอนนี้</button></div>
  <button class="wh-ann-close" type="button" id="whAnnClose">ปิดประกาศ และเข้าสู่เว็บไซต์</button>
  <div class="wh-ann-note">WebHub Jobs — งานที่ใช่ คนที่พร้อม</div>
</section>`;
document.body.appendChild(overlay);
const close=()=>{try{sessionStorage.setItem(KEY,'1')}catch{}overlay.remove();style.remove()};
overlay.querySelector('#whAnnClose').onclick=close;
overlay.querySelector('#whAnnJobs').onclick=()=>{close();location.hash='jobs';setTimeout(()=>document.querySelector('#jobs')?.scrollIntoView({behavior:'smooth',block:'start'}),40)};
overlay.querySelector('#whAnnPost').onclick=()=>{close();setTimeout(()=>document.querySelector('[data-post-job]')?.click(),30)};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.querySelector('#webhubAnnouncement'))close()},{once:true});
})();