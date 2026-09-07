# 🚀 Hướng dẫn Deploy MedLink Band

## Option 1: Deploy lên Vercel (Khuyến nghị)

### Tại sao chọn Vercel?
- ✅ Miễn phí cho personal projects
- ✅ CI/CD tự động từ GitHub
- ✅ CDN toàn cầu, tốc độ nhanh
- ✅ HTTPS mặc định
- ✅ Custom domain miễn phí

### Bước 1: Push code lên GitHub

```bash
# Khởi tạo git (nếu chưa có)
git init
git add .
git commit -m "Initial commit - MedLink Band v1.0"

# Tạo repo mới trên GitHub, sau đó:
git remote add origin https://github.com/YOUR_USERNAME/medlink-band.git
git branch -M main
git push -u origin main
```

### Bước 2: Deploy từ Vercel

1. Truy cập [vercel.com](https://vercel.com)
2. Sign up bằng GitHub account
3. Click **"New Project"**
4. Import repository: `medlink-band`
5. Framework Preset: **Vite** (tự detect)
6. Build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
7. Click **"Deploy"**

⏱ **Deploy xong trong ~2 phút**

### Bước 3: Custom Domain (Tùy chọn)

1. Mua domain tại [GoDaddy](https://godaddy.com) / [Tên Miền Việt](https://tenmien.vn) (~200k/năm)
2. Trong Vercel Dashboard, vào **Settings** > **Domains**
3. Add domain: `medlinkband.vn`
4. Copy DNS records Vercel cung cấp
5. Vào nhà cung cấp domain, update DNS:
   - Type: `A` → Value: `76.76.21.21`
   - Type: `CNAME` → Value: `cname.vercel-dns.com`
6. Chờ 5-30 phút để DNS propagate

✅ **Done!** Domain sẽ tự động có HTTPS

---

## Option 2: Deploy lên Netlify

### Bước 1: Push code lên GitHub (giống Vercel)

### Bước 2: Deploy từ Netlify

1. Truy cập [netlify.com](https://netlify.com)
2. Sign up bằng GitHub
3. Click **"Add new site"** > **"Import an existing project"**
4. Chọn repo GitHub: `medlink-band`
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click **"Deploy site"**

### Bước 3: Custom Domain

1. Vào **Site settings** > **Domain management**
2. Click **"Add custom domain"**
3. Nhập: `medlinkband.vn`
4. Netlify sẽ hướng dẫn config DNS (tương tự Vercel)

---

## Option 3: Deploy lên Firebase Hosting

### Bước 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Bước 2: Login & Init

```bash
firebase login
firebase init hosting
```

Chọn:
- Use existing project: `medlink-band` (project từ Firebase Console)
- Public directory: `dist`
- Single-page app: **Yes**
- GitHub auto-deploy: **No** (hoặc Yes nếu muốn CI/CD)

### Bước 3: Build & Deploy

```bash
npm run build
firebase deploy --only hosting
```

✅ **Deploy URL:** `https://medlink-band.web.app`

### Custom Domain trên Firebase

1. Vào Firebase Console > **Hosting**
2. Click **"Add custom domain"**
3. Nhập: `medlinkband.vn`
4. Verify ownership bằng TXT record
5. Update A records theo hướng dẫn

---

## Cấu hình Environment Variables

Nếu dùng Firebase, cần set env variables:

### Vercel
1. Vào **Settings** > **Environment Variables**
2. Thêm:
   - `VITE_FIREBASE_API_KEY` = `your-api-key`
   - `VITE_FIREBASE_AUTH_DOMAIN` = `your-auth-domain`
   - ... (các keys khác)

### Netlify
1. Vào **Site settings** > **Environment variables**
2. Thêm tương tự Vercel

### Local `.env` file
Tạo file `.env` trong root:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=medlink-band.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=medlink-band
VITE_FIREBASE_STORAGE_BUCKET=medlink-band.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

**Lưu ý:** File `.env` đã được thêm vào `.gitignore`, không bị commit lên GitHub

---

## So sánh các nền tảng

| Tính năng | Vercel | Netlify | Firebase |
|-----------|--------|---------|----------|
| **Free tier** | ✅ Unlimited | ✅ Unlimited | ✅ 10GB/month |
| **Build time** | Nhanh | Nhanh | Trung bình |
| **CDN** | ✅ Global | ✅ Global | ✅ Google CDN |
| **Custom domain** | ✅ Free | ✅ Free | ✅ Free |
| **Auto SSL** | ✅ | ✅ | ✅ |
| **CI/CD** | ✅ Auto | ✅ Auto | ⚠️ Manual |
| **Analytics** | ✅ Basic | ✅ Basic | ✅ Advanced |

**Khuyến nghị:** 
- **Vercel** - Nếu chỉ cần host frontend, đơn giản nhất
- **Firebase** - Nếu đã dùng Firebase Auth + Firestore (all-in-one)
- **Netlify** - Nếu cần Serverless Functions

---

## Kiểm tra sau khi deploy

### Checklist
- [ ] Trang login mở được: `https://your-domain.com/login`
- [ ] Đăng nhập thành công với `admin@medlinkband.vn / medlink2024`
- [ ] Dashboard load danh sách bệnh nhân mẫu
- [ ] Tạo QR code hoạt động
- [ ] Trang emergency mở đúng: `/emergency/patient-001`
- [ ] Doctor auth yêu cầu password
- [ ] Responsive trên mobile (test trên điện thoại)

### Test trên điện thoại thật

1. Mở URL trên Chrome mobile: `https://your-domain.com/emergency/patient-001`
2. Kiểm tra font đủ to, dễ đọc
3. Test nút "GỌI NGAY" → có mở app điện thoại không
4. Test responsive xoay ngang/dọc

---

## Cập nhật sau khi sửa code

### Vercel/Netlify (Auto deploy)
```bash
git add .
git commit -m "Update feature X"
git push origin main
```
→ Vercel/Netlify tự động build & deploy trong 1-2 phút

### Firebase (Manual)
```bash
npm run build
firebase deploy --only hosting
```

---

## Troubleshooting

### Lỗi: "Page not found" khi F5 trên route con

**Nguyên nhân:** SPA routing cần config redirect

**Fix cho Vercel:**
Tạo file `vercel.json` trong root:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Fix cho Netlify:**
Tạo file `public/_redirects`:
```
/*    /index.html   200
```

### Lỗi: Environment variables không load

- Vercel: Phải prefix `VITE_` cho mọi env var
- Sau khi add env, phải **Redeploy** lại project

### Domain không trỏ được

- Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
- DNS có thể mất 24-48 giờ để toàn cầu update
- Xóa cache browser (Ctrl+Shift+R)

---

## Chi phí ước tính

### Miễn phí hoàn toàn
- Hosting: Vercel/Netlify Free tier
- Database: Firebase Free tier (đủ cho 500-1000 users)
- Bandwidth: 100GB/tháng (Free tier)

### Cần trả phí khi scale
| Users | Traffic | Firebase | Vercel | Total |
|-------|---------|----------|--------|-------|
| < 500 | < 10K visits/month | $0 | $0 | **$0** |
| 500-5K | 50K visits/month | ~$5 | $0 | **$5/tháng** |
| 5K-50K | 500K visits/month | ~$25 | $20 | **$45/tháng** |

### Chi phí domain
- `.vn`: ~200,000đ/năm (~$8)
- `.com`: ~300,000đ/năm (~$12)

---

## Support

Gặp vấn đề khi deploy? Check:
1. [Vercel Docs](https://vercel.com/docs)
2. [Netlify Docs](https://docs.netlify.com)
3. [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)

Hoặc liên hệ: admin@medlinkband.vn
