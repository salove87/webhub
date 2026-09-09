(()=>{
  function rewrite(){
    document.querySelectorAll('#list a[href*="article.html?slug="]').forEach(a=>{
      try{
        const u=new URL(a.href,location.href);
        const s=u.searchParams.get('slug');
        if(s&&/^[a-z0-9][a-z0-9-]*$/i.test(s)){
          a.href=`/articles/${encodeURIComponent(s)}/`;
        }
      }catch{}
    });
  }
  rewrite();
  new MutationObserver(rewrite).observe(document.documentElement,{childList:true,subtree:true});
})();
