const css=document.createElement('style');css.textContent=`
/* Device-safe layout: never allow the page or dialogs to slide sideways */
html,body{width:100%;max-width:100%;overflow-x:hidden!important;overscroll-behavior-x:none}
body{position:relative}
main,header,footer,section,article,form,fieldset{min-width:0;max-width:100%}
img,svg,video,canvas{max-width:100%;height:auto}

/* Every native dialog is constrained by the actual device viewport */
dialog{
  box-sizing:border-box!important;
  inline-size:min(680px,calc(100% - 24px))!important;
  max-inline-size:calc(100% - 24px)!important;
  max-block-size:calc(100dvh - 24px)!important;
  margin:auto!important;
  overflow-y:auto!important;
  overflow-x:hidden!important;
  overscroll-behavior:contain!important;
  contain:layout paint;
}
dialog *,dialog *::before,dialog *::after{box-sizing:border-box;min-width:0;max-width:100%}
dialog img,dialog svg,dialog video,dialog canvas{max-width:100%!important;height:auto!important}
dialog input,dialog select,dialog textarea,dialog button{max-width:100%!important;box-sizing:border-box!important}
dialog pre,dialog code{white-space:pre-wrap!important;overflow-wrap:anywhere!important;word-break:break-word!important}
dialog table{width:100%!important;max-width:100%!important;table-layout:fixed!important}
dialog td,dialog th{overflow-wrap:anywhere!important;word-break:break-word!important}

#authDialog,#jobDialog,#applicationDialog,#infoDialog,#navInfoDialog,.terms-dialog{inline-size:min(680px,calc(100% - 24px))!important}
#postDialog.post-dialog{inline-size:min(1040px,calc(100% - 24px))!important;max-block-size:calc(100dvh - 20px)!important}
#postDialog.post-dialog form{max-block-size:calc(100dvh - 20px)!important;overflow-x:hidden!important}

/* Lock background scrolling while any dialog is open */
html.dialog-open,body.dialog-open{overflow:hidden!important;width:100%!important;max-width:100%!important;touch-action:pan-y}

@media(max-width:600px){
  dialog,#authDialog,#jobDialog,#applicationDialog,#infoDialog,#navInfoDialog,.terms-dialog,#postDialog.post-dialog{
    inline-size:calc(100% - 12px)!important;
    width:calc(100% - 12px)!important;
    max-inline-size:calc(100% - 12px)!important;
    max-width:calc(100% - 12px)!important;
    max-block-size:calc(100dvh - 12px)!important;
    max-height:calc(100dvh - 12px)!important;
    margin:auto!important;
    border-radius:16px!important;
    left:auto!important;right:auto!important;
    transform:none!important;
  }
  dialog:not(.post-dialog){padding:18px 14px 16px!important}
  dialog::backdrop{background:rgba(2,6,23,.72)!important}
  dialog .close{
    position:sticky!important;float:right;top:0!important;right:0!important;z-index:30;
    width:40px!important;height:40px!important;min-width:40px!important;max-width:40px!important;
    display:grid!important;place-items:center!important;border-radius:50%!important;
    background:#fff!important;border:1px solid #dbe5ee!important;box-shadow:0 4px 14px rgba(15,23,42,.12)!important;
    margin:-3px -1px 5px 8px!important;padding:0!important
  }
  dialog h1,dialog h2{font-size:clamp(21px,7vw,27px)!important;line-height:1.3!important;overflow-wrap:anywhere!important;word-break:break-word!important}
  dialog h3,dialog p,dialog li,dialog span,dialog b,dialog a,dialog label{overflow-wrap:anywhere!important;word-break:break-word!important}
  dialog form,.apply-grid,.review-box,.guide-detail-grid,.safety-grid,.role-grid,.form-grid,.company-info-grid,.section-body,.form-section{width:100%!important;min-width:0!important;max-width:100%!important}
  dialog input,dialog select,dialog textarea{display:block;width:100%!important;min-width:0!important;max-width:100%!important;font-size:16px!important}
  dialog textarea{min-height:110px!important;resize:vertical!important}
  .role-grid,.apply-grid,.form-grid,.company-info-grid,.guide-detail-grid,.safety-grid,.applicant-info{grid-template-columns:minmax(0,1fr)!important}
  .role-grid button{width:100%!important;min-height:72px!important;padding:16px!important}
  .apply-head,.post-form-head,.applicant-card-head,.section-head{flex-direction:column!important;align-items:stretch!important;gap:10px!important;min-width:0!important}
  .apply-actions,.post-actions,.modal-actions{display:flex!important;flex-direction:column-reverse!important;gap:9px!important;width:100%!important}
  .apply-actions .btn,.post-actions .btn,.modal-actions .btn{width:100%!important;min-height:46px!important}
  .review-row{grid-template-columns:minmax(0,1fr)!important;gap:3px!important;padding:10px 12px!important;width:100%!important}
  .apply-job,.apply-note{word-break:break-word!important;overflow-wrap:anywhere!important;width:100%!important}
  #jobDetail{clear:both;padding-top:4px;width:100%!important;overflow-x:hidden!important}
  #jobDetail>div:first-child{align-items:flex-start!important;flex-wrap:wrap!important;width:100%!important}
  #jobDetail .btn,#jobDetail button{width:100%!important;min-height:46px!important;margin-top:10px!important}
  #postDialog.post-dialog{padding:0!important;overflow:hidden!important}
  #postDialog.post-dialog form{width:100%!important;padding:15px!important;overflow-y:auto!important;overflow-x:hidden!important;max-height:calc(100dvh - 12px)!important}
  #postDialog .post-form-head{padding-right:42px!important;width:100%!important}
  #postDialog .form-section{grid-template-columns:minmax(0,1fr)!important;padding:13px!important;margin:10px 0!important;overflow:hidden!important}
  #postDialog .section-body,#postDialog .form-grid{width:100%!important;min-width:0!important;max-width:100%!important;overflow:hidden!important}
  #postDialog .post-actions{position:sticky!important;bottom:-15px!important;margin:14px -15px -15px!important;padding:12px 15px calc(12px + env(safe-area-inset-bottom))!important;background:#fff!important;max-width:none!important;width:calc(100% + 30px)!important}
  #postDialog .logo-upload{max-width:100%!important;width:100%!important}
  #postDialog .logo-preview{width:82px!important;height:82px!important}
  #applicationDialog .applicant-status{align-items:stretch!important;flex-direction:column!important;width:100%!important}
  #applicationDialog .applicant-status select,#applicationDialog .resume-mail{width:100%!important}
}
@media(max-width:380px){
  dialog,#authDialog,#jobDialog,#applicationDialog,#infoDialog,#navInfoDialog,.terms-dialog,#postDialog.post-dialog{inline-size:calc(100% - 8px)!important;width:calc(100% - 8px)!important;max-inline-size:calc(100% - 8px)!important;max-width:calc(100% - 8px)!important}
  dialog:not(.post-dialog){padding:15px 12px!important}
  #postDialog.post-dialog form{padding:12px!important}
  #postDialog .post-actions{margin-left:-12px!important;margin-right:-12px!important;margin-bottom:-12px!important;width:calc(100% + 24px)!important;padding-left:12px!important;padding-right:12px!important}
}
`;document.head.appendChild(css);

function syncDialogState(){
  const open=document.querySelector('dialog[open]');
  document.documentElement.classList.toggle('dialog-open',!!open);
  document.body.classList.toggle('dialog-open',!!open);
  if(!open)return;
  open.scrollLeft=0;
  [...open.querySelectorAll('*')].forEach(el=>{if(el.scrollWidth>el.clientWidth+2&&getComputedStyle(el).overflowX==='visible')el.style.maxWidth='100%'});
}
function normalizeOpenDialogs(){
  document.querySelectorAll('dialog[open]').forEach(d=>{d.scrollLeft=0;const first=d.querySelector('input:not([type="hidden"]),select,textarea');if(first&&window.innerWidth<=600)setTimeout(()=>first.blur?.(),0)});
  syncDialogState();
}
const observer=new MutationObserver(()=>requestAnimationFrame(normalizeOpenDialogs));
observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
window.addEventListener('resize',()=>requestAnimationFrame(normalizeOpenDialogs),{passive:true});
window.addEventListener('orientationchange',()=>setTimeout(normalizeOpenDialogs,150));
normalizeOpenDialogs();
