const $=s=>document.querySelector(s);
let manifest=[];
let ready=fetch('./jobs-static.json?ts='+Date.now()).then(r=>r.ok?r.json():[]).then(x=>manifest=Array.isArray(x)?x:[]).catch(()=>manifest=[]);
function rowFor(id){return manifest.find(x=>x&&x.id===id)}
function urlFor(id){const r=rowFor(id);return r?.slug?`${location.origin}/jobs/${encodeURIComponent(r.slug)}/`:null}
function toast(m){const e=$('#toast');if(!e)return;e.textContent=m;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2600)}
async function shareJob(id,title='ตำแหน่งงาน'){await ready;const url=urlFor(id);if(!url){toast('ลิงก์แชร์กำลังสร้าง กรุณาลองอีกครั้งในอีกสักครู่');return}try{if(navigator.share){await navigator.share({title:`${title} | WebHub Jobs`,url});return}}catch(e){if(e?.name==='AbortError')return}try{await navigator.clipboard.writeText(url);toast('คัดลอกลิงก์งานแล้ว')}catch{window.prompt('คัดลอกลิงก์งานนี้',url)}}
function enhance(){const detail=$('#jobDetail');if(!detail)return;const apply=$('#applyBtn');if(!apply||$('#shareJobBtn'))return;const dialog=$('#jobDialog');const id=dialog?.dataset?.jobId||apply.dataset.jobId;if(!id)return;const title=detail.querySelector('h2')?.textContent?.trim()||'ตำแหน่งงาน';const b=document.createElement('button');b.type='button';b.id='shareJobBtn';b.className='btn ghost wide';b.style.marginTop='8px';b.textContent='แชร์งานนี้';b.onclick=()=>shareJob(id,title);apply.insertAdjacentElement('afterend',b)}
const detail=$('#jobDetail');if(detail)new MutationObserver(enhance).observe(detail,{childList:true,subtree:true});
document.addEventListener('click',async e=>{const v=e.target.closest?.('[data-view]');if(!v)return;const id=v.dataset.view;await ready;const url=urlFor(id);if(url){e.preventDefault();e.stopImmediatePropagation();location.href=url;return}const dialog=$('#jobDialog');if(dialog)dialog.dataset.jobId=id;setTimeout(()=>{const a=$('#applyBtn');if(a)a.dataset.jobId=id;enhance()},0)},true);
window.WebHubJobShare={urlFor,shareJob};