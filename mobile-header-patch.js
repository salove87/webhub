const css=document.createElement('style');css.textContent=`
@media(max-width:900px){
 .topbar{width:100%;display:grid!important;grid-template-columns:minmax(0,1fr) 48px!important;gap:10px!important;align-items:center!important;padding-left:18px!important;padding-right:12px!important}
 .topbar>.brand{min-width:0!important;max-width:calc(100vw - 78px)!important;overflow:hidden!important}
 .topbar>.brand b{overflow:hidden!important;text-overflow:clip!important}
 .topbar>.menu-btn{grid-column:2!important;justify-self:end!important;margin:0!important;width:46px!important;height:46px!important;padding:0!important;display:grid!important;place-items:center!important;font-size:29px!important;line-height:1!important;border-radius:12px!important;flex:none!important}
 .topbar>nav{grid-column:1/-1!important;width:100%!important;left:0!important;right:0!important}
 .topbar>.nav-actions{grid-column:1/-1!important}
 #mobileLogoutBtn{display:block;width:100%;padding:12px 0;border:0;border-top:1px solid #e2e8f0;background:transparent;text-align:left;color:#dc2626;font-weight:700;font-size:14px}
 #mobileLogoutBtn.hidden{display:none!important}
}
@media(max-width:420px){
 .topbar{padding-left:12px!important;padding-right:8px!important;grid-template-columns:minmax(0,1fr) 46px!important}
 .topbar>.brand{max-width:calc(100vw - 66px)!important}
 .topbar>.brand span{width:42px!important;height:42px!important;flex:0 0 42px!important}
 .topbar>.brand b{font-size:18px!important}
}
`;document.head.appendChild(css);

const nav=document.querySelector('.topbar>nav');
const logout=document.querySelector('#logoutBtn');
if(nav&&logout&&!document.querySelector('#mobileLogoutBtn')){
 const mobileLogout=document.createElement('button');
 mobileLogout.type='button';
 mobileLogout.id='mobileLogoutBtn';
 mobileLogout.textContent='ออกจากระบบ';
 const sync=()=>mobileLogout.classList.toggle('hidden',logout.classList.contains('hidden'));
 mobileLogout.onclick=()=>{nav.classList.remove('open');logout.click()};
 nav.appendChild(mobileLogout);
 sync();
 new MutationObserver(sync).observe(logout,{attributes:true,attributeFilter:['class']});
}
