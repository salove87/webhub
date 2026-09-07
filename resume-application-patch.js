import{getApp}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import{getAuth,onAuthStateChanged}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import{getFirestore,doc,getDoc,setDoc,collection,query,where,onSnapshot,serverTimestamp}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import{getStorage,ref,uploadBytes,getDownloadURL}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";

const app=getApp(),auth=getAuth(app),db=getFirestore(app),storage=getStorage(app);
const $=s=>document.querySelector(s);
const MAX_SIZE=3*1024*1024;
const TYPES=new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]);
let resumeFile=null,applicationData=null,currentJobId=new URLSearchParams(location.search).get('job')||new URLSearchParams(location.search).get('id')||'';
let stopEmployerResume=null,resumeApps=new Map();

const toast=m=>{const e=$('#toast');if(!e)return;e.textContent=m;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),3200)};
const safe=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const validFile=f=>!f||((TYPES.has(f.type)||/\.(pdf|doc|docx)$/i.test(f.name))&&f.size<=MAX_SIZE);
const extension=f=>{const m=String(f?.name||'').match(/\.(pdf|doc|docx)$/i);return m?m[1].toLowerCase():(f?.type==='application/pdf'?'pdf':'docx')};

const style=document.createElement('style');
style.textContent=`.resume-field{grid-column:1/-1;border:1px dashed #bae6fd;border-radius:12px;padding:14px;background:#f8fdff}.resume-field input{height:auto!important;padding:10px!important}.resume-help{display:block;margin-top:7px;color:#64748b;font-size:12px;font-weight:500}.resume-selected{display:block;margin-top:7px;color:#047857;font-size:12px;font-weight:700}.resume-download{border:0;border-radius:9px;padding:8px 11px;background:#e0f2fe;color:#0369a1;font:inherit;font-size:13px;font-weight:800;cursor:pointer}.resume-download:hover{background:#bae6fd}`;
document.head.appendChild(style);

document.addEventListener('click',e=>{
  const view=e.target.closest?.('[data-view]');
  if(view?.dataset.view)currentJobId=view.dataset.view;
},true);

function installForm(){
  const form=$('#applicationForm');
  if(!form||form.dataset.resumeReady==='1')return;
  form.dataset.resumeReady='1';
  const grid=form.querySelector('.apply-grid');
  if(!grid)return;
  const box=document.createElement('label');
  box.className='resume-field';
  box.innerHTML=`Resume / CV <span style="font-weight:500;color:#64748b">(ไม่บังคับ)</span><input id="resumeFileInput" name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"><small class="resume-help">รองรับ PDF, DOC, DOCX • ขนาดไม่เกิน 3 MB</small><small id="resumeSelected" class="resume-selected"></small>`;
  grid.appendChild(box);
  const oldNote=form.querySelector('.apply-note');
  if(oldNote)oldNote.innerHTML='คุณสามารถแนบ Resume เพื่อให้นายจ้างพิจารณาได้สะดวกขึ้น <b>ไม่บังคับแนบไฟล์</b>';
  const input=$('#resumeFileInput'),selected=$('#resumeSelected');
  if(resumeFile&&selected)selected.textContent=`ไฟล์ที่เลือกไว้: ${resumeFile.name} (${(resumeFile.size/1024/1024).toFixed(2)} MB)`;
  input?.addEventListener('change',()=>{
    const f=input.files?.[0]||null;
    if(f&&!validFile(f)){
      input.value='';resumeFile=null;
      toast(f.size>MAX_SIZE?'Resume ต้องมีขนาดไม่เกิน 3 MB':'รองรับเฉพาะไฟล์ PDF, DOC หรือ DOCX');
      if(selected)selected.textContent='';
      return;
    }
    resumeFile=f;
    if(selected)selected.textContent=f?`เลือกแล้ว: ${f.name} (${(f.size/1024/1024).toFixed(2)} MB)`:'';
  });
  form.addEventListener('submit',e=>{
    const f=input?.files?.[0]||resumeFile;
    if(f&&!validFile(f)){
      e.preventDefault();e.stopImmediatePropagation();
      toast(f.size>MAX_SIZE?'Resume ต้องมีขนาดไม่เกิน 3 MB':'รองรับเฉพาะไฟล์ PDF, DOC หรือ DOCX');
      return;
    }
    resumeFile=f||null;
    const fd=new FormData(form);
    applicationData=Object.fromEntries(fd);
    delete applicationData.resume;
  },true);
}

function installReview(){
  const confirm=$('#confirmApplication');
  if(!confirm||confirm.dataset.resumeReady==='1')return;
  confirm.dataset.resumeReady='1';
  const box=$('#applicationContent .review-box');
  if(box&&!box.querySelector('[data-resume-review]')){
    const row=document.createElement('div');row.className='review-row';row.dataset.resumeReview='1';
    row.innerHTML=`<b>Resume / CV</b><div>${resumeFile?`${safe(resumeFile.name)} · ${(resumeFile.size/1024/1024).toFixed(2)} MB`:'ไม่ได้แนบไฟล์'}</div>`;
    box.appendChild(row);
  }
  const note=$('#applicationContent .apply-note');
  if(note)note.innerHTML=resumeFile?'ระบบจะอัปโหลด Resume พร้อมกับใบสมัคร และส่งให้นายจ้างของตำแหน่งนี้':'ไม่ได้แนบ Resume — คุณยังสามารถส่งใบสมัครได้ตามปกติ';
}

async function submitWithResume(e){
  const btn=e.target.closest?.('#confirmApplication');
  if(!btn||!resumeFile)return;
  e.preventDefault();e.stopImmediatePropagation();
  const u=auth.currentUser;
  if(!u||!currentJobId||!applicationData){toast('ไม่สามารถแนบ Resume ได้ กรุณากลับไปกรอกใบสมัครใหม่');return}
  if(!validFile(resumeFile)){toast('Resume ไม่ถูกต้องหรือมีขนาดเกิน 3 MB');return}
  btn.disabled=true;btn.textContent='กำลังอัปโหลด Resume…';
  try{
    const js=await getDoc(doc(db,'jobs',currentJobId));
    if(!js.exists()||js.data().status!=='published')throw new Error('job-not-found');
    const job={id:js.id,...js.data()};
    const applicationId=`${job.id}_${u.uid}`;
    const resumePath=`resumes/${u.uid}/${applicationId}/resume.${extension(resumeFile)}`;
    await uploadBytes(ref(storage,resumePath),resumeFile,{contentType:resumeFile.type||'application/octet-stream'});
    btn.textContent='กำลังส่งใบสมัคร…';
    await setDoc(doc(db,'applications',applicationId),{
      jobId:job.id,jobTitle:job.title||'',companyId:job.employerId,companyName:job.companyName||'',employerEmail:job.contactEmail||'',
      candidateId:u.uid,candidateName:applicationData.candidateName||'',phone:applicationData.phone||'',email:applicationData.email||u.email||'',
      age:Number(applicationData.age)||0,experience:applicationData.experience||'',education:applicationData.education||'',status:'submitted',
      resumePath,resumeName:resumeFile.name,resumeSize:resumeFile.size,resumeType:resumeFile.type||'',createdAt:serverTimestamp(),updatedAt:serverTimestamp()
    });
    resumeFile=null;applicationData=null;
    const d=$('#applicationDialog');if(d?.open)d.close();
    const jd=$('#jobDialog');if(jd?.open)jd.close();
    document.body.classList.remove('portal-employer');document.body.classList.add('portal-candidate');location.hash='jobs';
    setTimeout(()=>document.querySelector('#jobs')?.scrollIntoView({behavior:'smooth',block:'start'}),50);
    toast('✓ ส่งใบสมัครพร้อม Resume เรียบร้อยแล้ว');
  }catch(err){
    console.error(err);btn.disabled=false;btn.textContent='ยืนยันสมัครงาน';
    const code=err?.code||'';
    toast(code.includes('storage/unauthorized')?'อัปโหลด Resume ไม่ได้ กรุณาตรวจสอบ Firebase Storage Rules':'ส่งใบสมัครไม่สำเร็จ กรุณาลองใหม่');
  }
}
document.addEventListener('click',submitWithResume,true);

function decorateEmployerResumes(){
  document.querySelectorAll('.applicant-card').forEach(card=>{
    const select=card.querySelector('[data-app-status]');const id=select?.dataset.appStatus;if(!id)return;
    const data=resumeApps.get(id);let old=card.querySelector('[data-resume-download]');
    if(!data?.resumePath){old?.remove();return}
    if(old)return;
    const status=card.querySelector('.applicant-status');if(!status)return;
    const b=document.createElement('button');b.type='button';b.className='resume-download';b.dataset.resumeDownload=id;b.textContent='📄 ดู Resume';b.title=data.resumeName||'Resume';
    b.onclick=async()=>{const w=window.open('about:blank','_blank');try{const url=await getDownloadURL(ref(storage,data.resumePath));if(w)w.location.href=url;else location.href=url}catch(err){if(w)w.close();toast('เปิด Resume ไม่สำเร็จ กรุณาตรวจสอบสิทธิ์ไฟล์')}};
    status.appendChild(b);
  });
}
new MutationObserver(decorateEmployerResumes).observe(document.body,{childList:true,subtree:true});

onAuthStateChanged(auth,async u=>{
  if(stopEmployerResume){stopEmployerResume();stopEmployerResume=null}resumeApps.clear();
  if(!u)return;
  try{
    const ps=await getDoc(doc(db,'users',u.uid));if(!ps.exists()||ps.data().role!=='employer')return;
    stopEmployerResume=onSnapshot(query(collection(db,'applications'),where('companyId','==',u.uid)),snap=>{
      resumeApps=new Map(snap.docs.map(d=>[d.id,d.data()]));decorateEmployerResumes();
    });
  }catch(e){console.warn(e)}
});

const content=$('#applicationContent');if(content)new MutationObserver(()=>{installForm();installReview()}).observe(content,{childList:true,subtree:true});
installForm();installReview();
