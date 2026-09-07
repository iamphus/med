# 🏥 MedLink Band - Hệ Thống Thông Tin Cấp Cứu Y Tế

Web app quản lý thông tin cấp cứu qua vòng tay QR/NFC cho người cao tuổi, bệnh nhân mạn tính.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff)

---

## 🎯 Tính năng chính

### 1️⃣ Trang cấp cứu công khai (Quét QR/NFC)
- Hiển thị ngay thông tin sống còn: nhóm máu, dị ứng, bệnh nền
- Nút gọi nhanh cho người thân & bác sĩ
- Không cần đăng nhập, tải trong 1-2 giây
- Responsive mobile-first

### 2️⃣ Dashboard quản lý bệnh nhân
- Thêm/sửa/xóa hồ sơ bệnh nhân
- Tìm kiếm & lọc theo nhóm máu, trạng thái
- Tạo & tải mã QR tự động
- Khóa/mở khóa vòng tay khi mất
- Export danh sách CSV
- Stats dashboard realtime

### 3️⃣ Bệnh án bác sĩ (Bảo mật)
- Xác thực mật khẩu trước khi xem
- Lịch sử khám bệnh timeline
- Danh sách thuốc đang dùng
- Thêm nhật ký khám mới
- In bệnh án

---

## 🚀 Cài đặt & Chạy

### Yêu cầu
- Node.js 18+ 
- npm hoặc yarn

### Clone & Install
```bash
git clone <repo-url>
cd med
npm install
```

### Chạy Development Server
```bash
npm run dev
```
→ Mở [http://localhost:3000](http://localhost:3000)

### Build Production
```bash
npm run build
npm run preview
```

---

## 🔐 Tài khoản demo

### Admin Dashboard
- Email: `admin@medlinkband.vn`
- Password: `medlink2024`

### Doctor Auth (Xem bệnh án)
- Password: `medlink2024` hoặc `123456`

---

## 📁 Cấu trúc dự án

```
med/
├── src/
│   ├── components/          # Shared components
│   │   ├── AdminLayout.jsx  # Admin layout với sidebar
│   │   └── QRCodeCard.jsx   # Modal tạo QR
│   ├── pages/
│   │   ├── Login/           # Trang đăng nhập
│   │   ├── PatientManagement/  # Dashboard quản lý BN
│   │   ├── EmergencyInfo/   # Trang cấp cứu công khai
│   │   └── DoctorAuth/      # Xác thực & xem bệnh án
│   ├── data/
│   │   └── mockData.js      # Dữ liệu mẫu 5 bệnh nhân
│   ├── App.jsx              # Router & Auth context
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── FIREBASE_SETUP.md        # Hướng dẫn tích hợp Firebase
├── NFC_GUIDE.md             # Hướng dẫn ghi chip NFC
└── package.json
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + Vite |
| **Routing** | React Router v6 |
| **Styling** | CSS Modules (vanilla) |
| **Icons** | React Icons (Feather) |
| **QR Code** | qrcode.react |
| **State** | React Context API |
| **Storage** | localStorage (MVP) → Firebase (next) |

---

## 📱 Tích hợp Firebase (Bước tiếp theo)

Hiện tại dự án đang dùng localStorage (mất data khi clear browser). 

Để scale production, cần tích hợp Firebase:

1. Đọc hướng dẫn: [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md)
2. Tạo Firebase project
3. Enable Authentication (Email/Password) + Firestore
4. Update code để sync data realtime

**Ước tính thời gian:** 2-3 giờ

---

## 🔗 NFC Chip Integration

Để biến web app thành vòng tay NFC thực tế:

1. Đọc hướng dẫn: [`NFC_GUIDE.md`](./NFC_GUIDE.md)
2. Mua chip NFC NTAG213 (~3,000đ/cái)
3. Dùng app **NFC Tools** để ghi link bệnh nhân vào chip
4. Gắn chip vào vòng tay silicon

**Chi phí:** ~10,000đ/vòng (tự làm) hoặc 20,000-30,000đ (OEM)

---

## 🎨 Screenshots

### Trang cấp cứu (Mobile)
- Font to, dễ đọc trong tình huống khẩn cấp
- Nút gọi nổi bật, dễ bấm

### Dashboard (Desktop)
- Stats cards overview
- Table quản lý bệnh nhân
- Tìm kiếm & filter mạnh mẽ

### QR Code Generator
- Tạo QR tự động
- Download PNG với thông tin BN
- Copy link dễ dàng

---

## 🚧 Roadmap

### MVP (Đã hoàn thành)
- [x] Trang Emergency Info công khai
- [x] Dashboard CRUD bệnh nhân
- [x] QR Code generator
- [x] Doctor authentication
- [x] Medical record viewer
- [x] Responsive mobile UI

### Phase 2 (1-2 tuần)
- [ ] Tích hợp Firebase Auth
- [ ] Firebase Firestore realtime
- [ ] Role-based access (Admin/Doctor/Nurse)
- [ ] Activity logs (audit trail)
- [ ] Email notifications

### Phase 3 (3-4 tuần)
- [ ] Multi-language (EN/VI)
- [ ] PWA (offline access)
- [ ] Push notifications
- [ ] Analytics dashboard
- [ ] Export PDF report

---

## 📄 License

MIT License - Tự do sử dụng cho mục đích thương mại/phi thương mại

---

## 👥 Contact

- **Project Lead:** [Tên bạn]
- **Email:** admin@medlinkband.vn
- **Website:** https://medlinkband.vn (sẽ deploy)

---

## 🙏 Acknowledgments

- Design inspiration: NHS Emergency Info
- Icons: Feather Icons
- QR Library: qrcode.react
- Hosting: Vercel/Netlify (recommended)

---

**Made with ❤️ for healthcare accessibility**
