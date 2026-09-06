import{getApp}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import{getAuth}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import{getFirestore,collection,getDocs,doc,getDoc,deleteDoc}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const app=getApp(),auth=getAuth(app),db=getFirestore(app);
const $=s=>document.querySelector(s);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
const money=n=>new Intl.NumberFormat("th-TH").format(Number(n)||0);
const salary=j=>j.salaryMin||j.salaryMax?`${j.salaryMin?money(j.salaryMin):"ไม่ระบุ"} – ${j.salaryMax?money(j.salaryMax):"ไม่ระบุ"} บาท`:"ตามตกลง";

const css=document.createElement('style');
css.textContent=`.jobs-head-actions{display:flex;align-items:center;gap:9px}.saved-jobs-btn{white-space:nowrap}.saved-jobs-btn svg{width:18px;height:18px;vertical-align:-3px;margin-right:5px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}#savedJobsDialog{width:min(780px,calc(100% - 24px));max-height:88vh;overflow:auto}.saved-list{display:grid;gap:10px;margin-top:16px}.saved-row{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center;padding:15px;border:1px solid #e2e8f0;border-radius:14px}.saved-row h3{margin:0 0 5px;font-size:17px}.saved-meta{color:#64748b;font-size:13px;line-height:1.6}.saved-salary{color:#059669;font-weight:800;margin-top:5px}.saved-actions{display:flex;gap:8px;align-items:center}.saved-actions a{text-decoration:none}.saved-remove{color:#b91c1c;background:#fff;border:1px solid #fecaca}@media(max-width:600px){.jobs-head-actions{gap:6px}.saved-jobs-btn{font-size:12px;padding:0 10px}.saved-jobs-btn svg{margin-right:3px}.saved-row{grid-template-columns:1fr}.saved-actions{justify-content:flex-start}}`;
document.head.appendChild(css);

function installButton(){const reset=$('#resetFilters');if(!reset||$('#savedJobsBtn'))return;const wrap=document.createElement('div');wrap.className='jobs-head-actions';reset.parentNode.insertBefore(wrap,reset);const saved=document.createElement('button');saved.type='button';saved.id='savedJobsBtn';saved.className='btn ghost saved-jobs-btn';saved.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-3.75L6 21V4.75Z"/></svg>งานที่บันทึก';wrap.append(saved,reset);saved.onclick=openSavedJobs}

const dialog=document.createElement('dialog');dialog.id='savedJobsDialog';dialog.innerHTML='<button class="close" type="button" id="closeSavedJobs">×</button><div><span class="kicker">ผู้หางาน</span><h2 style="margin:6px 0 2px">งานที่บันทึกไว้</h2><p style="margin:0;color:#64748b">ตำแหน่งงานที่คุณกดบันทึกไว้ก่อนหน้า</p><div id="savedJobsList" class="saved-list"><div class="empty">กำลังโหลด...</div></div></div>';
document.body.appendChild(dialog);$('#closeSavedJobs').onclick=()=>dialog.close();

async function candidateProfile(){const u=auth.currentUser;if(!u)return null;const s=await getDoc(doc(db,'users',u.uid));return s.exists()?s.data():null}
function jobUrl(id){return window.WebHubJobShare?.urlFor?.(id)||`${location.origin}${location.pathname}?job=${encodeURIComponent(id)}#jobs`}
async function loadSavedJobs(){const u=auth.currentUser,box=$('#savedJobsList');if(!u)return;box.innerHTML='<div class="empty">กำลังโหลดงานที่บันทึกไว้...</div>';try{const saved=await getDocs(collection(db,'users',u.uid,'savedJobs'));if(saved.empty){box.innerHTML='<div class="empty">ยังไม่มีงานที่บันทึกไว้</div>';return}const jobs=(await Promise.all(saved.docs.map(async s=>{const id=s.id,j=await getDoc(doc(db,'jobs',id));return j.exists()?{id,...j.data()}:null}))).filter(Boolean);if(!jobs.length){box.innerHTML='<div class="empty">งานที่เคยบันทึกไม่มีอยู่ในระบบแล้ว</div>';return}box.innerHTML=jobs.map(j=>`<article class="saved-row"><div><h3>${esc(j.title||'ตำแหน่งงาน')}</h3><div class="saved-meta">${esc(j.companyName||'')}${j.province?` · ${esc(j.province)}`:''}${j.type?` · ${esc(j.type)}`:''}</div><div class="saved-salary">${esc(salary(j))}</div></div><div class="saved-actions"><a class="btn primary" target="_blank" rel="noopener noreferrer" href="${esc(jobUrl(j.id))}">ดูรายละเอียด</a><button class="btn saved-remove" type="button" data-remove-saved="${esc(j.id)}">ลบออก</button></div></article>`).join('');box.querySelectorAll('[data-remove-saved]').forEach(b=>b.onclick=async()=>{b.disabled=true;try{await deleteDoc(doc(db,'users',u.uid,'savedJobs',b.dataset.removeSaved));await loadSavedJobs()}catch{b.disabled=false;alert('ลบงานที่บันทึกไว้ไม่สำเร็จ กรุณาลองใหม่')}})}catch(e){box.innerHTML='<div class="empty">โหลดงานที่บันทึกไว้ไม่สำเร็จ กรุณาลองใหม่</div>'}}

async function openSavedJobs(){const u=auth.currentUser;if(!u){$('#candidateEntry')?.click();return}const p=await candidateProfile();if(p?.role!=="candidate"){alert('เมนูงานที่บันทึกไว้สำหรับบัญชีผู้หางาน');return}dialog.showModal();loadSavedJobs()}

installButton();
