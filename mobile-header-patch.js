const css=document.createElement('style');css.textContent=`
@media(max-width:900px){
 .topbar{width:100%;display:grid!important;grid-template-columns:minmax(0,1fr) 48px!important;gap:10px!important;align-items:center!important;padding-left:18px!important;padding-right:12px!important}
 .topbar>.brand{min-width:0!important;max-width:calc(100vw - 78px)!important;overflow:hidden!important}
 .topbar>.brand b{overflow:hidden!important;text-overflow:clip!important}
 .topbar>.menu-btn{grid-column:2!important;justify-self:end!important;margin:0!important;width:46px!important;height:46px!important;padding:0!important;display:grid!important;place-items:center!important;font-size:29px!important;line-height:1!important;border-radius:12px!important;flex:none!important}
 .topbar>nav{grid-column:1/-1!important;width:100%!important;left:0!important;right:0!important}
 .topbar>.nav-actions{grid-column:1/-1!important}
}
@media(max-width:420px){
 .topbar{padding-left:12px!important;padding-right:8px!important;grid-template-columns:minmax(0,1fr) 46px!important}
 .topbar>.brand{max-width:calc(100vw - 66px)!important}
 .topbar>.brand span{width:42px!important;height:42px!important;flex:0 0 42px!important}
 .topbar>.brand b{font-size:18px!important}
}
`;document.head.appendChild(css);
