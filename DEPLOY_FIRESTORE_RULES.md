# Hướng dẫn Deploy Firestore Rules

## ✅ Thay đổi đã thực hiện

File `firestore.rules` đã được cập nhật để cho phép **đọc công khai** (public read) cho collection `patients`. Điều này cho phép bất kỳ ai quét mã QR đều có thể xem thông tin cấp cứu mà không cần đăng nhập.

### Thay đổi cụ thể:

**Trước:**
```
allow read: if isAuthenticated();
```

**Sau:**
```
allow read: true;
```

⚠️ **Lưu ý bảo mật:** Chỉ có quyền đọc (read) là công khai. Các thao tác tạo, cập nhật, xóa (create, update, delete) vẫn yêu cầu đăng nhập.

---

## 🚀 Cách 1: Deploy qua Firebase Console (Khuyên dùng)

1. Truy cập Firebase Console:
   ```
   https://console.firebase.google.com/project/medlinkband-a7a8c/firestore/rules
   ```

2. Copy toàn bộ nội dung file `firestore.rules` trong project

3. Paste vào editor trên Firebase Console

4. Click nút **"Publish"** để áp dụng thay đổi

✅ Hoàn tất! Bây giờ ai quét QR cũng xem được thông tin.

---

## 🖥️ Cách 2: Deploy qua Firebase CLI

### Bước 1: Đăng nhập Firebase CLI
```bash
firebase login
```

### Bước 2: Chọn project
```bash
firebase use medlinkband-a7a8c
```

### Bước 3: Deploy rules
```bash
firebase deploy --only firestore:rules
```

---

## 🧪 Kiểm tra sau khi deploy

1. **Đăng xuất** khỏi ứng dụng (hoặc dùng trình duyệt ẩn danh)

2. Quét mã QR của một bệnh nhân hoặc truy cập trực tiếp:
   ```
   https://your-domain.com/emergency/{patientId}
   ```

3. Bạn sẽ thấy thông tin cấp cứu **mà không cần đăng nhập**

---

## 📋 Các file đã tạo/cập nhật

- ✅ `firestore.rules` - Đã cập nhật allow read = true
- ✅ `firebase.json` - Cấu hình Firebase CLI
- ✅ `firestore.indexes.json` - Cấu hình indexes (rỗng)
- ✅ `DEPLOY_FIRESTORE_RULES.md` - Hướng dẫn này

---

## ❓ Troubleshooting

### Vẫn báo "Không tìm thấy thông tin"?

1. Kiểm tra xem rules đã được publish chưa trên Firebase Console
2. Đợi vài giây để rules được áp dụng
3. Xóa cache trình duyệt và thử lại
4. Kiểm tra Console log (F12) xem có lỗi gì không

### Firebase CLI báo lỗi authentication?

Chạy `firebase login` và đăng nhập lại.

### Rules deploy thành công nhưng vẫn không hoạt động?

Kiểm tra xem bạn có đang deploy đúng project không:
```bash
firebase use
```
