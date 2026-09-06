(()=>{
const $=s=>document.querySelector(s);
let reloading=false;
function publishSucceeded(){const msg=$('#msg');return !!msg&&/เผยแพร่เรียบร้อย/.test(msg.textContent||'')}
function reloadAfterPublish(){if(reloading||!publishSucceeded())return;reloading=true;setTimeout(()=>location.reload(),250)}
function mount(){const msg=$('#msg');if(!msg)return false;new MutationObserver(reloadAfterPublish).observe(msg,{childList:true,subtree:true,characterData:true});return true}
if(!mount()){let n=0;const t=setInterval(()=>{if(mount()||++n>80)clearInterval(t)},250)}
})();
