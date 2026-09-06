(()=>{
  const HEADER_LOGO='assets/brand/webhub-jobs-logo-header.png';
  const FAVICON='assets/brand/webhub-jobs-favicon-192.png';

  function applyBrandLogo(){
    document.querySelectorAll('a.brand').forEach(a=>{
      if(a.dataset.webhubBrandLogo==='1')return;
      a.dataset.webhubBrandLogo='1';
      a.setAttribute('aria-label','WebHub Jobs');
      a.innerHTML=`<img class="webhub-brand-logo" src="${HEADER_LOGO}" alt="WebHub Jobs">`;
    });
  }

  function applyFavicon(){
    let link=document.querySelector('link[rel="icon"],link[rel="shortcut icon"]');
    if(!link){link=document.createElement('link');link.rel='icon';document.head.appendChild(link)}
    link.type='image/png';
    link.href=FAVICON;
  }

  if(!document.querySelector('style[data-webhub-brand-logo]')){
    const style=document.createElement('style');
    style.dataset.webhubBrandLogo='1';
    style.textContent=`
      a.brand[data-webhub-brand-logo="1"]{display:inline-flex!important;align-items:center!important;line-height:1!important;overflow:visible!important}
      .webhub-brand-logo{display:block!important;width:auto!important;height:48px!important;max-width:190px!important;object-fit:contain!important}
      footer .webhub-brand-logo{height:54px!important;max-width:210px!important}
      @media(max-width:640px){.webhub-brand-logo{height:40px!important;max-width:152px!important}footer .webhub-brand-logo{height:46px!important;max-width:180px!important}}
    `;
    document.head.appendChild(style);
  }

  applyFavicon();
  applyBrandLogo();
  new MutationObserver(applyBrandLogo).observe(document.body,{childList:true,subtree:true});
})();
