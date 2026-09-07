# Hướng dẫn ghi NFC cho Vòng Tay MedLink Band

## NFC là gì?

NFC (Near Field Communication) là công nghệ truyền dữ liệu không dây tầm ngắn (~4cm). Chip NFC có thể lưu trữ URL, khi điện thoại chạm vào → tự động mở link trong trình duyệt.

---

## Mua chip NFC nào?

### Khuyến nghị cho vòng tay:

| Loại | Giá | Đặc điểm | Link mẫu |
|------|-----|----------|----------|
| **NTAG213** | 2,000-5,000đ/cái | 144 bytes, đủ cho URL, chống nước | [Shopee](https://shopee.vn/search?keyword=ntag213) |
| **NTAG215** | 3,000-7,000đ/cái | 504 bytes, lưu nhiều hơn | [Shopee](https://shopee.vn/search?keyword=ntag215) |
| Vòng tay NFC sẵn | 30,000-80,000đ | Chip tích hợp trong vòng silicon | [Shopee](https://shopee.vn/search?keyword=vòng+tay+nfc) |

**Lưu ý:** 
- Chọn loại **chống nước** (waterproof)
- Dạng sticker mỏng để gắn vào vòng tay nhựa/silicon
- Hoặc mua vòng tay NFC sẵn (tiện nhất)

---

## Cách ghi NFC từ điện thoại

### Bước 1: Tải app NFC Writer

**Android:**
- [NFC Tools](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc) (Miễn phí, dễ dùng)
- [NFC TagWriter by NXP](https://play.google.com/store/apps/details?id=com.nxp.nfc.tagwriter)

**iPhone (iOS 13+):**
- Không cần app, dùng Shortcuts có sẵn
- Hoặc tải [NFC Tools](https://apps.apple.com/app/nfc-tools/id1252962749)

---

### Bước 2: Lấy link bệnh nhân

1. Đăng nhập vào MedLink Band dashboard
2. Tìm bệnh nhân cần ghi NFC
3. Click nút **"Tạo mã QR"**
4. Click **"Sao chép Link"**
5. Link sẽ có dạng: `https://medlinkband.vn/emergency/patient-001`

---

### Bước 3: Ghi vào chip NFC

#### Trên Android (dùng NFC Tools):

1. Mở app **NFC Tools**
2. Chọn tab **"Write"** (Ghi)
3. Click **"Add a record"** (Thêm bản ghi)
4. Chọn **"URL / URI"**
5. Paste link bệnh nhân vào
6. Click **"OK"**
7. Click **"Write"** (màu xanh ở góc dưới)
8. Đặt điện thoại sát chip NFC → Chờ "Write successful"

#### Trên iPhone (iOS):

**Cách 1: Dùng NFC Tools app**
- Giống Android

**Cách 2: Dùng Shortcuts (iOS 13+)**
1. Mở app **Shortcuts**
2. Chọn **Automation** > **Create Personal Automation**
3. Chọn **NFC**
4. Scan chip NFC trống
5. Thêm action **"Open URL"**
6. Paste link bệnh nhân
7. Save và test lại

---

## Test NFC sau khi ghi

1. Tắt màn hình điện thoại
2. Chạm chip NFC vào mặt sau điện thoại
3. Điện thoại sẽ rung/hiện thông báo
4. Click vào thông báo → Trang Emergency Info mở trong trình duyệt

**Lưu ý vị trí anten NFC trên điện thoại:**
- iPhone: Phía trên cạnh trên (gần camera sau)
- Samsung: Giữa lưng điện thoại
- Xiaomi/Oppo/Vivo: Gần camera sau

---

## Bảo mật NFC

### Lock chip NFC (khóa chống ghi đè)

Sau khi ghi xong, nên **lock** chip để tránh ai đó vô tình/cố ý ghi đè:

1. Trong app NFC Tools, vào tab **"Other"**
2. Chọn **"Set password"** hoặc **"Lock tag"**
3. Chọn **"Permanent lock"** (khóa vĩnh viễn - không thể ghi lại)
4. Chạm chip → Xác nhận

**Cảnh báo:** Sau khi lock, chip **không thể ghi lại** nữa. Chỉ lock khi đã test kỹ link hoạt động đúng.

---

## Quy trình sản xuất vòng tay hàng loạt

### Option 1: Tự ghi NFC (chi phí thấp)
1. Mua chip NFC sticker NTAG213 số lượng (VD: 100 cái = 200,000đ)
2. Mua vòng tay silicon trơn (VD: 100 cái = 500,000đ)
3. In logo MedLink Band lên vòng tay (tùy chọn)
4. Ghi NFC từng cái bằng điện thoại
5. Dán chip vào mặt trong vòng tay
6. Tổng: ~7,000đ/vòng

### Option 2: Đặt hàng OEM (scale lớn)
1. Liên hệ xưởng sản xuất vòng tay NFC (Trung Quốc/Việt Nam)
2. Gửi thiết kế + yêu cầu ghi sẵn URL động
3. MOQ thường 500-1000 cái
4. Giá: 15,000-30,000đ/vòng (đã in logo + ghi NFC)

---

## Troubleshooting

### Điện thoại không đọc được NFC

1. **Check NFC đã bật chưa:**
   - Android: Settings > Connected devices > Connection preferences > NFC
   - iPhone: NFC tự động bật từ iOS 13+

2. **Chip NFC bị hỏng:**
   - Test bằng điện thoại khác
   - Thử chip NFC khác

3. **Vị trí chạm sai:**
   - Thử chạm nhiều vị trí khác nhau trên lưng điện thoại
   - Giữ chip sát điện thoại 2-3 giây

### Link không mở đúng

1. **Check link đã copy đúng chưa:**
   - Link phải bắt đầu bằng `https://`
   - Không có khoảng trắng thừa

2. **Domain chưa trỏ đúng:**
   - Nếu dùng domain riêng (medlinkband.vn), check DNS đã trỏ về hosting chưa
   - Nếu chưa có domain, dùng link Vercel/Netlify tạm: `https://medlink-band.vercel.app/emergency/patient-001`

---

## Quy trình cấp phát vòng tay cho bệnh nhân

1. **Admin tạo hồ sơ bệnh nhân** trong dashboard
2. **Hệ thống tự động sinh ID** (VD: `patient-042`)
3. **Ghi link vào chip NFC:** `https://medlinkband.vn/emergency/patient-042`
4. **Gắn chip vào vòng tay** hoặc dùng vòng có sẵn chip
5. **Test NFC** bằng điện thoại → Đảm bảo hiện đúng thông tin
6. **Trao vòng tay cho bệnh nhân** + hướng dẫn sử dụng

---

## Chi phí ước tính cho 100 vòng tay

| Hạng mục | Số lượng | Đơn giá | Thành tiền |
|----------|----------|---------|------------|
| Chip NFC NTAG213 | 100 | 3,000đ | 300,000đ |
| Vòng tay silicon | 100 | 5,000đ | 500,000đ |
| In logo (tùy chọn) | 100 | 2,000đ | 200,000đ |
| **Tổng** | | | **1,000,000đ** |

**→ ~10,000đ/vòng** (tự sản xuất)

Nếu scale lên 1000 vòng, giá có thể giảm xuống còn 5,000-7,000đ/vòng.
