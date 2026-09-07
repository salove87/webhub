import{initializeApp,getApp,getApps}from'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import{getFirestore,doc,getDoc,setDoc}from'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import{firebaseConfig}from'./firebase-config.js';
const app=getApps().length?getApp():initializeApp(firebaseConfig),db=getFirestore(app),$=s=>document.querySelector(s);
let mounted=false;
function addFields(){if(mounted||$('#focusKeyword'))return true;const actions=$('#editorWrap .card:nth-child(2) .actions');if(!actions)return false;const box=document.createElement('div');box.id='articleSeoExtra';box.innerHTML='<div class="field"><label>Focus Keyword</label><input id="focusKeyword" placeholder="คีย์เวิร์ดหลักของบทความ"><div class="note">ใช้สำหรับจัดเก็บข้อมูล SEO และตรวจสอบบทความ</div></div><div class="field"><label>Tags</label><input id="articleTags" placeholder="เช่น สมัครงาน, Resume, สัมภาษณ์งาน"><div class="note">คั่นแต่ละแท็กด้วยเครื่องหมายจุลภาค</div></div>';
actions.before(box);mounted=true;return true}
function tags(){return String($('#articleTags')?.value||'').split(/[,，|\n]+/).map(x=>x.trim()).filter(Boolean).slice(0,20)}
async function saveExtra(){const id=$('#slug')?.value?.trim();const msg=$('#msg')?.textContent||'';if(!id||!/บันทึกฉบับร่างแล้ว|เผยแพร่เรียบร้อย/.test(msg))return;await setDoc(doc(db,'articles',id),{focusKeyword:$('#focusKeyword')?.value?.trim()||'',tags:tags()},{merge:true})}
async function loadExtra(id){if(!id)return;try{const s=await getDoc(doc(db,'articles',id));if(!s.exists())return;const d=s.data();if($('#focusKeyword'))$('#focusKeyword').value=d.focusKeyword||'';if($('#articleTags'))$('#articleTags').value=Array.isArray(d.tags)?d.tags.join(', '):''}catch{}}
function wrapButton(id){const b=$(id);if(!b||b.dataset.seoWrapped)return;const original=b.onclick;if(typeof original!=='function')return;b.dataset.seoWrapped='1';b.onclick=async e=>{await original.call(b,e);try{await saveExtra()}catch(err){const m=$('#msg');if(m)m.textContent+=(m.textContent?' · ':'')+'บันทึก SEO เพิ่มเติมไม่สำเร็จ: '+err.message}}
}
function bindEdit(){const list=$('#list');if(!list||list.dataset.seoEditBound)return;list.dataset.seoEditBound='1';list.addEventListener('click',e=>{const b=e.target.closest('[data-edit]');if(!b)return;setTimeout(()=>loadExtra(b.dataset.edit),80)})}
function mount(){if(!addFields())return false;wrapButton('#draftBtn');wrapButton('#publishBtn');bindEdit();return true}
if(!mount()){let n=0;const t=setInterval(()=>{if(mount()||++n>80)clearInterval(t)},250)}
