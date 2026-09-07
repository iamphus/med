/**
 * Firebase Data Migration Script
 * 
 * Script này giúp migrate mock data từ mockData.js vào Firestore.
 * Chỉ chạy 1 lần khi setup project lần đầu.
 * 
 * PREREQUISITES:
 * 1. Đã enable Firestore trong Firebase Console
 * 2. Đã download Service Account Key từ Firebase Console
 * 3. Đã cài đặt: npm install firebase-admin
 * 
 * HOW TO USE:
 * 1. Vào Firebase Console → Project Settings → Service Accounts
 * 2. Click "Generate new private key" → Download JSON file
 * 3. Save file vào: scripts/serviceAccountKey.json (gitignore đã có)
 * 4. Run: node scripts/migrateData.js
 * 
 * WARNING: Script này sẽ ADD data, không XÓA data cũ.
 * Nếu muốn reset database, xóa collection 'patients' trong Firestore Console trước.
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Check if service account key exists
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ Error: serviceAccountKey.json not found!');
  console.log('\n📖 How to get Service Account Key:');
  console.log('1. Vào Firebase Console: https://console.firebase.google.com/');
  console.log('2. Chọn project: medlinkband-a7a8c');
  console.log('3. Project Settings → Service Accounts');
  console.log('4. Click "Generate new private key"');
  console.log('5. Save file as: scripts/serviceAccountKey.json');
  console.log('\n⚠️  IMPORTANT: serviceAccountKey.json đã được add vào .gitignore - KHÔNG commit file này!');
  process.exit(1);
}

// Mock data
const mockPatients = [
  {
    id: "patient-001",
    name: "Nguyễn Văn An",
    birthYear: 1952,
    gender: "Nam",
    bloodType: "O+",
    allergies: ["Penicillin", "Aspirin"],
    conditions: ["Tăng huyết áp", "Đái tháo đường type 2", "Bệnh mạch vành"],
    emergencyContacts: [
      { name: "Nguyễn Thị Bình (Con gái)", phone: "0912345678", relationship: "Con gái" },
      { name: "Trần Văn Cường (Con trai)", phone: "0987654321", relationship: "Con trai" }
    ],
    doctorContact: { name: "BS. Lê Hoàng Minh", phone: "0901234567", hospital: "BV Chợ Rẫy" },
    braceletStatus: "active",
    medicalRecord: {
      medications: [
        { name: "Losartan 50mg", dosage: "1 viên/ngày, sáng", note: "Hạ huyết áp" },
        { name: "Metformin 500mg", dosage: "2 viên/ngày, sáng-chiều", note: "Tiểu đường" },
      ],
      examHistory: [
        { date: "2024-08-20", doctor: "BS. Lê Hoàng Minh", diagnosis: "Kiểm tra định kỳ - Huyết áp ổn định", note: "Tiếp tục dùng thuốc" }
      ],
      specialInstructions: "⚠️ KHÔNG dùng thuốc nhóm NSAID. Cần thông báo BS tim mạch trước phẫu thuật."
    }
  },
  {
    id: "patient-002",
    name: "Trần Thị Mai",
    birthYear: 1948,
    gender: "Nữ",
    bloodType: "AB-",
    allergies: ["Sulfonamide", "Hải sản (tôm, cua)"],
    conditions: ["Alzheimer giai đoạn sớm", "Loãng xương", "Thiếu máu"],
    emergencyContacts: [
      { name: "Trần Minh Đức (Con trai)", phone: "0908765432", relationship: "Con trai" }
    ],
    doctorContact: { name: "BS. Phạm Thị Lan", phone: "0903456789", hospital: "BV Đại học Y Dược" },
    braceletStatus: "active",
    medicalRecord: {
      medications: [
        { name: "Donepezil 5mg", dosage: "1 viên/ngày, tối", note: "Alzheimer" }
      ],
      examHistory: [
        { date: "2024-09-01", doctor: "BS. Phạm Thị Lan", diagnosis: "MMSE: 22/30 - Alzheimer ổn định", note: "Tiếp tục Donepezil" }
      ],
      specialInstructions: "⚠️ Bệnh nhân Alzheimer - có thể không nhớ tên/địa chỉ. Liên hệ NGAY con trai."
    }
  },
  {
    id: "patient-003",
    name: "Lê Quang Vinh",
    birthYear: 1965,
    gender: "Nam",
    bloodType: "B+",
    allergies: [],
    conditions: ["Động kinh", "Hen suyễn"],
    emergencyContacts: [
      { name: "Lê Thị Ngọc (Vợ)", phone: "0933456789", relationship: "Vợ" }
    ],
    doctorContact: { name: "BS. Hoàng Anh Tuấn", phone: "0909876543", hospital: "BV Nhân dân 115" },
    braceletStatus: "active",
    medicalRecord: {
      medications: [
        { name: "Levetiracetam 500mg", dosage: "2 viên/ngày, sáng-tối", note: "Chống co giật" }
      ],
      examHistory: [
        { date: "2024-08-05", doctor: "BS. Hoàng Anh Tuấn", diagnosis: "EEG bình thường", note: "Duy trì thuốc" }
      ],
      specialInstructions: "⚠️ KHI CO GIẬT: Đặt nằm nghiêng, KHÔNG đè giữ. Gọi 115 nếu > 5 phút."
    }
  },
  {
    id: "patient-004",
    name: "Phạm Thị Hồng",
    birthYear: 1940,
    gender: "Nữ",
    bloodType: "A+",
    allergies: ["Morphine", "Latex"],
    conditions: ["Suy tim (EF 35%)", "Rung nhĩ", "Suy thận mạn giai đoạn 3"],
    emergencyContacts: [
      { name: "Phạm Văn Tuấn (Con trai)", phone: "0945678901", relationship: "Con trai" }
    ],
    doctorContact: { name: "BS. Vũ Đình Khoa", phone: "0911223344", hospital: "BV Tim Tâm Đức" },
    braceletStatus: "locked",
    medicalRecord: {
      medications: [
        { name: "Furosemide 40mg", dosage: "1 viên/ngày, sáng", note: "Lợi tiểu - suy tim" },
        { name: "Warfarin 3mg", dosage: "1 viên/ngày, tối", note: "Chống đông - rung nhĩ" }
      ],
      examHistory: [
        { date: "2024-07-30", doctor: "BS. Vũ Đình Khoa", diagnosis: "Echo tim: EF 35%", note: "Xem xét CRT-D" }
      ],
      specialInstructions: "⚠️ NGUY CƠ CAO: Suy tim nặng + Rung nhĩ + Warfarin. KHÔNG tiêm bắp. DỊ ỨNG MORPHINE."
    }
  },
  {
    id: "patient-005",
    name: "Võ Thanh Sơn",
    birthYear: 1958,
    gender: "Nam",
    bloodType: "O-",
    allergies: ["Iodine (thuốc cản quang)"],
    conditions: ["Parkinson", "Trầm cảm"],
    emergencyContacts: [
      { name: "Võ Thị Lan Anh (Con gái)", phone: "0976543210", relationship: "Con gái" }
    ],
    doctorContact: { name: "BS. Đặng Minh Quân", phone: "0922334455", hospital: "BV Nguyễn Tri Phương" },
    braceletStatus: "active",
    medicalRecord: {
      medications: [
        { name: "Levodopa/Carbidopa 250/25mg", dosage: "3 lần/ngày, trước ăn 30 phút", note: "Parkinson" }
      ],
      examHistory: [
        { date: "2024-08-10", doctor: "BS. Đặng Minh Quân", diagnosis: "Run tay tăng", note: "Tăng Levodopa" }
      ],
      specialInstructions: "⚠️ DỊ ỨNG IODINE - KHÔNG chụp CT có cản quang. Thuốc Levodopa phải uống ĐÚNG GIỜ."
    }
  }
];

// Initialize Firebase Admin
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Migration function
async function migrate() {
  console.log('🚀 Starting data migration...\n');
  console.log(`📦 Total patients to migrate: ${mockPatients.length}\n`);

  try {
    const batch = db.batch();
    let count = 0;

    for (const patient of mockPatients) {
      // Remove the old 'id' field and let Firestore auto-generate
      const { id, ...patientData } = patient;
      
      // Create new document
      const docRef = db.collection('patients').doc();
      
      batch.set(docRef, {
        ...patientData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      count++;
      console.log(`✅ Queued: ${patient.name} (${patient.bloodType})`);
    }

    // Commit batch
    await batch.commit();
    
    console.log(`\n✅ Success! Migrated ${count} patients to Firestore.`);
    console.log('\n📊 Next steps:');
    console.log('1. Check Firestore Console: https://console.firebase.google.com/');
    console.log('2. Verify collection "patients" exists');
    console.log('3. Run app: npm run dev');
    console.log('4. Login and check dashboard\n');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('\n🔍 Possible causes:');
    console.error('- Firestore not enabled in Firebase Console');
    console.error('- Invalid service account key');
    console.error('- Network connectivity issues');
    console.error('- Security rules blocking write\n');
    process.exit(1);
  }
}

// Run migration
migrate()
  .then(() => {
    console.log('🎉 Migration complete! Exiting...\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
  });
