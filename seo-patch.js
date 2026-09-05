const head=document.head;
const ensureMeta=(selector,attrs)=>{let el=head.querySelector(selector);if(!el){el=document.createElement('meta');Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));head.appendChild(el)}else Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));return el};
const ensureLink=(rel,href)=>{let el=head.querySelector(`link[rel="${rel}"]`);if(!el){el=document.createElement('link');el.rel=rel;head.appendChild(el)}el.href=href;return el};
const canonical='https://webhub.asia/';
ensureLink('canonical',canonical);
ensureMeta('meta[name="robots"]',{name:'robots',content:'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'});
ensureMeta('meta[name="author"]',{name:'author',content:'WebHub Jobs'});
ensureMeta('meta[property="og:type"]',{property:'og:type',content:'website'});
ensureMeta('meta[property="og:site_name"]',{property:'og:site_name',content:'WebHub Jobs'});
ensureMeta('meta[property="og:locale"]',{property:'og:locale',content:'th_TH'});
ensureMeta('meta[property="og:url"]',{property:'og:url',content:canonical});
ensureMeta('meta[property="og:title"]',{property:'og:title',content:'WebHub Jobs | งานที่ใช่ คนที่พร้อม'});
ensureMeta('meta[property="og:description"]',{property:'og:description',content:'แพลตฟอร์มหางานและหาคนสำหรับประเทศไทย ค้นหางาน สมัครงาน และประกาศรับสมัครงานจากบริษัทที่ผ่านการตรวจสอบ'});
ensureMeta('meta[name="twitter:card"]',{name:'twitter:card',content:'summary_large_image'});
ensureMeta('meta[name="twitter:title"]',{name:'twitter:title',content:'WebHub Jobs | งานที่ใช่ คนที่พร้อม'});
ensureMeta('meta[name="twitter:description"]',{name:'twitter:description',content:'แพลตฟอร์มหางานและหาคนสำหรับประเทศไทย ค้นหางาน สมัครงาน และประกาศรับสมัครงานในที่เดียว'});

// Google AdSense site verification/loader. This only adds the official script to <head> and does not alter page layout.
if(!head.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')){
  const ads=document.createElement('script');
  ads.async=true;
  ads.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3455272174981579';
  ads.crossOrigin='anonymous';
  head.appendChild(ads);
}

const schema={
  '@context':'https://schema.org',
  '@graph':[
    {
      '@type':'Organization',
      '@id':'https://webhub.asia/#organization',
      name:'WebHub Jobs',
      url:'https://webhub.asia/',
      email:'support@webhub.asia'
    },
    {
      '@type':'WebSite',
      '@id':'https://webhub.asia/#website',
      url:'https://webhub.asia/',
      name:'WebHub Jobs',
      inLanguage:'th-TH',
      publisher:{'@id':'https://webhub.asia/#organization'},
      potentialAction:{
        '@type':'SearchAction',
        target:{'@type':'EntryPoint',urlTemplate:'https://webhub.asia/#jobs?keyword={search_term_string}'},
        'query-input':'required name=search_term_string'
      }
    }
  ]
};
let ld=head.querySelector('#webhubSeoSchema');if(!ld){ld=document.createElement('script');ld.type='application/ld+json';ld.id='webhubSeoSchema';head.appendChild(ld)}ld.textContent=JSON.stringify(schema);
