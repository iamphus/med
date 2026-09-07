/**
 * Generate 500 Random Patients for Firebase
 * 
 * Script này tạo 500 bệnh nhân với dữ liệu ngẫu nhiên để test phân trang
 * 
 * HOW TO USE:
 * 1. Đảm bảo có file serviceAccountKey.json trong thư mục scripts
 * 2. Run: node scripts/generate500Patients.cjs
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Check if service account key exists
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ Error: serviceAccountKey.json not found!');
  process.exit(1);
}

// Initialize Firebase Admin
const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Data arrays for random generation
const lastNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'];
const maleMiddleNames = ['Văn', 'Đức', 'Hữu', 'Minh', 'Quang', 'Thanh', 'Công', 'Đình', 'Anh', 'Tuấn'];
const femaleMiddleNames = ['Thị', 'Ngọc', 'Thanh', 'Kim', 'Phương', 'Hương', 'Thu', 'Lan', 'Linh', 'Mai'];
const maleFirstNames = ['An', 'Bình', 'Cường', 'Dũng', 'Hùng', 'Khoa', 'Long', 'Nam', 'Phong', 'Quân', 'Sơn', 'Tài', 'Tuấn', 'Vinh', 'Khang', 'Đạt'];
const femaleFirstNames = ['Anh', 'Hà', 'Hương', 'Linh', 'Mai', 'Nga', 'Oanh', 'Phương', 'Trang', 'Vy', 'Xuân', 'Yến', 'Chi', 'Huyền', 'Nhung', 'Thảo'];

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const genders = ['Nam', 'Nữ'];

const allergiesList = [
  'Penicillin', 'Aspirin', 'Sulfonamide', 'Iodine', 'Morphine', 
  'Latex', 'Hải sản', 'Đậu phộng', 'Trứng', 'Sữa', 'Thuốc kháng sinh nhóm quinolone'
];

const conditionsList = [
  'Tăng huyết áp', 'Đái tháo đường type 2', 'Bệnh mạch vành', 
  'Hen suyễn', 'Động kinh', 'Rung nhĩ', 'Suy tim', 
  'Loãng xương', 'Gout', 'Bệnh thận mạn', 'Parkinson', 
  'Alzheimer', 'Viêm khớp', 'Trầm cảm', 'Dạ dày', 'Viêm gan B'
];

const medications = [
  { name: 'Losartan 50mg', dosage: '1 viên/ngày, sáng', note: 'Hạ huyết áp' },
  { name: 'Metformin 500mg', dosage: '2 viên/ngày, sáng-chiều', note: 'Tiểu đường' },
  { name: 'Aspirin 100mg', dosage: '1 viên/ngày, tối', note: 'Chống đông' },
  { name: 'Atorvastatin 20mg', dosage: '1 viên/ngày, tối', note: 'Hạ mỡ máu' },
  { name: 'Omeprazole 20mg', dosage: '1 viên/ngày, sáng', note: 'Bảo vệ dạ dày' },
  { name: 'Amlodipine 5mg', dosage: '1 viên/ngày, sáng', note: 'Huyết áp' },
];

const hospitals = [
  'BV Chợ Rẫy', 'BV Đại học Y Dược', 'BV Nhân dân 115', 
  'BV Tim Tâm Đức', 'BV Nguyễn Tri Phương', 'BV Thống Nhất',
  'BV Bình Dân', 'BV Từ Dũ', 'BV Nhi Đồng 1', 'BV An Bình'
];

const relationships = ['Con trai', 'Con gái', 'Vợ', 'Chồng', 'Anh/Em trai', 'Chị/Em gái'];

// Helper functions
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomItems(array, min = 0, max = 3) {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generatePhone() {
  const prefixes = ['090', '091', '093', '094', '097', '098', '099', '086', '088'];
  return randomItem(prefixes) + Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
}

function generateName(gender) {
  const lastName = randomItem(lastNames);
  const middleName = gender === 'Nam' ? randomItem(maleMiddleNames) : randomItem(femaleMiddleNames);
  const firstName = gender === 'Nam' ? randomItem(maleFirstNames) : randomItem(femaleFirstNames);
  return `${lastName} ${middleName} ${firstName}`;
}

function generatePatient(index) {
  const gender = randomItem(genders);
  const name = generateName(gender);
  const birthYear = 1940 + Math.floor(Math.random() * 60); // 1940-1999
  const bloodType = randomItem(bloodTypes);
  
  // Random allergies (0-2)
  const allergies = randomItems(allergiesList, 0, 2);
  
  // Random conditions (0-3)
  const conditions = randomItems(conditionsList, 0, 3);
  
  // Emergency contacts (1-2)
  const contactCount = Math.random() > 0.5 ? 2 : 1;
  const emergencyContacts = [];
  for (let i = 0; i < contactCount; i++) {
    emergencyContacts.push({
      name: generateName(randomItem(genders)),
      phone: generatePhone(),
      relationship: randomItem(relationships)
    });
  }
  
  // Doctor contact
  const doctorContact = {
    name: `BS. ${generateName(randomItem(genders))}`,
    phone: generatePhone(),
    hospital: randomItem(hospitals)
  };
  
  // Bracelet status (90% active, 10% locked)
  const braceletStatus = Math.random() > 0.1 ? 'active' : 'locked';
  
  // Medications (0-3)
  const patientMedications = randomItems(medications, 0, 3);
  
  // Exam history (0-2)
  const examCount = Math.floor(Math.random() * 3);
  const examHistory = [];
  for (let i = 0; i < examCount; i++) {
    const daysAgo = Math.floor(Math.random() * 180);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    examHistory.push({
      date: date.toISOString().split('T')[0],
      doctor: doctorContact.name,
      diagnosis: 'Kiểm tra định kỳ',
      note: 'Tình trạng ổn định'
    });
  }
  
  let specialInstructions = '';
  if (allergies.length > 0) {
    specialInstructions = `⚠️ DỊ ỨNG: ${allergies.join(', ')}. `;
  }
  if (conditions.length > 2) {
    specialInstructions += 'Bệnh nhân có nhiều bệnh nền, cần theo dõi sát.';
  }
  
  return {
    name,
    birthYear,
    gender,
    bloodType,
    allergies,
    conditions,
    emergencyContacts,
    doctorContact,
    braceletStatus,
    medicalRecord: {
      medications: patientMedications,
      examHistory,
      specialInstructions: specialInstructions.trim()
    }
  };
}

// Generate and upload function
async function generate500Patients() {
  console.log('🚀 Starting generation of 500 patients...\n');
  
  try {
    const batchSize = 500; // Firestore batch limit
    let totalCreated = 0;
    
    // Split into batches of 500
    const totalBatches = Math.ceil(500 / batchSize);
    
    for (let batchNum = 0; batchNum < totalBatches; batchNum++) {
      const batch = db.batch();
      const startIdx = batchNum * batchSize;
      const endIdx = Math.min(startIdx + batchSize, 500);
      
      console.log(`\n📦 Batch ${batchNum + 1}/${totalBatches}: Creating patients ${startIdx + 1}-${endIdx}`);
      
      for (let i = startIdx; i < endIdx; i++) {
        const patient = generatePatient(i);
        const docRef = db.collection('patients').doc();
        
        batch.set(docRef, {
          ...patient,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        
        totalCreated++;
        
        if ((i + 1) % 50 === 0) {
          console.log(`  ✅ Queued ${i + 1} patients...`);
        }
      }
      
      await batch.commit();
      console.log(`  ✅ Batch ${batchNum + 1} committed successfully!`);
    }
    
    console.log(`\n✅ Success! Created ${totalCreated} patients in Firestore.`);
    console.log('\n📊 Next steps:');
    console.log('1. Refresh your app dashboard');
    console.log('2. Test pagination with 500+ patients');
    console.log('3. Test search and filters\n');
    
  } catch (error) {
    console.error('❌ Generation failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run generation
generate500Patients()
  .then(() => {
    console.log('🎉 Generation complete! Exiting...\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
  });
