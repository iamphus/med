# 🎬 Demo: Medical Autocomplete

## Cách test chức năng mới

### Bước 1: Chạy App
```bash
npm run dev
```

### Bước 2: Đăng nhập
- Username: admin@medlink.vn
- Password: medlink2024

### Bước 3: Thêm Bệnh Nhân Mới
1. Click nút **"Thêm Bệnh Nhân"**
2. Scroll xuống phần **"Thông tin y tế"**

---

## 🔍 Test Case 1: Tìm kiếm Dị ứng

### Field: "Dị ứng"

**Input:** `peni`
**Expected:**
```
┌──────────────────────────────────────┐
│ ● Penicillin              [Cao]     │
│   Kháng sinh                         │
└──────────────────────────────────────┘
```

**Input:** `aspirin`
**Expected:**
```
┌──────────────────────────────────────┐
│ ● Aspirin                 [Cao]     │
│   Giảm đau                           │
└──────────────────────────────────────┘
```

**Input:** `hải sản`
**Expected:**
```
┌──────────────────────────────────────┐
│ ● Hải sản (tôm, cua)      [Cao]     │
│   Thực phẩm                          │
├──────────────────────────────────────┤
│ ● Sò, ốc, nghêu           [Cao]     │
│   Thực phẩm                          │
└──────────────────────────────────────┘
```

**Input:** `kháng sinh`
**Expected:**
```
┌──────────────────────────────────────┐
│ ● Penicillin              [Cao]     │
│   Kháng sinh                         │
├──────────────────────────────────────┤
│ ● Amoxicillin             [Cao]     │
│   Kháng sinh                         │
├──────────────────────────────────────┤
│ ● Ampicillin              [Cao]     │
│   Kháng sinh                         │
├──────────────────────────────────────┤
│ ... (9 results total)                │
└──────────────────────────────────────┘
```

---

## 🏥 Test Case 2: Tìm kiếm Bệnh nền

### Field: "Bệnh nền"

**Input:** `tiểu đường`
**Expected:**
```
┌──────────────────────────────────────────┐
│ ● Đái tháo đường type 2      [Cao]     │
│   Nội tiết • ICD-10: E11                │
├──────────────────────────────────────────┤
│ ● Đái tháo đường type 1      [Cao]     │
│   Nội tiết • ICD-10: E10                │
└──────────────────────────────────────────┘
```

**Input:** `tăng`
**Expected:**
```
┌──────────────────────────────────────────┐
│ ● Tăng huyết áp              [TB]      │
│   Tim mạch • ICD-10: I10                │
├──────────────────────────────────────────┤
│ ● Glaucoma (Tăng nhãn áp)   [TB]      │
│   Mắt • ICD-10: H40                     │
└──────────────────────────────────────────┘
```

**Input:** `i10`
**Expected:**
```
┌──────────────────────────────────────────┐
│ ● Tăng huyết áp              [TB]      │
│   Tim mạch • ICD-10: I10                │
└──────────────────────────────────────────┘
```

**Input:** `tim mạch`
**Expected:**
```
┌──────────────────────────────────────────┐
│ ● Tăng huyết áp              [TB]      │
│   Tim mạch • ICD-10: I10                │
├──────────────────────────────────────────┤
│ ● Bệnh mạch vành             [Cao]     │
│   Tim mạch • ICD-10: I25                │
├──────────────────────────────────────────┤
│ ● Suy tim                    [Cao]     │
│   Tim mạch • ICD-10: I50                │
├──────────────────────────────────────────┤
│ ... (8 results total)                    │
└──────────────────────────────────────────┘
```

---

## ⌨️ Test Case 3: Keyboard Navigation

1. **Gõ:** `peni`
2. **Press:** `↓` (Arrow Down)
   - → Item đầu tiên được highlight
3. **Press:** `Enter`
   - → "Penicillin" được thêm vào tag list
4. **Gõ:** `aspirin`
5. **Press:** `Enter` (không cần arrow)
   - → "Aspirin" được thêm vào tag list
6. **Press:** `Escape`
   - → Dropdown đóng

---

## 🖱️ Test Case 4: Mouse Interaction

1. **Gõ:** `tăng`
2. **Hover** chuột lên "Tăng huyết áp"
   - → Item được highlight
3. **Click** vào item
   - → "Tăng huyết áp" được thêm vào tag list
4. **Click** icon ❌ trên tag
   - → Tag bị xóa

---

## 📱 Test Case 5: Mobile Responsive

### Desktop View
```
┌──────────────────────────────────────────────────────────┐
│ [🔍] Tìm kiếm dị ứng (thuốc, thực phẩm...)___________   │
│                                                           │
│ ┌────────────────────────────────────────────────────┐   │
│ │ ● Penicillin                          [Cao]       │   │
│ │   Kháng sinh                                       │   │
│ ├────────────────────────────────────────────────────┤   │
│ │ ● Aspirin                             [Cao]       │   │
│ │   Giảm đau                                         │   │
│ └────────────────────────────────────────────────────┘   │
│                                                           │
│ [Penicillin ❌] [Aspirin ❌] [Hải sản ❌]                │
└──────────────────────────────────────────────────────────┘
```

### Mobile View (< 640px)
```
┌───────────────────────────────────┐
│ [🔍] Tìm kiếm dị ứng...________  │
│                                   │
│ ┌─────────────────────────────┐   │
│ │ ● Penicillin      [Cao]    │   │
│ │   Kháng sinh                │   │
│ ├─────────────────────────────┤   │
│ │ ● Aspirin         [Cao]    │   │
│ │   Giảm đau                  │   │
│ └─────────────────────────────┘   │
│                                   │
│ [Penicillin ❌]                  │
│ [Aspirin ❌]                     │
│ [Hải sản ❌]                     │
└───────────────────────────────────┘
```

---

## ✅ Test Case 6: Tag Management

### Thêm tags:
1. Chọn "Penicillin" → Tag xuất hiện màu đỏ
2. Chọn "Aspirin" → Tag thứ 2 xuất hiện
3. Chọn "Hải sản (tôm, cua)" → Tag thứ 3 xuất hiện

**Visual:**
```
┌──────────────────────────────────────────────────────┐
│ [Penicillin ❌] [Aspirin ❌] [Hải sản (tôm, cua) ❌] │
└──────────────────────────────────────────────────────┘
```

### Xóa tag:
- Click ❌ trên "Aspirin"
- → Tag biến mất
- → Input field vẫn focus để tiếp tục nhập

---

## 🚫 Test Case 7: Prevent Duplicates

1. **Chọn:** "Penicillin"
   - → Tag xuất hiện
2. **Gõ lại:** `peni`
   - → "Penicillin" KHÔNG hiện trong dropdown (đã chọn rồi)
3. **Chọn:** "Amoxicillin"
   - → Tag thứ 2 xuất hiện

---

## 🎨 Test Case 8: Severity Colors

### Dị ứng
- **🔴 Đỏ (Cao):** Penicillin, Aspirin, Morphine, Iodine, Latex, Hải sản, Đậu phộng
- **🟠 Cam (TB):** Ibuprofen, Paracetamol, Lidocaine, Trứng, Cá
- **🔵 Xanh (Thấp):** Băng dính y tế, Cồn y tế, Phấn hoa, Bụi nhà

### Bệnh nền
- **🔴 Đỏ (Cao):** Suy tim, Rung nhĩ, Đột quỵ, Alzheimer, COPD, Xơ gan
- **🟠 Cam (TB):** Tăng huyết áp, Hen suyễn, Gút, Trầm cảm, Glaucoma
- **🔵 Xanh (Thấp):** Suy tĩnh mạch, Táo bón, Đau lưng, Mất ngủ, Điếc

---

## 📊 Test Case 9: Performance

### Metrics to check (F12 → Network/Performance)

**Initial Load:**
- Request to `medical_allergies` collection
- Request to `medical_conditions` collection
- Total time: ~100-200ms

**Search Performance:**
- Không có request nào (client-side filter)
- Latency: <10ms

**Memory:**
- Check Memory profiler
- Cached data: ~50KB

---

## 🔍 Test Case 10: Edge Cases

### Empty input
- Input: `""` (empty)
- Expected: Không hiện dropdown

### No results
- Input: `xyz123` (gibberish)
- Expected: Không hiện dropdown hoặc "No results"

### Very long input
- Input: 100+ characters
- Expected: Vẫn search bình thường

### Special characters
- Input: `(C)` hoặc `+` hoặc `-`
- Expected: Search như bình thường (A+, AB-, etc.)

---

## 🐛 Debugging

### Nếu không hiện suggestions:

1. **Check Console:**
```javascript
// Should see:
useMedicalData.js: Fetching medical data...
useMedicalData.js: Loaded 45 allergies
useMedicalData.js: Loaded 60 conditions
```

2. **Check Network Tab:**
```
✅ GET firestore.googleapis.com/.../medical_allergies
✅ GET firestore.googleapis.com/.../medical_conditions
```

3. **Check Firestore Console:**
- Collection `medical_allergies` có 45 docs
- Collection `medical_conditions` có 60 docs

4. **Check Firestore Rules:**
```javascript
match /medical_allergies/{id} {
  allow read: if true; ✅
}
```

---

## 📸 Screenshots to Take (for Documentation)

1. **Empty state:** Form với empty input
2. **Search results:** Dropdown với suggestions
3. **Selected tags:** Tags màu đỏ/vàng với icon ❌
4. **Severity badges:** Close-up của [Cao], [TB], [Thấp]
5. **ICD-10 display:** "ICD-10: I10" trong suggestion
6. **Mobile view:** Responsive layout < 640px
7. **Keyboard focus:** Highlighted item khi dùng arrow keys

---

## 🎥 Video Demo Script (Optional)

### Script (30 seconds):
```
0:00 - Open form "Thêm Bệnh Nhân"
0:03 - Scroll to "Thông tin y tế"
0:05 - Click input "Dị ứng"
0:07 - Type "peni"
0:10 - Show dropdown with "Penicillin"
0:12 - Press Enter to select
0:14 - Type "hải sản"
0:17 - Click on "Hải sản (tôm, cua)"
0:20 - Show 2 tags: [Penicillin ❌] [Hải sản ❌]
0:22 - Click input "Bệnh nền"
0:24 - Type "tiểu đường"
0:27 - Click "Đái tháo đường type 2"
0:30 - Show complete form with tags
```

---

**Status:** Ready for Demo ✅  
**Test Coverage:** 10 test cases  
**Expected Duration:** 5-10 minutes for full manual test
