import{getApps}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import{getFirestore,doc,getDoc}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const boot=()=>{
  const app=getApps()[0];if(!app)return setTimeout(boot,250);
  const db=getFirestore(app),$=s=>document.querySelector(s);

  const style=document.createElement('style');style.textContent=`
  .job-extra-box{margin:12px 0 4px;padding:14px;border:1px solid #dbe5ee;border-radius:14px;background:#f8fafc}
  .job-extra-title{font-weight:800;margin-bottom:9px;color:#0f172a}.job-extra-options{display:flex;gap:10px;flex-wrap:wrap}
  .job-extra-option{display:flex!important;align-items:center;gap:7px;border:1px solid #cbd5e1;border-radius:999px;padding:8px 11px;background:#fff;cursor:pointer;font-weight:700;font-size:13px}
  .job-extra-option input{width:16px!important;height:16px!important;margin:0!important}.job-extra-help{font-size:12px;color:#64748b;margin-top:8px}
  .job-attract-tags{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0 2px}.job-attract-tag{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;font-size:11px;font-weight:800}
  .job-attract-tag.urgent{background:#fee2e2;color:#b91c1c}.job-attract-tag.commission{background:#ecfccb;color:#3f6212}.job-attract-tag.negotiable{background:#e0f2fe;color:#075985}
  `;document.head.appendChild(style);

  const f=$('#postForm');if(!f)return;
  const salaryMin=f.elements?.salaryMin,salaryMax=f.elements?.salaryMax;
  if(!salaryMin&&!salaryMax)return;

  const hidden=(name)=>{let el=f.elements?.[name];if(!el){el=document.createElement('input');el.type='hidden';el.name=name;el.value='false';f.appendChild(el)}return el};
  const hNegotiable=hidden('salaryNegotiable'),hUrgent=hidden('urgent'),hCommission=hidden('hasCommission');

  const box=document.createElement('div');box.className='job-extra-box';box.innerHTML=`<div class="job-extra-title">เพิ่มความน่าสนใจให้ประกาศ</div><div class="job-extra-options"><label class="job-extra-option"><input type="checkbox" id="salaryNegotiableToggle"> เงินเดือนตามตกลง</label><label class="job-extra-option"><input type="checkbox" id="urgentToggle"> 🔥 รับด่วน</label><label class="job-extra-option"><input type="checkbox" id="commissionToggle"> 💰 มีค่าคอมมิชชั่น</label></div><div class="job-extra-help">ป้ายเหล่านี้จะแสดงบนตำแหน่งงานเพื่อช่วยให้ผู้สมัครเห็นจุดเด่นได้เร็วขึ้น</div>`;
  const salaryAnchor=(salaryMax?.closest('label,div')||salaryMin?.closest('label,div')||salaryMax||salaryMin);salaryAnchor?.parentElement?.insertBefore(box,salaryAnchor.nextSibling);

  const neg=$('#salaryNegotiableToggle'),urg=$('#urgentToggle'),com=$('#commissionToggle');
  function syncSalary(){const on=neg.checked;hNegotiable.value=String(on);[salaryMin,salaryMax].forEach(el=>{if(!el)return;el.disabled=on;if(on)el.value='';el.style.opacity=on?'.55':'1'});}
  neg.onchange=syncSalary;urg.onchange=()=>hUrgent.value=String(urg.checked);com.onchange=()=>hCommission.value=String(com.checked);
  const syncFromHidden=()=>{neg.checked=hNegotiable.value==='true';urg.checked=hUrgent.value==='true';com.checked=hCommission.value==='true';syncSalary()};
  const dialog=$('#postDialog');if(dialog)new MutationObserver(()=>{if(dialog.open)setTimeout(syncFromHidden,0)}).observe(dialog,{attributes:true,attributeFilter:['open']});
  f.addEventListener('reset',()=>setTimeout(()=>{hNegotiable.value=hUrgent.value=hCommission.value='false';syncFromHidden()},0));
  f.addEventListener('submit',()=>{hNegotiable.value=String(neg.checked);hUrgent.value=String(urg.checked);hCommission.value=String(com.checked);if(neg.checked){if(salaryMin){salaryMin.disabled=false;salaryMin.value='0'}if(salaryMax){salaryMax.disabled=false;salaryMax.value='0'}}},true);

  async function decorate(){const cards=[...document.querySelectorAll('#jobsGrid .job-card')];for(const card of cards){if(card.querySelector('.job-attract-tags'))continue;const id=card.querySelector('[data-view]')?.dataset.view;if(!id)continue;try{const s=await getDoc(doc(db,'jobs',id));if(!s.exists())continue;const j=s.data(),tags=[];if(j.urgent===true||j.urgent==='true')tags.push('<span class="job-attract-tag urgent">🔥 รับด่วน</span>');if(j.hasCommission===true||j.hasCommission==='true')tags.push('<span class="job-attract-tag commission">💰 มีค่าคอมมิชชั่น</span>');if(j.salaryNegotiable===true||j.salaryNegotiable==='true')tags.push('<span class="job-attract-tag negotiable">เงินเดือนตามตกลง</span>');if(tags.length){const wrap=document.createElement('div');wrap.className='job-attract-tags';wrap.innerHTML=tags.join('');const salary=card.querySelector('.salary');salary?.insertAdjacentElement('beforebegin',wrap)}}catch{}}
  }
  decorate();new MutationObserver(()=>decorate()).observe($('#jobsGrid')||document.body,{childList:true,subtree:true});
};boot();
