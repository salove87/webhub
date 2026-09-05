# WebHub Jobs

แพลตฟอร์มหางานและหาคนบน GitHub Pages ใช้ Firebase Authentication, Firestore และ Storage เป็นระบบหลังบ้าน

## โครงสร้างใช้งานจริง

- ผู้หางาน: `https://webhub.asia/` — ค้นหา ดูรายละเอียด บันทึก และสมัครงานที่ผ่านการอนุมัติแล้ว
- นายจ้าง: สมัคร/เข้าสู่ระบบจากหน้าเว็บ — ลงประกาศและติดตามสถานะ `pending / published / rejected / closed`
- ผู้ดูแลระบบ: `https://webhub.asia/admin.html` — อนุมัติ/ปฏิเสธงาน ตรวจบริษัท จัดการบัญชี รายงาน และใบสมัคร

## Workflow ประกาศงาน

1. นายจ้างสมัครบัญชี `employer`
2. ลงประกาศใหม่ → ระบบบันทึก `status: pending`
3. Admin ตรวจข้อมูล
4. อนุมัติ → `published` และกำหนด `publishedAt`
5. ไม่อนุมัติ → `rejected` พร้อมเหตุผลให้นายจ้างเห็น
6. นายจ้างสามารถส่งงานที่ถูกปฏิเสธกลับเข้าคิวตรวจใหม่ หรือปิดรับสมัครงานของตนเอง

## ตั้งค่า Firebase เพื่อใช้งานจริง

โปรเจกต์: `jobhub-a0de5`

1. Firebase Console > Authentication > Sign-in method: เปิด Email/Password
2. Firestore Database > Rules: Deploy `firestore.rules`
3. Storage > Rules: Deploy `storage.rules`
4. Authentication > Settings > Authorized domains: เพิ่ม `webhub.asia`
5. สร้างบัญชีผู้ดูแล แล้วกำหนดเอกสาร `users/{uid}` เป็น `role: "admin"` และ `status: "active"`
6. สร้าง composite index ของ `jobs`: `status` Ascending + `publishedAt` Descending

Repository มี `.firebaserc` และ `firebase.json` พร้อมแล้ว จึงสามารถ Deploy Rules ด้วย Firebase CLI ได้โดยใช้:

```bash
firebase deploy --only firestore:rules,storage
```

## Security ที่บังคับใช้ใน Rules

- สมาชิกทั่วไปสร้างบัญชีได้เฉพาะ `candidate` หรือ `employer`
- เจ้าของบัญชีไม่สามารถยกระดับ `role` ของตนเองเป็น Admin ได้
- เจ้าของบัญชีไม่สามารถแก้ `status` เพื่อปลดการระงับบัญชีเองได้
- นายจ้างไม่สามารถตั้งงานเป็น `published` เอง
- งานใหม่ของนายจ้างต้องเป็น `pending` และ `companyVerified: false`
- เฉพาะ Admin อนุมัติ/ปฏิเสธ/ลบประกาศและยืนยันบริษัทได้
- บัญชีที่ถูกระงับไม่สามารถใช้ฟังก์ชันฐานข้อมูลที่ต้องล็อกอินได้
- ผู้สมัครสมัครได้เฉพาะงานที่มีสถานะ `published`
- ห้ามเปลี่ยน Rules เป็น `allow read, write: if true`

## ก่อนประชาสัมพันธ์วงกว้าง

ควรเปิด Firebase App Check, Email verification, CAPTCHA/anti-abuse และจัดทำนโยบายความเป็นส่วนตัว/ข้อกำหนดการใช้งานฉบับเต็ม
