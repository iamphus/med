# Hướng dẫn tích hợp Firebase vào MedLink Band

## Bước 1: Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** (Thêm dự án)
3. Đặt tên project: `medlink-band`
4. Tắt Google Analytics (không cần thiết cho MVP)
5. Click **"Create project"**

---

## Bước 2: Đăng ký Web App

1. Trong Firebase Console, click vào icon **Web** (</>) để thêm app
2. Đặt nickname: `MedLink Band Web`
3. **Không** check "Also set up Firebase Hosting"
4. Click **"Register app"**
5. Firebase sẽ hiển thị config object — **Copy toàn bộ** (sẽ dùng ở bước sau)

Config sẽ có dạng:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "medlink-band.firebaseapp.com",
  projectId: "medlink-band",
  storageBucket: "medlink-band.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

## Bước 3: Enable Authentication

1. Trong Firebase Console, vào **Authentication** (menu bên trái)
2. Click **"Get started"**
3. Vào tab **"Sign-in method"**
4. Enable **Email/Password**:
   - Click vào "Email/Password"
   - Toggle ON
   - Click "Save"

---

## Bước 4: Enable Firestore Database

1. Vào **Firestore Database** (menu bên trái)
2. Click **"Create database"**
3. Chọn **"Start in test mode"** (cho development)
4. Chọn location: `asia-southeast1` (Singapore - gần VN nhất)
5. Click **"Enable"**

**Security Rules (Test mode — tự động set):**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 1, 1);
    }
  }
}
```

**Chú ý:** Sau khi deploy production, cần thay đổi rules thành:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /patients/{patientId} {
      allow read: if true; // Public emergency info
      allow write: if request.auth != null; // Chỉ admin đã login
    }
  }
}
```

---

## Bước 5: Tạo Admin User đầu tiên

1. Vào **Authentication** > **Users**
2. Click **"Add user"**
3. Email: `admin@medlinkband.vn`
4. Password: `medlink2024`
5. Click **"Add user"**

---

## Bước 6: Cài đặt Firebase SDK vào project

Mở terminal trong folder `d:\pj\med\` và chạy:

```bash
npm install firebase
```

---

## Bước 7: Tạo Firebase Config File

Tạo file mới: `src/firebase/config.js`

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// PASTE Firebase config từ bước 2 vào đây
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
```

**Thay thế** các giá trị `YOUR_*` bằng config thật từ Firebase Console.

---

## Bước 8: Migrate code sang Firebase

Sau khi hoàn thành các bước trên, chạy lệnh:

```bash
npm run dev
```

Rồi báo lại để mình update code:
- Thay `localStorage` bằng Firestore
- Thay login mock bằng Firebase Auth
- Sync data realtime

---

## Checklist

- [ ] Tạo Firebase project
- [ ] Đăng ký Web App & copy config
- [ ] Enable Email/Password authentication
- [ ] Enable Firestore Database (test mode)
- [ ] Tạo admin user: admin@medlinkband.vn
- [ ] Chạy `npm install firebase`
- [ ] Tạo file `src/firebase/config.js` với config thật
- [ ] Báo lại để migrate code

---

## Ước tính chi phí Firebase (Free tier)

| Dịch vụ | Free Tier | Đủ cho |
|---------|-----------|--------|
| Authentication | 50,000 users | ✅ Đủ cho MVP |
| Firestore | 1GB storage, 50K reads/day | ✅ Đủ ~500 bệnh nhân |
| Hosting | 10GB storage, 360MB/day | ✅ Đủ traffic nhỏ |

**Tổng:** $0/tháng cho giai đoạn đầu (dưới 100 users)
