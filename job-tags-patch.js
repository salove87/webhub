const form=document.querySelector('#postForm');
if(form){
  const hidden=document.createElement('input');hidden.type='hidden';hidden.name='tags';hidden.id='jobTagsValue';form.appendChild(hidden);
  const box=document.createElement('div');box.id='jobTagsPreview';box.style.cssText='margin:14px 0;padding:14px;border:1px solid #dbeafe;border-radius:12px;background:#f8fbff';box.innerHTML='<b style="display:block;margin-bottom:8px">แท็กที่เกี่ยวข้อง <span style="font-weight:400;color:#64748b">(สร้างอัตโนมัติ)</span></b><div data-tags style="display:flex;gap:7px;flex-wrap:wrap"></div>';
  const actions=form.querySelector('button[type="submit"]')?.parentElement||form.lastElementChild;actions?.insertAdjacentElement('beforebegin',box);
  const clean=s=>String(s||'').trim().replace(/\s+/g,' ');
  const make=()=>{
    const f=new FormData(form),raw=[f.get('title'),f.get('category')==='__other'?f.get('categoryOther'):f.get('category'),f.get('province'),f.get('district'),f.get('type'),f.get('industry')];
    const skills=clean(f.get('skills')).split(/[,，/|\n]+/).slice(0,4);
    const tags=[...raw,...skills].map(clean).filter(x=>x&&x!=='__other');
    const unique=[...new Map(tags.map(x=>[x.toLowerCase(),x])).values()].slice(0,10);
    hidden.value=unique.join('|');
    box.querySelector('[data-tags]').innerHTML=unique.length?unique.map(x=>`<span style="padding:6px 10px;border-radius:999px;background:#e0f2fe;color:#075985;font-size:13px">${x.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}</span>`).join(''):'<span style="color:#64748b;font-size:13px">กรอกข้อมูลตำแหน่งงาน แล้วระบบจะสร้างแท็กให้</span>';
  };
  form.addEventListener('input',make);form.addEventListener('change',make);make();
}
