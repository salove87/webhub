# WebHub Jobs

แพลตฟอร์มหางานและหาคนบน GitHub Pages ใช้ Firebase Authentication, Firestore และ Storage เป็นระบบหลังบ้าน

## ตั้งค่าเพื่อใช้งานจริง

1. Firebase Console > Authentication > Sign-in method: เปิด Email/Password
2. Firestore Database > Rules: วางเนื้อหาจาก `firestore.rules` แล้ว Publish
3. Storage > Rules: วางเนื้อหาจาก `storage.rules` แล้ว Publish
4. Authentication > Settings > Authorized domains: เพิ่ม `webhub.asia`
5. สร้างบัญชีผู้ดูแลตามปกติ แล้วแก้เอกสาร `users/{uid}` ใน Firestore ให้ `role: "admin"`
6. สร้าง composite index สำหรับ `jobs`: `status` Ascending และ `publishedAt` Descending

ประกาศใหม่จะมีสถานะ `pending` และจะยังไม่แสดงหน้าเว็บ ผู้ดูแลต้องตรวจสอบและเปลี่ยนเป็น `published` พร้อมเพิ่ม `publishedAt` ก่อนเผยแพร่

## ความปลอดภัย

- ห้ามเปลี่ยน Rules เป็น `allow read, write: if true`
- Firebase Web API key แสดงฝั่งหน้าเว็บได้ตามการออกแบบของ Firebase ความปลอดภัยขึ้นกับ Authentication, Rules และ App Check
- ก่อนเปิดประชาสัมพันธ์ควรเปิด App Check, Email verification, CAPTCHA/anti-abuse และกำหนดนโยบายความเป็นส่วนตัวฉบับเต็ม
