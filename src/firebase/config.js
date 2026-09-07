import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Cấu hình Firebase cho dự án medlinkband
const firebaseConfig = {
  apiKey: "AIzaSyAB7AdN4ZUhCB8KwD3oRd9K4SC4Grrn4lY",
  authDomain: "medlinkband-a7a8c.firebaseapp.com",
  projectId: "medlinkband-a7a8c",
  storageBucket: "medlinkband-a7a8c.firebasestorage.app",
  messagingSenderId: "976422366816",
  appId: "1:976422366816:web:2e2c8ba12fab7c52f71d05",
  measurementId: "G-JF1FH0VQ6M"
};

// Khởi tạo các dịch vụ Firebase [5, 6]
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Xuất các dịch vụ để sử dụng ở những file khác trong dự án
export { app, auth, db, analytics };
