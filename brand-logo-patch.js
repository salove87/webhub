(()=>{
  const HEADER_LOGO='assets/brand/webhub-jobs-logo-new.png?v=20260906-1';
  const FAVICON='assets/brand/webhub-jobs-favicon-192.png';

  function applyBrandLogo(){
    document.querySelectorAll('a.brand').forEach(a=>{
      a.dataset.webhubBrandLogo='1';
      a.setAttribute('aria-label','WebHub Jobs');
      const img=a.querySelector('img.webhub-brand-logo');
      if(img){if(img.getAttribute('src')!==HEADER_LOGO)img.src=HEADER_LOGO;return}
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
      .webhub-brand-logo{display:block!important;width:auto!important;height:48px!important;max-width:230px!important;object-fit:contain!important}
      footer .webhub-brand-logo{height:54px!important;max-width:250px!important}
      @media(max-width:640px){
        a.brand[data-webhub-brand-logo="1"]{flex:0 1 auto!important;min-width:0!important}
        .webhub-brand-logo{height:58px!important;width:auto!important;max-width:min(260px,68vw)!important;object-fit:contain!important}
        footer .webhub-brand-logo{height:54px!important;max-width:min(240px,72vw)!important}
      }
      @media(max-width:390px){.webhub-brand-logo{height:54px!important;max-width:66vw!important}}
    `;
    document.head.appendChild(style);
  }

  applyFavicon();
  applyBrandLogo();
  new MutationObserver(applyBrandLogo).observe(document.body,{childList:true,subtree:true});
})();
