# 🏥 Hướng dẫn Setup Dữ Liệu Y Tế

## Tổng quan

Tính năng mới cho phép tìm kiếm và chọn dị ứng/bệnh nền từ danh sách chuẩn hóa thay vì nhập tay.

### Điểm nổi bật:
- ✅ **45 dị ứng phổ biến** (thuốc, thực phẩm, môi trường)
- ✅ **60 bệnh nền phổ biến** (tim mạch, thần kinh, tiêu hóa, etc.)
- ✅ **Autocomplete thông minh** với mức độ nghiêm trọng
- ✅ **Hiển thị ICD-10 code** cho bệnh nền
- ✅ **Tìm kiếm theo tên hoặc danh mục**

---

## 📊 Dữ liệu đã Upload

### Collections trong Firestore:

#### 1. `medical_allergies` (45 documents)
```javascript
{
  id: "allergy-001",
  name: "Penicillin",
  category: "Kháng sinh",
  severity: "high", // high | medium | low
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**Danh mục:**
- Kháng sinh (9 loại)
- Giảm đau (6 loại)
- Giảm đau mạnh/Gây tê (5 loại)
- Nội tiết/Tim mạch (5 loại)
- Chẩn đoán/Vật liệu (5 loại)
- Thực phẩm (9 loại)
- Môi trường/Côn trùng (6 loại)

#### 2. `medical_conditions` (60 documents)
```javascript
{
  id: "condition-001",
  name: "Tăng huyết áp",
  category: "Tim mạch",
  icd10: "I10",
  severity: "medium",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**Danh mục:**
- Tim mạch (8 bệnh)
- Nội tiết (7 bệnh)
- Thần kinh (8 bệnh)
- Hô hấp (5 bệnh)
- Tiêu hóa (7 bệnh)
- Thận-Tiết niệu (4 bệnh)
- Xương khớp (5 bệnh)
- Tâm thần (5 bệnh)
- Mắt/Tai (4 bệnh)
- Ung thư (5 bệnh)
- Huyết học (2 bệnh)

#### 3. `medical_metadata` (1 document)
```javascript
{
  totalAllergies: 45,
  totalConditions: 60,
  lastUpdated: timestamp,
  categories: {
    allergies: ["Kháng sinh", "Giảm đau", ...],
    conditions: ["Tim mạch", "Nội tiết", ...]
  }
}
```

---

## 🚀 Cách Setup

### Bước 1: Upload Dữ liệu (✅ Đã hoàn thành)

```bash
node scripts/uploadMedicalData.cjs
```

**Output:**
```
🚀 Bắt đầu upload dữ liệu y tế lên Firestore...
✅ Đã upload 45 dị ứng
✅ Đã upload 60 bệnh nền
✅ Đã tạo metadata
🎉 HOÀN TẤT!
```

### Bước 2: Deploy Firestore Rules

Rules đã được cập nhật trong `firestore.rules` để cho phép:
- ✅ PUBLIC READ cho `medical_allergies`, `medical_conditions`, `medical_metadata`
- ❌ WRITE disabled (chỉ script/admin mới được thêm/sửa)

**Deploy rules:**

```bash
# Đăng nhập Firebase (nếu chưa)
firebase login

# Chọn project
firebase use medlinkband-a7a8c

# Deploy rules
firebase deploy --only firestore:rules
```

**Hoặc deploy thủ công:**
1. Vào Firebase Console: https://console.firebase.google.com/
2. Chọn project **medlinkband-a7a8c**
3. Vào **Firestore Database** → **Rules**
4. Copy nội dung từ `firestore.rules` và paste vào
5. Click **Publish**

### Bước 3: Test Chức năng

1. Chạy app: `npm run dev`
2. Đăng nhập
3. Click **Thêm Bệnh Nhân Mới**
4. Thử tìm kiếm trong field **Dị ứng** và **Bệnh nền**

**Test cases:**
- Gõ "peni" → Nên thấy "Penicillin"
- Gõ "tiểu đường" → Nên thấy "Đái tháo đường type 2"
- Gõ "tăng" → Nên thấy "Tăng huyết áp"
- Gõ "hải sản" → Nên thấy "Hải sản (tôm, cua)"

---

## 🎨 UI/UX Features

### MedicalAutocomplete Component

**Tính năng:**
- 🔍 Search-as-you-type
- ⬆️⬇️ Điều hướng bằng phím mũi tên
- ⏎ Chọn bằng Enter
- ⭕ Click outside để đóng
- 🏷️ Badge màu sắc theo mức độ nghiêm trọng:
  - 🔴 **Cao** (High) - Đỏ
  - 🟠 **TB** (Medium) - Cam
  - 🔵 **Thấp** (Low) - Xanh

**Hiển thị thông tin:**
- Tên dị ứng/bệnh
- Danh mục
- Mức độ nghiêm trọng
- ICD-10 code (chỉ bệnh nền)

---

## 📝 Code Changes

### Files đã tạo mới:

1. **`src/data/medicalData.js`**
   - Export `commonAllergies` (45 items)
   - Export `commonConditions` (60 items)
   - Helper functions: `searchAllergies()`, `searchConditions()`

2. **`src/components/MedicalAutocomplete.jsx`**
   - Component autocomplete tái sử dụng
   - Props: `type`, `placeholder`, `selectedItems`, `onAdd`, `onRemove`, `searchFunction`

3. **`src/components/MedicalAutocomplete.css`**
   - Styling cho dropdown, badges, severity levels

4. **`scripts/uploadMedicalData.cjs`**
   - Script upload data lên Firestore
   - Batch write với progress indicator

### Files đã sửa:

1. **`src/pages/PatientManagement/PatientForm.jsx`**
   - Thay input text bằng `<MedicalAutocomplete />`
   - Import `searchAllergies`, `searchConditions`
   - Đơn giản hóa logic: `addAllergy()`, `removeAllergy()`, `addCondition()`, `removeCondition()`

2. **`firestore.rules`**
   - Thêm rules cho `medical_allergies`, `medical_conditions`, `medical_metadata`
   - Allow public read, deny write

3. **`scripts/README.md`**
   - Thêm documentation cho script mới

---

## 🔒 Security

### Firestore Rules
```javascript
match /medical_allergies/{allergyId} {
  allow read: if true;  // Public read OK (không có dữ liệu nhạy cảm)
  allow write: if false; // Chỉ admin/script được thêm
}
```

**Lý do cho phép public read:**
- Dữ liệu là danh sách chuẩn y tế (không nhạy cảm)
- Cần thiết cho autocomplete ở client side
- Không chứa thông tin bệnh nhân cụ thể

---

## 📦 Dependencies

Không cần thêm dependencies mới. Sử dụng:
- ✅ `firebase-admin` (đã có trong scripts)
- ✅ `react-icons` (đã có)
- ✅ Native React hooks

---

## 🔧 Maintenance

### Thêm dị ứng/bệnh mới

**Cách 1: Sửa code và re-upload**
1. Edit `src/data/medicalData.js`
2. Edit `scripts/uploadMedicalData.cjs` (copy array từ medicalData.js)
3. Run: `node scripts/uploadMedicalData.cjs`

**Cách 2: Thêm trực tiếp trong Firestore Console**
1. Vào Firestore Console
2. Collection `medical_allergies` hoặc `medical_conditions`
3. Click **Add document**
4. Format:
```json
{
  "id": "allergy-046",
  "name": "Tên dị ứng",
  "category": "Danh mục",
  "severity": "high",
  "createdAt": [timestamp now],
  "updatedAt": [timestamp now]
}
```

### Xóa dữ liệu cũ

Nếu cần reset:
```bash
# Firestore Console
1. Vào Collections
2. Delete collection: medical_allergies
3. Delete collection: medical_conditions
4. Delete collection: medical_metadata
5. Chạy lại: node scripts/uploadMedicalData.cjs
```

---

## 🧪 Testing Checklist

- [ ] Dữ liệu đã upload đầy đủ (45 allergies + 60 conditions)
- [ ] Firestore rules đã deploy
- [ ] App chạy không lỗi console
- [ ] Autocomplete hiển thị suggestions
- [ ] Click chọn thêm được tag
- [ ] Xóa tag hoạt động
- [ ] Search không phân biệt hoa thường
- [ ] Responsive trên mobile
- [ ] Loading tốc độ nhanh

---

## 🎯 Kế hoạch Tương lai

### Phase 2: Enhanced Features
- [ ] Sync with international medical databases (ICD-11)
- [ ] Multilingual support (English, Vietnamese)
- [ ] Drug interaction warnings
- [ ] Severity-based UI alerts
- [ ] Export to PDF với formatted medical terms
- [ ] Integration với hệ thống bệnh viện

### Phase 3: AI Integration
- [ ] Auto-suggest based on patient history
- [ ] Natural language processing cho search
- [ ] Duplicate detection (Aspirin vs ASA)
- [ ] Medical abbreviation expansion

---

## ❓ FAQ

**Q: Tại sao không để user tự nhập?**
A: Chuẩn hóa dữ liệu giúp:
- Tránh lỗi chính tả
- Thống nhất thuật ngữ y tế
- Dễ dàng phân tích thống kê sau này
- Integrate với hệ thống khác (ICD-10)

**Q: Tôi có thể nhập custom allergy/condition không?**
A: Hiện tại component cho phép nhập custom text nếu không tìm thấy trong danh sách. Nhấn Enter khi không có suggestion.

**Q: Dữ liệu có update realtime không?**
A: Chưa. Nếu thêm dữ liệu mới vào Firestore, cần refresh page để load lại.

**Q: Có ảnh hưởng performance không khi load 100+ items?**
A: Không. Data được cache sau lần load đầu. Search diễn ra ở client side (rất nhanh).

---

## 📞 Support

Nếu gặp vấn đề:
1. Check browser console cho errors
2. Verify Firestore rules đã deploy
3. Check Firestore Console có data
4. Verify network requests trong DevTools

---

**Last Updated:** 2024-12-XX  
**Author:** MedLink Band Development Team  
**Version:** 1.0.0
