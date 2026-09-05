const $=s=>document.querySelector(s);
const form=$('#authForm');
if(form){
  let approved=false;
  const style=document.createElement('style');
  style.textContent=`
  #registrationTermsDialog{width:min(760px,calc(100% - 24px));max-height:90vh;overflow:auto;border:0;border-radius:20px;padding:28px}
  #registrationTermsDialog h2{margin:0 0 8px}.terms-lead{color:#475569;line-height:1.7}.terms-box{margin:18px 0;padding:16px;border:1px solid #dbe5ee;border-radius:14px;background:#f8fafc}.terms-box h3{margin:0 0 8px;font-size:17px}.terms-box p,.terms-box li{color:#475569;line-height:1.7;font-size:13px}.terms-check{display:flex;gap:10px;align-items:flex-start;padding:14px;border-radius:12px;background:#fff7ed;border:1px solid #fed7aa;font-weight:700}.terms-check input{width:18px;height:18px;margin-top:2px}.terms-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:18px}.terms-actions .btn{min-width:140px}@media(max-width:600px){.terms-actions{flex-direction:column-reverse}.terms-actions .btn{width:100%}}
  `;
  document.head.appendChild(style);
  const d=document.createElement('dialog');
  d.id='registrationTermsDialog';
  d.innerHTML=`<button class="close" id="closeRegistrationTerms" type="button">×</button>
  <h2>ข้อกำหนดก่อนสมัครสมาชิก</h2>
  <p class="terms-lead">กรุณาอ่านและยอมรับเงื่อนไขก่อนสร้างบัญชี WebHub Jobs ทุกครั้ง</p>
  <div class="terms-box">
    <h3>การใช้งานบัญชี</h3>
    <p>ผู้สมัครต้องให้ข้อมูลที่ถูกต้องและใช้บัญชีโดยสุจริต ห้ามนำระบบไปใช้เพื่อหลอกลวง สแปม เก็บข้อมูลโดยมิชอบ หรือกระทำการที่ผิดกฎหมาย</p>
    <h3>ผู้หางานและนายจ้าง</h3>
    <p>ผู้หางานต้องตรวจสอบนายจ้างก่อนส่งข้อมูลเพิ่มเติมหรือเดินทางไปสัมภาษณ์ และไม่ควรโอนเงินเพื่อแลกกับการได้งาน ส่วนนายจ้างต้องรับผิดชอบความถูกต้องของประกาศ ช่องทางติดต่อ และกระบวนการรับสมัคร</p>
    <h3>ข้อจำกัดความรับผิด</h3>
    <p><b>WebHub.asia เป็นเพียงแพลตฟอร์มตัวกลาง ไม่เป็นนายจ้าง ตัวแทน หรือคู่สัญญาระหว่างผู้หางานกับนายจ้าง</b> ในขอบเขตที่กฎหมายอนุญาต WebHub.asia จะไม่รับผิดชอบต่อความเสียหาย การสูญเสีย การฉ้อโกง การโอนเงินโดยมิชอบ การเปิดเผยข้อมูลส่วนบุคคล การผิดนัด หรือความเสียหายทางตรงหรือทางอ้อมที่เกิดจากการติดต่อ การสมัครงาน การว่าจ้าง หรือธุรกรรมระหว่างผู้ใช้งาน</p>
    <h3>ข้อมูลส่วนบุคคล</h3>
    <p>ข้อมูลที่ผู้ใช้กรอกจะถูกใช้เพื่อการให้บริการหางาน สมัครงาน ลงประกาศ และบริหารผู้สมัครตามประเภทบัญชี ผู้ใช้ไม่ควรเปิดเผย Password, OTP, PIN หรือข้อมูลบัญชีธนาคารผ่านระบบหรือกับบุคคลอื่น</p>
  </div>
  <label class="terms-check"><input id="acceptRegistrationTerms" type="checkbox"> <span>ฉันได้อ่าน เข้าใจ และยอมรับเงื่อนไขการใช้บริการ นโยบายความเป็นส่วนตัว และข้อจำกัดความรับผิดของ WebHub.asia</span></label>
  <div class="terms-actions"><button class="btn ghost" id="cancelRegistrationTerms" type="button">ยกเลิก</button><button class="btn primary" id="confirmRegistrationTerms" type="button" disabled>ยอมรับและสมัครสมาชิก</button></div>`;
  document.body.appendChild(d);
  const check=$('#acceptRegistrationTerms'),confirmBtn=$('#confirmRegistrationTerms');
  check.onchange=()=>confirmBtn.disabled=!check.checked;
  const close=()=>{if(d.open)d.close();check.checked=false;confirmBtn.disabled=true};
  $('#closeRegistrationTerms').onclick=close;
  $('#cancelRegistrationTerms').onclick=close;
  confirmBtn.onclick=()=>{approved=true;d.close();check.checked=false;confirmBtn.disabled=true;form.requestSubmit()};
  form.addEventListener('submit',e=>{
    if($('#authMode')?.value!=='register')return;
    if(approved){approved=false;return;}
    e.preventDefault();
    e.stopImmediatePropagation();
    const name=$('#displayName')?.value.trim(),email=$('#email')?.value.trim(),password=$('#password')?.value||'';
    if(!name||!email||password.length<8){return}
    d.showModal();
  },true);
}
