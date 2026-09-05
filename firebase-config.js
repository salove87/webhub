export const firebaseConfig={apiKey:"AIzaSyDZSY0jxEGzTG0rualNAgH_Ly45Ve_b3SY",authDomain:"jobhub-a0de5.firebaseapp.com",projectId:"jobhub-a0de5",storageBucket:"jobhub-a0de5.firebasestorage.app",messagingSenderId:"390768908775",appId:"1:390768908775:web:1bd01cba98df640e228542",measurementId:"G-2W4VFTTKJB"};
if(location.pathname.endsWith('/admin.html')){
  const addArticlesLink=()=>{
    const tabs=document.querySelector('.tabs');
    if(tabs&&!document.getElementById('adminArticlesDirectLink')){
      const a=document.createElement('a');
      a.id='adminArticlesDirectLink';
      a.href='admin-articles.html';
      a.textContent='บทความ';
      a.className='tab';
      a.style.cssText='text-decoration:none;color:#075985;background:#e0f2fe;border-color:#7dd3fc;display:inline-flex;align-items:center';
      tabs.appendChild(a);
    }
  };
  addArticlesLink();
  document.addEventListener('DOMContentLoaded',addArticlesLink,{once:true});
  const articleLinkTimer=setInterval(addArticlesLink,300);
  setTimeout(()=>clearInterval(articleLinkTimer),15000);
  setTimeout(()=>{import('./admin-company-email-patch.js?v=20260905-1');},0);
}
if(location.pathname.endsWith('/admin-articles.html')){
  setTimeout(()=>{import('./admin-articles-draft-loader.js?v=20260905-1');},0);
  setTimeout(()=>{import('./admin-static-link-patch.js?v=20260905-1');},0);
}
