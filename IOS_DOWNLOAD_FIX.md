# 🍎 iOS Download QR Code Fix

## Vấn đề
Trên iOS Safari, việc tải ảnh QR Code về không hoạt động do các hạn chế bảo mật của iOS. iOS không cho phép programmatic download (gọi `.click()` trên element `<a>`) mà không có user interaction trực tiếp.

## Giải pháp
Đã implement giải pháp tự động phát hiện iOS và xử lý khác nhau:

### 📱 Trên iOS (iPhone/iPad)
- **Mở ảnh QR trong tab mới** với giao diện đẹp
- Người dùng có thể **nhấn giữ và chọn "Lưu vào Ảnh"**
- Hiển thị hướng dẫn rõ ràng ngay trên trang
- Button text: "Mở ảnh QR"

### 💻 Trên Android/Desktop
- **Download trực tiếp** file PNG như cũ
- Tên file: `QR_MedLink_{TênBệnhNhân}_{ID}.png`
- Button text: "Tải Mã QR (PNG)"

## Code Changes

### File: `src/components/QRCodeCard.jsx`

#### 1. Detect iOS
```javascript
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
```

#### 2. Xử lý Download theo Platform
```javascript
if (isIOS) {
  // iOS: Open in new tab with nice UI
  const newWindow = window.open();
  if (newWindow) {
    newWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <!-- Beautiful page with QR image and instructions -->
      </html>
    `);
  }
} else {
  // Android/Desktop: Direct download
  const downloadLink = document.createElement('a');
  downloadLink.download = filename;
  downloadLink.href = pngFile;
  downloadLink.click();
}
```

#### 3. Dynamic Button Text
```javascript
<button onClick={handleDownloadQR} className="btn btn-primary btn-lg">
  <FiDownload /> {isIOS ? 'Mở ảnh QR' : 'Tải Mã QR (PNG)'}
</button>
```

## Kết quả

### ✅ iOS (Safari/Chrome)
1. User nhấn nút "Mở ảnh QR"
2. Tab mới mở ra với ảnh QR đẹp, có thông tin bệnh nhân
3. User nhấn giữ vào ảnh
4. Chọn "Lưu vào Ảnh" từ menu
5. ✅ Ảnh đã lưu vào thư viện ảnh

### ✅ Android/Desktop
1. User nhấn nút "Tải Mã QR (PNG)"
2. File tự động download về máy
3. ✅ File đã lưu vào thư mục Downloads

## UI trên iOS
Trang mở ra trên iOS bao gồm:
- ✨ Responsive design đẹp mắt
- 📱 Viewport tối ưu cho mobile
- 🎨 Styling giống app chính
- 📝 Hiển thị đầy đủ: Tên, Mã BN, Nhóm máu
- 💡 Hướng dẫn rõ ràng: "Nhấn giữ vào ảnh và chọn 'Lưu vào Ảnh'"
- 🖼️ Ảnh QR code chất lượng cao

## Testing

### Test trên iOS Safari:
1. Mở app trên iPhone/iPad Safari
2. Vào trang Quản lý Bệnh nhân
3. Chọn 1 bệnh nhân và nhấn "Xem Mã QR"
4. Nhấn nút "Mở ảnh QR"
5. Verify: Tab mới mở với ảnh QR và hướng dẫn
6. Nhấn giữ ảnh → Chọn "Lưu vào Ảnh"
7. Check thư viện ảnh iPhone

### Test trên Android/Desktop:
1. Làm tương tự như trên
2. Nhấn nút "Tải Mã QR (PNG)"
3. Verify: File tự động download
4. Check thư mục Downloads

## Technical Notes

- **User Agent Detection**: Phát hiện iOS bằng regex `/iPad|iPhone|iPod/`
- **Canvas to Data URL**: Convert SVG → Canvas → PNG Data URL
- **window.open()**: iOS allow window.open() trong user event handler
- **Long-press gesture**: iOS native feature để save image
- **No dependencies added**: Pure JavaScript solution

## Deployment

Sau khi deploy lên Vercel/Firebase Hosting:
1. Test trên các iOS devices: iPhone, iPad
2. Test trên các browsers: Safari, Chrome iOS
3. Verify Android vẫn hoạt động bình thường
4. Document hướng dẫn cho users

---

**Fixed by:** Kiro AI  
**Date:** 2026-09-08  
**Status:** ✅ Ready for deployment
