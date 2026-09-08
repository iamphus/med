# 🍎 iOS Download QR Code Fix - UPDATED

## Vấn đề
Trên iOS Safari, việc tải ảnh QR Code về không hoạt động do **2 vấn đề**:
1. iOS không cho phép programmatic download (`.click()` trên `<a>` element)
2. **iOS Popup Blocker** chặn `window.open()` khi gọi trong async callback (như `img.onload`)

## Giải pháp Cuối Cùng ✅

### Key Solution: Mở window NGAY LẬP TỨC
```javascript
// ✅ ĐÚNG: Mở window TRƯỚC KHI bất kỳ async operation nào
const newWindow = isIOS ? window.open('', '_blank') : null;

// Show loading first
if (newWindow) {
  newWindow.document.write('<html>Loading...</html>');
}

// Sau đó trong img.onload callback:
img.onload = () => {
  // Generate image...
  
  if (isIOS && newWindow) {
    // Update content của window đã mở
    newWindow.document.open();
    newWindow.document.write('<!-- Final HTML -->');
    newWindow.document.close();
  }
};
```

### Tại sao cách này hoạt động?
- **iOS Popup Blocker Rule**: `window.open()` chỉ được phép gọi **trực tiếp** trong user event handler (như `onClick`)
- Nếu gọi trong **async callback** (`img.onload`, `setTimeout`, `Promise.then`) → BỊ CHẶN ❌
- Giải pháp: Mở window ngay, update content sau ✅

## Code Implementation

### File: `src/components/QRCodeCard.jsx`

```javascript
const handleDownloadQR = () => {
  const svg = qrRef.current.querySelector('svg');
  if (!svg) return;

  // CRITICAL: Open window IMMEDIATELY (synchronously in event handler)
  const newWindow = isIOS ? window.open('', '_blank') : null;
  
  // Show loading state
  if (newWindow) {
    newWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <body style="text-align: center; padding: 50px;">
          ⏳ Đang tạo mã QR...
        </body>
      </html>
    `);
  }

  // Async operations...
  const img = new Image();
  img.onload = () => {
    // Generate PNG...
    const pngFile = canvas.toDataURL('image/png');
    
    if (isIOS && newWindow) {
      // Update the ALREADY-OPENED window
      newWindow.document.open();
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <!-- Beautiful final page with QR image -->
        </html>
      `);
      newWindow.document.close();
    } else {
      // Desktop: direct download
      downloadLink.click();
    }
  };
};
```

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

## Testing Checklist

### ✅ Test trên iOS Safari:
1. Mở app trên iPhone/iPad Safari
2. Login và vào trang Quản lý Bệnh nhân
3. Chọn 1 bệnh nhân → Nhấn "Xem Mã QR"
4. Nhấn nút **"Mở ảnh QR"**
5. **Verify**: Tab mới mở ngay lập tức (hiện "Đang tạo mã QR...")
6. **Verify**: Sau 1-2 giây, ảnh QR xuất hiện với đầy đủ thông tin
7. Nhấn giữ ảnh → Chọn **"Lưu vào Ảnh"**
8. Kiểm tra thư viện ảnh iPhone → ảnh đã được lưu ✅

### ✅ Test trên Android/Desktop:
1. Làm tương tự trên Chrome/Firefox
2. Nhấn nút **"Tải Mã QR (PNG)"**
3. File tự động download về thư mục Downloads
4. Kiểm tra file: `QR_MedLink_TenBenhNhan_ID.png` ✅

## Common Issues & Solutions

### ❌ Issue: Popup bị chặn trên iOS
**Cause**: `window.open()` được gọi sau async operation  
**Solution**: Mở window NGAY trong event handler, update content sau

### ❌ Issue: Blank page trên iOS
**Cause**: Không gọi `document.close()` sau `document.write()`  
**Solution**: Luôn gọi `newWindow.document.close()`

### ❌ Issue: Image không load trên iOS
**Cause**: Data URL quá dài hoặc format không đúng  
**Solution**: Dùng `canvas.toDataURL('image/png')` (đã implement)

## Technical Deep Dive

### iOS Popup Blocker Rules
```javascript
// ❌ BỊ CHẶN
button.onclick = () => {
  setTimeout(() => {
    window.open(url); // BLOCKED! (async)
  }, 100);
};

// ❌ BỊ CHẶN
button.onclick = async () => {
  await fetch(url);
  window.open(url); // BLOCKED! (after await)
};

// ✅ HOẠT ĐỘNG
button.onclick = () => {
  const win = window.open(); // Opened immediately!
  
  fetch(url).then(data => {
    win.document.write(data); // Update later
    win.document.close();
  });
};
```

### Canvas to Data URL
- SVG → Canvas: `drawImage()`
- Canvas → PNG: `canvas.toDataURL('image/png')`
- Size: Thêm padding 80px width, 140px height cho header/footer
- Quality: Sử dụng QR level 'H' (high) để chống blur

---

**Fixed by:** Kiro AI  
**Date:** 2026-09-08  
**Status:** ✅ Ready for deployment  
**Version:** 2.0 - Popup Blocker Fixed
