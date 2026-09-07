# 🔥 Phase 2: Firebase Integration - Setup Guide

## ✅ Đã hoàn thành

### 1. ✅ Firebase Config
- File: `src/firebase/config.js` đã được tạo với cấu hình đúng
- Firebase SDK: Auth, Firestore, Analytics đã được khởi tạo

### 2. ✅ Custom Hooks
- **`src/hooks/useAuth.js`**: Firebase Authentication hooks
  - Login/Logout
  - Auth state management
  - Error handling (Vietnamese)
  - Session persistence
  
- **`src/hooks/usePatients.js`**: Firestore CRUD hooks
  - Real-time listener cho patients collection
  - addPatient, updatePatient, deletePatient
  - getPatientById, searchPatients
  - Auto-sync với Firestore

### 3. ✅ Code Migration
- **Login Component** (`src/pages/Login/Login.jsx`): 
  - Đã migrate từ localStorage → Firebase Auth
  - Tích hợp `useAuth` hook
  - Error messages tiếng Việt
  
- **App.jsx**:
  - Đã wrap với `AuthProvider`
  - Protected routes kiểm tra Firebase auth state
  - Loading state khi check authentication
  
- **PatientManagement** (`src/pages/PatientManagement/PatientManagement.jsx`):
  - Đã migrate từ localStorage → Firestore
  - Real-time sync patients
  - Async CRUD operations
  - Loading & error states

### 4. ✅ Security Rules
- File: `firestore.rules` đã được tạo
  - Authenticated users: đọc/ghi patients
  - Public users: không truy cập trực tiếp Firestore
  - Role-based access (chuẩn bị cho Phase 6)

---

## 🚀 Bước tiếp theo - Setup Firebase Console

### Step 1: Enable Firebase Authentication

1. Vào Firebase Console: https://console.firebase.google.com/
2. Chọn project: **medlinkband-a7a8c**
3. Sidebar → **Authentication** → **Get Started**
4. Tab **Sign-in method** → Enable **Email/Password**
5. **Không** cần enable "Email link (passwordless sign-in)"

### Step 2: Create Admin User

1. Vào **Authentication** → **Users** tab
2. Click **Add User**
3. Nhập:
   - Email: `admin@medlinkband.vn`
   - Password: (chọn password mạnh, ví dụ: `MedLink@2024!`)
4. Click **Add User**

✅ Copy password này và ghi nhớ để đăng nhập!

### Step 3: Enable Firestore Database

1. Sidebar → **Firestore Database** → **Create Database**
2. Chọn location: **asia-southeast1 (Singapore)** (gần Việt Nam nhất)
3. Security rules: Chọn **Production mode** (sẽ config sau)
4. Click **Enable**

### Step 4: Configure Firestore Security Rules

1. Trong **Firestore Database** → Tab **Rules**
2. Copy toàn bộ nội dung file `firestore.rules` ở root project
3. Paste vào editor
4. Click **Publish**

✅ Rules này sẽ:
- Cho phép user đã đăng nhập đọc/ghi patients
- Block public access
- Chuẩn bị cho role-based access control

### Step 5: Create Firestore Indexes (if needed)

Hiện tại app chỉ query đơn giản, nhưng nếu Firebase báo lỗi index:

1. Click vào link trong error message
2. Hoặc vào **Firestore Database** → **Indexes** → **Create Index**
3. Collection: `patients`
4. Fields: 
   - `createdAt` (Descending)
5. Click **Create**

### Step 6: Migrate Mock Data to Firestore

**Option A: Manual (recommended for first time)**
1. Đăng nhập vào app: http://localhost:5173/login
2. Vào Dashboard
3. Click **Thêm mới** và nhập từng bệnh nhân

**Option B: Bulk Import (advanced)**
1. Vào **Firestore Database** → **Data** tab
2. Click **Start collection**
3. Collection ID: `patients`
4. Document ID: **Auto-ID**
5. Add fields theo cấu trúc từ `mockData.js`:

```javascript
{
  name: "Nguyễn Văn An",
  birthYear: 1952,
  gender: "Nam",
  bloodType: "O+",
  allergies: ["Penicillin", "Aspirin"],
  conditions: ["Tăng huyết áp", "Đái tháo đường"],
  emergencyContacts: [
    {
      name: "Nguyễn Thị Bình",
      phone: "0912345678",
      relationship: "Con gái"
    }
  ],
  doctorContact: {
    name: "BS. Lê Hoàng Minh",
    phone: "0901234567",
    hospital: "BV Chợ Rẫy"
  },
  braceletStatus: "active",
  createdAt: (timestamp),
  updatedAt: (timestamp),
  medicalRecord: {
    medications: [...],
    examHistory: [...],
    specialInstructions: "..."
  }
}
```

**Option C: Firebase Admin SDK Script (fastest)**
Tạo file `scripts/migrateData.js`:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const { mockPatients } = require('../src/data/mockData');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function migrate() {
  const batch = db.batch();
  
  mockPatients.forEach(patient => {
    const docRef = db.collection('patients').doc();
    batch.set(docRef, {
      ...patient,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  });
  
  await batch.commit();
  console.log('✅ Migrated', mockPatients.length, 'patients');
}

migrate().then(() => process.exit(0));
```

Run: `node scripts/migrateData.js`

---

## 🧪 Testing

### Test 1: Login
1. Chạy: `npm run dev`
2. Mở: http://localhost:5173/login
3. Nhập:
   - Email: `admin@medlinkband.vn`
   - Password: (password bạn đã tạo ở Step 2)
4. ✅ Nếu thành công → redirect to /dashboard

### Test 2: CRUD Patients
1. Click **Thêm mới** → Nhập thông tin bệnh nhân
2. ✅ Check Firestore Console → collection `patients` → document mới xuất hiện
3. Edit bệnh nhân → ✅ Check Firestore → data updated
4. Delete bệnh nhân → ✅ Check Firestore → document deleted

### Test 3: Real-time Sync
1. Mở 2 tabs của app: http://localhost:5173/dashboard
2. Tab 1: Thêm bệnh nhân mới
3. ✅ Tab 2: Tự động hiển thị bệnh nhân mới (không cần refresh)

### Test 4: Search & Filter
1. Nhập tên bệnh nhân vào search box
2. ✅ Kết quả hiển thị đúng
3. Filter theo nhóm máu, trạng thái
4. ✅ Table update real-time

### Test 5: Logout & Session Persistence
1. Đăng nhập
2. Refresh page → ✅ Vẫn logged in
3. Click Logout → ✅ Redirect to /login
4. Vào /dashboard trực tiếp → ✅ Redirect to /login

---

## 🐛 Common Issues & Fixes

### Issue 1: "Firebase: Error (auth/user-not-found)"
**Cause:** Chưa tạo admin user hoặc sai email
**Fix:** Vào Firebase Console → Authentication → Users → Add User

### Issue 2: "Missing or insufficient permissions"
**Cause:** Firestore rules chưa config đúng
**Fix:** 
1. Copy `firestore.rules` vào Firebase Console
2. Publish rules
3. Refresh app

### Issue 3: "Firebase: Error (auth/wrong-password)"
**Cause:** Sai password
**Fix:** Reset password trong Firebase Console hoặc sử dụng Forgot Password flow

### Issue 4: Patients không hiển thị
**Cause:** Collection `patients` rỗng
**Fix:** Migrate mock data (xem Step 6)

### Issue 5: Real-time không hoạt động
**Cause:** Firestore listener chưa được setup
**Fix:** Check `usePatients.js` → useEffect đã return unsubscribe chưa

---

## 📊 Firebase Console Checklist

- [ ] Authentication enabled
- [ ] Admin user created: `admin@medlinkband.vn`
- [ ] Firestore Database enabled (asia-southeast1)
- [ ] Security rules published
- [ ] Indexes created (if needed)
- [ ] Mock data migrated (at least 1-2 patients for testing)

---

## 🎯 Success Criteria

✅ Phase 2 hoàn thành khi:
1. Đăng nhập/đăng xuất hoạt động với Firebase Auth
2. CRUD patients hoạt động với Firestore
3. Real-time sync hoạt động (multi-tab test pass)
4. Search & filter hoạt động
5. Session persistence hoạt động (refresh không mất session)
6. Không còn dùng localStorage cho auth/patients data

---

## 📝 Notes

- **Security**: Firestore rules hiện tại chỉ check authentication. Phase 6 sẽ implement role-based access.
- **Emergency Info Page**: Vẫn dùng mock data. Phase 4 sẽ tạo Cloud Function để public access an toàn.
- **Doctor Auth Page**: Vẫn dùng hardcoded password. Phase 6 sẽ implement OTP verification.
- **Offline Support**: Phase 7 sẽ implement Firestore offline persistence.

---

## ⏭️ Next: Phase 3 - Deployment

Sau khi Phase 2 hoàn tất, chuyển sang:
1. Push code lên GitHub
2. Deploy to Vercel
3. Config production Firebase
4. Test trên production URL

📖 Đọc: `DEPLOY.md` để tiếp tục!

---

**Last updated:** 2024-12-XX  
**Status:** ✅ Code complete - Waiting for Firebase Console setup
