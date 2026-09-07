# Mobile Responsive Testing Checklist

## 🎯 Quick Test Guide

### Test Devices (Chrome DevTools)
1. iPhone SE (375x667) ✓
2. iPhone 12 Pro (390x844) ✓
3. iPhone 14 Pro Max (430x932) ✓
4. Samsung Galaxy S20 (360x800) ✓
5. iPad Mini (768x1024) ✓
6. iPad Pro (1024x1366) ✓

---

## 📱 Test Scenarios

### 1. Login Page (`/login`)
- [ ] Logo và form hiển thị tốt
- [ ] Input fields dễ tap (min 44px)
- [ ] Button full-width trên mobile
- [ ] Demo credentials dễ đọc
- [ ] Không có horizontal scroll
- [ ] Options stack vertical
- [ ] Footer links readable

### 2. Admin Dashboard (`/dashboard`)
- [ ] Sidebar toggle button hoạt động
- [ ] Sidebar overlay khi mở
- [ ] Click backdrop đóng sidebar
- [ ] Stats cards: 4→2→1 columns
- [ ] Search box full-width
- [ ] Filters stack vertical
- [ ] Action buttons full-width
- [ ] Table horizontal scroll smooth
- [ ] Action icons đủ lớn để tap
- [ ] Topbar compact và readable

### 3. Patient Form (Modal)
- [ ] Modal full-screen trên mobile
- [ ] Close button dễ tap
- [ ] Form fields stack vertical
- [ ] Avatar section centered
- [ ] Camera preview responsive
- [ ] Camera controls touch-friendly
- [ ] Blood type grid 4 columns
- [ ] Tags wrap properly
- [ ] Emergency contacts readable
- [ ] Footer buttons stack vertical
- [ ] Save/Cancel full-width

### 4. QR Code Modal
- [ ] QR code visible và lớn
- [ ] Patient info readable
- [ ] URL preview không overflow
- [ ] Download/Print buttons stack
- [ ] Buttons full-width
- [ ] Close button accessible

### 5. Emergency Info Page (`/emergency/:id`)
- [ ] Header compact và readable
- [ ] Avatar size appropriate
- [ ] Name và meta info clear
- [ ] Vital cards stack vertical
- [ ] Blood type prominent
- [ ] Allergies visible
- [ ] Call buttons touch-friendly
- [ ] Call buttons full-width
- [ ] Phone numbers tappable
- [ ] Doctor access button clear
- [ ] Không có text cutoff

### 6. Doctor Auth Page (`/doctor-access/:id`)
- [ ] Nav bar compact
- [ ] PIN input large enough
- [ ] Error messages visible
- [ ] Auth card centered
- [ ] Medical record readable
- [ ] Patient summary responsive
- [ ] Tabs horizontal scroll
- [ ] Timeline vertical layout
- [ ] Medication table scrolls
- [ ] Contact info readable

---

## 🔍 Visual Checks

### Typography
- [ ] Font sizes readable (min 14px body)
- [ ] Line heights comfortable
- [ ] No text overflow
- [ ] Headings hierarchy clear

### Spacing
- [ ] Padding consistent
- [ ] No elements touching edges
- [ ] Cards have proper margins
- [ ] Sections well separated

### Touch Targets
- [ ] All buttons min 44x44px
- [ ] Links easy to tap
- [ ] Form controls large enough
- [ ] Icon buttons have padding

### Layout
- [ ] No horizontal scroll (except tables)
- [ ] Content fits viewport
- [ ] Images scale properly
- [ ] Modals use full screen

### Colors & Contrast
- [ ] Text readable on backgrounds
- [ ] Buttons have clear states
- [ ] Focus states visible
- [ ] Error messages prominent

---

## 🔄 Interaction Tests

### Navigation
- [ ] Sidebar opens smoothly
- [ ] Sidebar closes on backdrop click
- [ ] Toggle icon changes
- [ ] Links navigate correctly
- [ ] Back button works

### Forms
- [ ] Inputs focus correctly
- [ ] Keyboard shows appropriate type
- [ ] Validation messages visible
- [ ] Submit button accessible
- [ ] Camera works on mobile
- [ ] File upload works

### Modals
- [ ] Opens smoothly
- [ ] Closes on backdrop click
- [ ] Closes on X button
- [ ] Content scrolls if needed
- [ ] Buttons accessible

### Tables
- [ ] Scrolls horizontally smooth
- [ ] Headers stay visible
- [ ] Row actions accessible
- [ ] Filters work

---

## 🌐 Browser Tests

### Mobile Browsers
- [ ] Chrome Mobile (Android)
- [ ] Safari (iOS)
- [ ] Samsung Internet
- [ ] Firefox Mobile

### Orientations
- [ ] Portrait mode works
- [ ] Landscape mode works
- [ ] Rotation smooth

---

## ⚡ Performance

- [ ] Page loads fast
- [ ] No layout shifts
- [ ] Animations smooth (60fps)
- [ ] Images optimized
- [ ] No janky scrolling

---

## ♿ Accessibility

- [ ] Can zoom in/out
- [ ] Text scales properly
- [ ] Touch targets adequate
- [ ] Color contrast good
- [ ] Focus indicators visible
- [ ] Screen reader friendly

---

## 🐛 Common Issues to Check

- [ ] ❌ Text cutoff/overflow
- [ ] ❌ Buttons too small
- [ ] ❌ Horizontal scroll
- [ ] ❌ Images not scaling
- [ ] ❌ Modal too small
- [ ] ❌ Table not scrolling
- [ ] ❌ Inputs too small
- [ ] ❌ Poor color contrast
- [ ] ❌ Layout breaking
- [ ] ❌ Touch targets overlapping

---

## 📊 Test Results

**Date**: ___________

**Tester**: ___________

**Device**: ___________

**Status**: 
- [ ] All tests passed ✅
- [ ] Issues found (see notes) ⚠️
- [ ] Critical bugs 🚨

**Notes**:
```
[Ghi chú về các vấn đề tìm thấy]
```

--

## 🛠️ Debug Tool

### Chrome DevTools
```
1. F12 → Toggle device toolbar (Ctrl+Shift+M)
2. Select device preset
3. Test different screen sizes
4. Check responsive breakpoints
5. Use "Show media queries" option
```

### Test URLs
```
Login: http://localhost:5173/login
Dashboard: http://localhost:5173/dashboard
Emergency (test): http://localhost:5173/emergency/patient-001
Doctor Auth (test): http://localhost:5173/doctor-access/patient-001
```

---

**Last Updated**: 2026-09-07
**Version**: 2.0 - Mobile Optimized
