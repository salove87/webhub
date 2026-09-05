const css=document.createElement('style');css.textContent=`
/* Global responsive dialogs */
dialog{box-sizing:border-box;max-width:calc(100vw - 24px);max-height:calc(100dvh - 24px);overflow:auto;overscroll-behavior:contain}
dialog>*{max-width:100%;min-width:0}
dialog img{max-width:100%;height:auto}
dialog input,dialog select,dialog textarea,dialog button{max-width:100%;box-sizing:border-box}
#authDialog,#jobDialog,#applicationDialog,#infoDialog,#navInfoDialog,.terms-dialog{width:min(680px,calc(100vw - 24px))!important}
#postDialog.post-dialog{width:min(1040px,calc(100vw - 24px))!important;max-height:calc(100dvh - 20px)!important}
#postDialog.post-dialog form{max-height:calc(100dvh - 20px)!important}
@media(max-width:600px){
  dialog,#authDialog,#jobDialog,#applicationDialog,#infoDialog,#navInfoDialog,.terms-dialog,#postDialog.post-dialog{
    width:calc(100vw - 16px)!important;
    max-width:calc(100vw - 16px)!important;
    max-height:calc(100dvh - 16px)!important;
    margin:auto!important;
    border-radius:18px!important;
  }
  dialog:not(.post-dialog){padding:20px 16px 18px!important}
  dialog::backdrop{background:rgba(2,6,23,.72)!important}
  dialog .close{position:sticky!important;float:right;top:0!important;right:0!important;z-index:20;width:40px!important;height:40px!important;display:grid!important;place-items:center!important;border-radius:50%!important;background:#fff!important;border:1px solid #dbe5ee!important;box-shadow:0 4px 14px rgba(15,23,42,.12)!important;margin:-4px -2px 4px 8px!important}
  dialog h1,dialog h2{font-size:clamp(22px,7vw,28px)!important;line-height:1.3!important;overflow-wrap:anywhere}
  dialog h3{overflow-wrap:anywhere}
  dialog p,dialog li,dialog span,dialog b,dialog a{overflow-wrap:anywhere}
  dialog form,.apply-grid,.review-box,.guide-detail-grid,.safety-grid,.role-grid,.form-grid,.company-info-grid{min-width:0!important;max-width:100%!important}
  dialog input,dialog select,dialog textarea{width:100%!important;min-width:0!important;font-size:16px!important}
  dialog textarea{min-height:110px!important;resize:vertical!important}
  .role-grid,.apply-grid,.form-grid,.company-info-grid,.guide-detail-grid,.safety-grid{grid-template-columns:1fr!important}
  .role-grid button{width:100%!important;min-height:72px!important;padding:16px!important}
  .apply-head,.post-form-head,.applicant-card-head,.section-head{flex-direction:column!important;align-items:stretch!important;gap:10px!important}
  .apply-actions,.post-actions,.modal-actions{display:flex!important;flex-direction:column-reverse!important;gap:9px!important}
  .apply-actions .btn,.post-actions .btn,.modal-actions .btn{width:100%!important;min-height:46px!important}
  .review-row{grid-template-columns:1fr!important;gap:3px!important;padding:10px 12px!important}
  .apply-job,.apply-note{word-break:break-word!important}
  #jobDetail{clear:both;padding-top:4px}
  #jobDetail>div:first-child{align-items:flex-start!important;flex-wrap:wrap!important}
  #jobDetail .btn,#jobDetail button{width:100%!important;min-height:46px!important;margin-top:10px!important}
  #postDialog.post-dialog{padding:0!important;overflow:hidden!important}
  #postDialog.post-dialog form{padding:16px!important;overflow-y:auto!important;overflow-x:hidden!important;max-height:calc(100dvh - 16px)!important}
  #postDialog .post-form-head{padding-right:42px!important}
  #postDialog .form-section{grid-template-columns:1fr!important;padding:14px!important;margin:10px 0!important}
  #postDialog .section-body,#postDialog .form-grid{width:100%!important;min-width:0!important}
  #postDialog .post-actions{position:sticky!important;bottom:-16px!important;margin:14px -16px -16px!important;padding:12px 16px calc(12px + env(safe-area-inset-bottom))!important;background:#fff!important}
  #postDialog .logo-upload{max-width:100%!important;width:100%!important}
  #postDialog .logo-preview{width:82px!important;height:82px!important}
  #applicationDialog .applicant-info{grid-template-columns:1fr!important}
  #applicationDialog .applicant-status{align-items:stretch!important;flex-direction:column!important}
  #applicationDialog .applicant-status select,#applicationDialog .resume-mail{width:100%!important}
}
@media(max-width:380px){
  dialog,#authDialog,#jobDialog,#applicationDialog,#infoDialog,#navInfoDialog,.terms-dialog,#postDialog.post-dialog{width:calc(100vw - 10px)!important;max-width:calc(100vw - 10px)!important}
  dialog:not(.post-dialog){padding:16px 13px!important}
  #postDialog.post-dialog form{padding:13px!important}
}
`;document.head.appendChild(css);

function normalizeOpenDialogs(){document.querySelectorAll('dialog[open]').forEach(d=>{d.scrollTop=0;const first=d.querySelector('input:not([type="hidden"]),select,textarea,button');if(first&&window.innerWidth<=600)setTimeout(()=>first.blur?.(),0)})}
const observer=new MutationObserver(normalizeOpenDialogs);observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
window.addEventListener('orientationchange',()=>setTimeout(normalizeOpenDialogs,150));
