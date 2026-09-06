(()=>{
const $=s=>document.querySelector(s);
let reloading=false,observerBusy=false;
function ensurePublishedCard(){
  if($('#publishedArticlesCard'))return $('#publishedArticlesCard');
  const list=$('#list');if(!list)return null;
  const sourceCard=list.closest('.card');if(!sourceCard)return null;
  const h=sourceCard.querySelector('h3');if(h)h.textContent='ฉบับร่างในระบบ';
  const card=document.createElement('div');card.id='publishedArticlesCard';card.className='card';
  card.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap"><div><h3 style="margin:0">บทความที่เผยแพร่แล้วทั้งหมด</h3><div class="note">รายการบทความที่เผยแพร่บน WebHub Jobs</div></div><button class="btn muted" id="refreshPublishedArticles" type="button">โหลดใหม่</button></div><div id="publishedArticlesList" style="margin-top:8px"><div class="note">กำลังโหลด...</div></div>';
  sourceCard.after(card);
  $('#refreshPublishedArticles').onclick=()=>location.reload();
  return card;
}
function splitRows(){
  if(observerBusy)return;observerBusy=true;
  try{
    const list=$('#list'),card=ensurePublishedCard(),pub=$('#publishedArticlesList');if(!list||!card||!pub)return;
    const rows=[...list.querySelectorAll(':scope > .row')];
    const published=rows.filter(r=>r.querySelector('.status.published'));
    const drafts=rows.filter(r=>!r.querySelector('.status.published'));
    pub.innerHTML='';
    published.forEach(r=>pub.appendChild(r));
    if(!published.length)pub.innerHTML='<div class="note">ยังไม่มีบทความที่เผยแพร่</div>';
    if(!drafts.length)list.innerHTML='<div class="note">ไม่มีฉบับร่างค้างอยู่ ✓</div>';
  }finally{observerBusy=false}
}
function publishSucceeded(){
  const msg=$('#msg');if(!msg)return false;
  return /เผยแพร่เรียบร้อย/.test(msg.textContent||'');
}
function reloadAfterPublish(){
  if(reloading||!publishSucceeded())return;
  reloading=true;
  $('#editorWrap')?.classList.add('hidden');
  const managedReload=$('#reloadManagedDrafts');if(managedReload)managedReload.click();
  setTimeout(()=>location.reload(),350);
}
function mount(){
  const list=$('#list');if(!list)return false;
  ensurePublishedCard();splitRows();
  new MutationObserver(()=>{setTimeout(()=>{splitRows();reloadAfterPublish()},30)}).observe(list,{childList:true,subtree:true});
  const msg=$('#msg');if(msg)new MutationObserver(()=>reloadAfterPublish()).observe(msg,{childList:true,subtree:true,characterData:true});
  return true;
}
if(!mount()){let n=0;const t=setInterval(()=>{if(mount()||++n>80)clearInterval(t)},250)}
})();
