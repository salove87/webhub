import{getApps}from'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import{getAuth}from'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import{getFirestore,doc,getDoc}from'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

const toast=m=>{const e=document.querySelector('#toast');if(!e)return;e.textContent=m;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2600)};

function fillEmployerForm(profile,company,user){const f=document.querySelector('#postForm');if(!f)return;const values={
  companyName:company?.name||profile?.displayName||'',
  industry:company?.industry||'',
  companySize:company?.companySize||'',
  companyWebsite:company?.companyWebsite||'',
  contactEmail:company?.contactEmail||profile?.email||user?.email||'',
  contactPhone:company?.contactPhone||'',
  lineId:company?.lineId||'',
  facebookUrl:company?.facebookUrl||'',
  linkedinUrl:company?.linkedinUrl||'',
  socialUrl:company?.socialUrl||''
};
Object.entries(values).forEach(([k,v])=>{if(f.elements[k]&&!f.elements[k].value)f.elements[k].value=v||''});}

setTimeout(()=>{
  document.addEventListener('click',async e=>{
    const btn=e.target.closest?.('[data-post-job]');
    if(!btn)return;
    const app=getApps()[0];
    if(!app)return;
    const auth=getAuth(app),user=auth.currentUser;
    if(!user)return;

    // Stop the old handler from checking userProfile before Firestore finishes loading it.
    e.preventDefault();
    e.stopImmediatePropagation();

    try{
      const db=getFirestore(app);
      const [uSnap,cSnap]=await Promise.all([
        getDoc(doc(db,'users',user.uid)),
        getDoc(doc(db,'companies',user.uid))
      ]);
      const profile=uSnap.exists()?uSnap.data():null;
      if(!profile){toast('ไม่พบข้อมูลบัญชี กรุณาเข้าสู่ระบบใหม่');return;}
      if(profile.status==='suspended'){toast('บัญชีนี้ถูกระงับการใช้งาน');return;}
      if(profile.role!=='employer'){toast('กรุณาใช้บัญชีนายจ้าง');return;}

      fillEmployerForm(profile,cSnap.exists()?cSnap.data():null,user);
      const dialog=document.querySelector('#postDialog');
      if(dialog&&!dialog.open)dialog.showModal();
    }catch(err){
      console.error('Employer role check failed',err);
      toast('ตรวจสอบบัญชีนายจ้างไม่สำเร็จ กรุณาลองใหม่');
    }
  },true);
},0);
