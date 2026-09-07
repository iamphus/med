# Scripts - MedLink Band

Thư mục này chứa các utility scripts cho project.

## 📄 Available Scripts

### `migrateData.js` - Firebase Data Migration

**Mục đích:** Import mock data từ `src/data/mockData.js` vào Firestore.

**Khi nào dùng:**
- Setup project lần đầu tiên
- Reset database về trạng thái mẫu
- Populate Firestore với demo data

**Prerequisites:**
1. ✅ Đã enable Firestore trong Firebase Console
2. ✅ Đã install: `npm install firebase-admin`
3. ✅ Đã download Service Account Key (xem bên dưới)

---

## 🔑 How to Get Service Account Key

### Step 1: Vào Firebase Console
1. Mở: https://console.firebase.google.com/
2. Chọn project: **medlinkband-a7a8c**

### Step 2: Generate Private Key
1. Click **⚙️ (Settings icon)** → **Project Settings**
2. Tab **Service Accounts**
3. Click **Generate new private key**
4. Confirm → Download file JSON

### Step 3: Save File
1. Rename file thành: `serviceAccountKey.json`
2. Copy vào: `scripts/serviceAccountKey.json`

⚠️ **IMPORTANT:** File này chứa credentials - KHÔNG commit vào Git!  
✅ File đã được add vào `.gitignore` - an toàn!

---

## 🚀 How to Run

### 1. Install Dependencies (if not installed)
```bash
npm install firebase-admin
```

### 2. Run Migration Script
```bash
node scripts/migrateData.js
```

### 3. Verify Results
- Check Firebase Console → Firestore Database
- Collection `patients` should have 5 documents
- Run app: `npm run dev`
- Login and check Dashboard

---

## 📊 What This Script Does

1. ✅ Connects to Firestore using Admin SDK
2. ✅ Reads mock data from local array
3. ✅ Creates batch write (efficient)
4. ✅ Adds 5 patients:
   - Nguyễn Văn An (O+) - Tăng huyết áp, Đái tháo đường
   - Trần Thị Mai (AB-) - Alzheimer, Loãng xương
   - Lê Quang Vinh (B+) - Động kinh, Hen suyễn
   - Phạm Thị Hồng (A+) - Suy tim, Rung nhĩ (locked)
   - Võ Thanh Sơn (O-) - Parkinson, Trầm cảm
5. ✅ Sets `createdAt` and `updatedAt` timestamps
6. ✅ Auto-generates Firestore document IDs

---

## ⚠️ Important Notes

### Security
- **NEVER** commit `serviceAccountKey.json` to Git
- This file has **FULL ACCESS** to your Firebase project
- If leaked, immediately revoke key in Firebase Console

### Data Persistence
- Script **ADDS** data, không xóa data cũ
- Nếu chạy nhiều lần → duplicate data
- To reset: Xóa collection trong Firestore Console trước

### Error Handling
Script sẽ exit với error nếu:
- ❌ `serviceAccountKey.json` not found
- ❌ Firestore not enabled
- ❌ Invalid credentials
- ❌ Network error
- ❌ Security rules block write

---

## 🔍 Troubleshooting

### Error: "serviceAccountKey.json not found"
**Solution:** Download key theo hướng dẫn trên

### Error: "Missing or insufficient permissions"
**Solution:** 
1. Check Firestore đã enabled chưa
2. Check security rules có cho phép write không
3. Tạm thời set rules = allow write (test mode)

### Error: "ENOTFOUND" or network error
**Solution:**
1. Check internet connection
2. Check firewall không block Firebase
3. Try lại sau vài phút

### Data không hiển thị trong app
**Solution:**
1. Verify Firestore Console có data
2. Check collection name đúng: `patients`
3. Refresh app và đăng nhập lại
4. Check browser console for errors

---

## 🎯 Alternative Methods

Nếu không muốn dùng Admin SDK script, có thể:

### Option 1: Manual Import (Slowest)
1. Run `npm run dev`
2. Login vào Dashboard
3. Click **Thêm mới** 5 lần
4. Copy từ `mockData.js` vào form

**Pros:** Không cần Service Account Key  
**Cons:** Slow, tedious

### Option 2: Firestore Console Import (Medium)
1. Vào Firestore Console → **Data** tab
2. **Start collection:** `patients`
3. **Add document** 5 lần
4. Copy/paste từ `mockData.js`

**Pros:** Không cần script  
**Cons:** Still manual, JSON format khác nhau

### Option 3: Admin SDK Script (Fastest) ⭐ RECOMMENDED
1. Download Service Account Key
2. Run `node scripts/migrateData.js`
3. Done!

**Pros:** Fast, automated, repeatable  
**Cons:** Cần setup Service Account Key

---

## 📝 Script Maintenance

**File:** `migrateData.js`  
**Last updated:** 2024-12-XX  
**Dependencies:** `firebase-admin`  
**Tested:** ✅ Node v18, v20

**Future Improvements:**
- [ ] Add CLI arguments (--reset, --count)
- [ ] Support CSV import
- [ ] Add progress bar
- [ ] Support incremental updates
- [ ] Add rollback function

---

## 🆘 Need Help?

- 📖 Read: `../PHASE2_SETUP_GUIDE.md`
- 📖 Read: `../FIREBASE_SETUP.md`
- 🔗 Firebase Admin SDK Docs: https://firebase.google.com/docs/admin/setup
- 🔗 Firestore Docs: https://firebase.google.com/docs/firestore

---

**Author:** MedLink Band Development Team  
**License:** Private - Internal Use Only
