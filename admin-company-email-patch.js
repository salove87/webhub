import{getApps}from'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import{getFirestore,doc,getDoc}from'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

const waitForApp=()=>new Promise(resolve=>{const tick=()=>{const app=getApps()[0];app?resolve(app):setTimeout(tick,60)};tick()});
const app=await waitForApp();
const db=getFirestore(app);
const emailCache=new Map();
let busy=false;

async function resolveEmail(uid){
  if(emailCache.has(uid))return emailCache.get(uid);
  let email='';
  try{
    const company=await getDoc(doc(db,'companies',uid));
    if(company.exists())email=company.data().contactEmail||company.data().email||'';
    if(!email){
      const user=await getDoc(doc(db,'users',uid));
      if(user.exists())email=user.data().email||'';
    }
  }catch(e){console.warn('company email lookup failed',e)}
  emailCache.set(uid,email);
  return email;
}

async function refreshCompanyEmails(){
  if(busy)return;
  busy=true;
  try{
    const rows=[...document.querySelectorAll('#content .row')];
    await Promise.all(rows.map(async row=>{
      const btn=row.querySelector('[data-company]');
      if(!btn)return;
      const uid=btn.dataset.company;
      const sub=row.querySelector('.sub');
      if(!uid||!sub)return;
      const email=await resolveEmail(uid);
      if(email)sub.textContent=email;
      else if(sub.textContent===uid)sub.textContent='ไม่พบอีเมลติดต่อ';
    }));
  }finally{busy=false}
}

const content=document.querySelector('#content');
if(content){
  const observer=new MutationObserver(()=>setTimeout(refreshCompanyEmails,0));
  observer.observe(content,{childList:true,subtree:true});
  refreshCompanyEmails();
}
