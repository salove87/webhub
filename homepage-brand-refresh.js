(()=>{
  const logoSvg=`<svg viewBox="0 0 92 72" aria-hidden="true" focusable="false"><defs><linearGradient id="wha" x1="0" x2="1"><stop offset="0" stop-color="#0ea5e9"/><stop offset="1" stop-color="#075985"/></linearGradient><linearGradient id="whb" x1="0" x2="1"><stop offset="0" stop-color="#075985"/><stop offset="1" stop-color="#ff7a00"/></linearGradient></defs><circle cx="18" cy="13" r="8" fill="#0ea5e9"/><circle cx="74" cy="13" r="8" fill="#ff7a00"/><path d="M10 27c0-7 5-11 11-11s10 4 12 9l13 28 13-28c2-5 6-9 12-9s11 4 11 11L70 52c-2 6-6 10-12 10-5 0-9-3-12-8L34 34 23 54c-3 5-7 8-12 8-6 0-10-4-12-10z" fill="url(#wha)" opacity=".98"/><path d="M36 43l10 11 12-20 8 17c2 4 5 7 9 8-2 2-5 3-8 3-5 0-9-3-12-8L46 40z" fill="url(#whb)"/><g transform="translate(34 2)"><rect x="5" y="10" width="24" height="15" rx="3" fill="#073763"/><path d="M11 10V7c0-3 2-5 5-5h2c3 0 5 2 5 5v3" fill="none" stroke="#073763" stroke-width="3"/><path d="M5 17h24" stroke="#fff" stroke-width="1.5"/><circle cx="17" cy="17" r="2" fill="#fff"/><path d="M1 4l-3-3M17-2v-5M33 4l3-3" stroke="#ff7a00" stroke-width="3" stroke-linecap="round"/></g></svg>`;
  const brandHtml=`<span class="wh-brandmark">${logoSvg}</span><span class="wh-brandtext"><strong>WebHub</strong> <em>Jobs</em><small>หางานที่ใช่ ให้ชีวิตคุณไปไกลกว่าเดิม</small></span>`;

  function replaceBrands(){
    document.querySelectorAll('a.brand').forEach(a=>{a.innerHTML=brandHtml;a.classList.add('wh-brand')});
  }

  function refreshHero(){
    const hero=document.querySelector('#home.hero');
    if(!hero||hero.dataset.brandRefresh)return;
    hero.dataset.brandRefresh='1';
    const copy=hero.querySelector('.hero-copy');
    if(copy){
      const eye=copy.querySelector('.eyebrow'); if(eye)eye.textContent='รวมโอกาสงานจากบริษัทที่น่าเชื่อถือ';
      const h=copy.querySelector('h1'); if(h)h.innerHTML='หางานที่ใช่<br><mark>ให้ชีวิตคุณไปไกลกว่าเดิม</mark>';
      const p=copy.querySelector('p'); if(p)p.textContent='ค้นหางานง่าย สมัครได้ทันที พร้อมอีกพื้นที่สำหรับนายจ้างที่ต้องการคนคุณภาพ';
      const kw=document.querySelector('#heroKeyword');if(kw)kw.placeholder='ค้นหาตำแหน่งงาน หรือชื่อบริษัท';
      const loc=document.querySelector('#heroLocation');if(loc)loc.placeholder='ทุกจังหวัด';
      const submit=copy.querySelector('.hero-search button[type="submit"]');if(submit)submit.textContent='ค้นหางาน';
    }
    const aside=hero.querySelector('.trust-card');
    if(aside){
      aside.className='wh-hero-visual';
      aside.innerHTML=`<div class="wh-orbit wh-orbit-a"></div><div class="wh-orbit wh-orbit-b"></div><div class="wh-visual-logo">${logoSvg}</div><div class="wh-visual-copy"><span>งานดี · อนาคตดี</span><strong>โอกาสใหม่<br>รอคุณอยู่</strong><small>เริ่มต้นได้ที่ WebHub Jobs</small></div>`;
    }
    if(!document.querySelector('.wh-benefit-strip')){
      const strip=document.createElement('section');
      strip.className='wh-benefit-strip';
      strip.innerHTML=`<div><b>⌕</b><span><strong>ค้นหางาน</strong><small>ง่าย ครบ ทั่วไทย</small></span></div><div><b>▥</b><span><strong>ลงประกาศงาน</strong><small>ฟรี สำหรับนายจ้าง</small></span></div><div><b>●●●</b><span><strong>บริษัทที่น่าเชื่อถือ</strong><small>คัดสรรงานคุณภาพ</small></span></div><div><b>✓</b><span><strong>ปลอดภัย</strong><small>ดูแลข้อมูลของคุณ</small></span></div>`;
      hero.insertAdjacentElement('afterend',strip);
    }
  }

  const style=document.createElement('style');
  style.dataset.webhubHomepageBrand='1';
  style.textContent=`
  :root{--wh-blue:#075985;--wh-blue2:#0b72d9;--wh-orange:#ff7a00;--wh-ink:#082f49}
  .topbar{background:rgba(255,255,255,.96)!important;backdrop-filter:blur(14px);border-bottom:1px solid #e7eef7!important;box-shadow:0 5px 20px rgba(7,89,133,.05)}
  .wh-brand{display:flex!important;align-items:center!important;gap:9px!important;text-decoration:none!important;min-width:max-content}.wh-brandmark{display:inline-flex;width:50px;height:42px}.wh-brandmark svg{width:100%;height:100%}.wh-brandtext{display:flex;align-items:baseline;gap:4px;font-size:22px;line-height:1;color:var(--wh-blue);font-weight:800}.wh-brandtext strong{font:inherit}.wh-brandtext em{font-style:normal;color:var(--wh-orange)}.wh-brandtext small{display:block;position:absolute;margin-top:25px;font-size:8px;font-weight:600;color:#37556d;letter-spacing:0;white-space:nowrap}
  #home.hero{max-width:none!important;margin:0!important;padding:58px max(5vw,24px) 48px!important;min-height:520px;display:grid!important;grid-template-columns:minmax(0,1.15fr) minmax(360px,.85fr)!important;gap:42px!important;align-items:center!important;background:linear-gradient(120deg,#f5fbff 0%,#eaf5ff 57%,#dbeeff 100%)!important;border-radius:0!important;overflow:hidden;position:relative}
  #home.hero:before{content:"";position:absolute;inset:auto -80px -140px auto;width:430px;height:430px;border-radius:50%;background:rgba(14,165,233,.08)}
  #home .hero-copy{max-width:760px;position:relative;z-index:2}.eyebrow{color:var(--wh-blue)!important;font-weight:700!important}.hero-copy h1{font-size:clamp(38px,5vw,66px)!important;line-height:1.16!important;letter-spacing:-.03em!important;color:#082f49!important;margin:12px 0 18px!important}.hero-copy h1 mark{background:none!important;color:var(--wh-blue)!important}.hero-copy>p{font-size:19px!important;line-height:1.8!important;color:#36576f!important;max-width:680px}
  .hero-search{background:#fff!important;border:1px solid #dbe8f4!important;border-radius:14px!important;padding:6px!important;box-shadow:0 16px 36px rgba(7,89,133,.12)!important;display:grid!important;grid-template-columns:1.2fr .8fr auto!important;gap:4px!important}.hero-search label{border:0!important;background:#fff!important}.hero-search button{background:linear-gradient(135deg,#ff8a00,#ff6a00)!important;border-color:#ff7a00!important;min-width:140px}.quick button{background:#fff!important;border-color:#dbe8f4!important;color:#27516b!important}
  .wh-hero-visual{position:relative;min-height:390px;border-radius:30px;background:linear-gradient(145deg,#ffffff 0%,#edf7ff 58%,#d9efff 100%);box-shadow:0 28px 70px rgba(7,89,133,.16);overflow:hidden;display:flex;align-items:center;justify-content:center;padding:38px}.wh-visual-logo{width:240px;position:absolute;left:26px;top:28px;opacity:.12;transform:rotate(-8deg)}.wh-visual-logo svg{width:100%;height:auto}.wh-visual-copy{position:relative;z-index:2;margin-left:auto;max-width:260px;text-align:right}.wh-visual-copy span{display:block;color:var(--wh-orange);font-weight:800;font-size:18px;margin-bottom:12px}.wh-visual-copy strong{display:block;color:var(--wh-blue);font-size:42px;line-height:1.18;letter-spacing:-.03em}.wh-visual-copy small{display:inline-block;margin-top:18px;background:#fff;padding:9px 13px;border-radius:999px;color:#526d7f;font-weight:700;box-shadow:0 7px 18px rgba(7,89,133,.09)}.wh-orbit{position:absolute;border-radius:50%;border:26px solid rgba(14,165,233,.12)}.wh-orbit-a{width:320px;height:320px;left:-90px;bottom:-120px}.wh-orbit-b{width:230px;height:230px;right:-80px;top:-70px;border-color:rgba(255,122,0,.12)}
  .wh-benefit-strip{max-width:none;margin:0;padding:22px max(5vw,24px);display:grid;grid-template-columns:repeat(4,1fr);background:#fff;border-bottom:1px solid #edf2f7;box-shadow:0 10px 24px rgba(15,58,84,.04)}.wh-benefit-strip>div{display:flex;align-items:center;justify-content:center;gap:13px;padding:6px 18px;border-right:1px solid #e8eef3}.wh-benefit-strip>div:last-child{border-right:0}.wh-benefit-strip b{font-size:26px;color:var(--wh-blue2);min-width:32px;text-align:center}.wh-benefit-strip>div:nth-child(2) b{color:var(--wh-orange)}.wh-benefit-strip span{display:flex;flex-direction:column}.wh-benefit-strip strong{font-size:15px;color:#123f5d}.wh-benefit-strip small{font-size:12px;color:#73889a;margin-top:2px}
  .audience{margin-top:28px!important}.section{scroll-margin-top:90px}
  @media(max-width:900px){#home.hero{grid-template-columns:1fr!important;padding-top:42px!important}.wh-hero-visual{min-height:280px}.wh-visual-copy{max-width:220px}.wh-visual-copy strong{font-size:34px}.wh-benefit-strip{grid-template-columns:repeat(2,1fr)}.wh-benefit-strip>div:nth-child(2){border-right:0}.wh-benefit-strip>div:nth-child(-n+2){border-bottom:1px solid #eef2f6}}
  @media(max-width:620px){.wh-brandmark{width:38px;height:34px}.wh-brandtext{font-size:18px}.wh-brandtext small{font-size:6.5px;margin-top:21px}.topbar{padding-left:12px!important;padding-right:12px!important}#home.hero{padding:32px 18px 30px!important;min-height:auto!important;gap:24px!important}.hero-copy h1{font-size:36px!important}.hero-copy>p{font-size:16px!important}.hero-search{grid-template-columns:1fr!important}.hero-search label{min-height:48px}.hero-search button{width:100%}.wh-hero-visual{min-height:220px;border-radius:22px;padding:24px}.wh-visual-copy{max-width:190px}.wh-visual-copy span{font-size:14px}.wh-visual-copy strong{font-size:30px}.wh-visual-copy small{font-size:11px}.wh-visual-logo{width:160px;left:-10px;top:38px}.wh-benefit-strip{padding:10px 12px;gap:0}.wh-benefit-strip>div{padding:12px 6px;gap:7px}.wh-benefit-strip b{font-size:20px;min-width:24px}.wh-benefit-strip strong{font-size:12px}.wh-benefit-strip small{font-size:10px}}
  `;
  document.head.appendChild(style);
  replaceBrands();refreshHero();
  const mo=new MutationObserver(()=>{replaceBrands();refreshHero()});mo.observe(document.documentElement,{childList:true,subtree:true});
})();