# ⚡ Quick Start - MedLink Band

Hướng dẫn nhanh 5 phút để chạy project.

---

## 📋 Prerequisites

Cài đặt trước:
- [Node.js 18+](https://nodejs.org/) 
- Code editor (VS Code khuyến nghị)
- Git

---

## 🚀 Chạy Local (3 bước)

### 1. Clone & Install
```bash
cd d:\pj\med
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```

### 3. Open Browser
Mở http://localhost:3000/login

**Login credentials:**
- Email: `admin@medlinkband.vn`
- Password: `medlink2024`

---

## 🎯 Test Features

### ✅ Test 1: Login
```
URL: /login
Email: admin@medlinkband.vn
Password: medlink2024
Expected: Redirect to dashboard
```

### ✅ Test 2: Dashboard
```
URL: /dashboard
Check: 
- 4 stats cards hiển thị
- Table có 5 bệnh nhân mẫu
- Search & filter hoạt động
```

### ✅ Test 3: Tạo QR Code
```
Bước:
1. Click icon QR trên bệnh nhân bất kỳ
2. Modal mở ra với QR code
3. Click "Tải Mã QR (PNG)"
Expected: Download file PNG
```

### ✅ Test 4: Trang Emergency (Mobile view)
```
URL: /emergency/patient-001
Bước:
1. Bấm F12 → Toggle device toolbar
2. Chọn iPhone 12 Pro
3. Kiểm tra giao diện
Expected: Font to, nút gọi dễ bấm
```

### ✅ Test 5: Doctor Auth
```
URL: /medical-record/patient-001
Password: medlink2024
Expected: Hiện bệnh án chi tiết
```

### ✅ Test 6: Thêm bệnh nhân mới
```
Bước:
1. Dashboard → Click "Thêm mới"
2. Nhập: Tên, năm sinh, nhóm máu, 1 người liên hệ
3. Click "Thêm Bệnh Nhân"
Expected: Bệnh nhân mới xuất hiện đầu table
```

---

## 📂 Structure (chỉ cần biết)

```
src/
├── pages/
│   ├── Login/              # Trang đăng nhập
│   ├── PatientManagement/  # Dashboard (admin)
│   ├── EmergencyInfo/      # Trang cấp cứu (public)
│   ├── DoctorAuth/         # Xác thực bác sĩ
│   └── NotFound/           # 404
├── components/
│   ├── AdminLayout.jsx     # Layout dashboard
│   └── QRCodeCard.jsx      # Modal QR
├── data/
│   └── mockData.js         # 5 bệnh nhân mẫu
└── App.jsx                 # Router chính
```

---

## 🔥 Hot Tips

### Xóa data test
```javascript
// Trong browser console
localStorage.clear()
location.reload()
```

### Reset về data mẫu
```javascript
// Trong browser console
localStorage.removeItem('medlink_patients')
location.reload()
```

### Thay đổi credentials
File: `src/pages/Login/Login.jsx`
```javascript
// Line ~30
if (email === 'YOUR_EMAIL' && password === 'YOUR_PASSWORD') {
```

---

## 🐛 Gặp lỗi?

### Port 3000 đã bị chiếm
```bash
# Kill process
npx kill-port 3000
npm run dev
```

### Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### React dev tools warning
→ Bình thường, không ảnh hưởng

---

## 📚 Đọc thêm

| File | Nội dung |
|------|----------|
| `README.md` | Tổng quan dự án |
| `FIREBASE_SETUP.md` | Setup database thật |
| `NFC_GUIDE.md` | Làm vòng tay NFC |
| `DEPLOY.md` | Deploy lên internet |
| `SUMMARY.md` | Tóm tắt hoàn thiện |

---

## ✅ Checklist MVP

- [x] ~~Code xong~~ ✅
- [x] ~~Test local~~ ✅
- [ ] Setup Firebase (1-2h)
- [ ] Deploy Vercel (15 phút)
- [ ] Mua domain (5 phút + 200k)
- [ ] Test NFC chip (mua chip + test)
- [ ] Pilot 10 vòng tay thử
- [ ] User testing
- [ ] Launch! 🚀

---

**Next step:** Đọc `FIREBASE_SETUP.md` để có database thật

**Questions?** Check `SUMMARY.md` phần Support
