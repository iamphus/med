/**
 * Script to add detailed patient data (vital signs, diagnosis) to Firestore
 * Run: node scripts/addDetailedPatientData.cjs
 */

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Detailed patient data with vital signs and diagnosis
const detailedPatientData = [
  {
    id: 'patient-001',
    vitalSigns: {
      bloodPressure: '140/85',
      heartRate: 78,
      temperature: 36.8,
      spo2: 97,
      timestamp: new Date('2024-01-15T10:30:00')
    },
    currentDiagnosis: {
      primary: 'Đái tháo đường type 2',
      secondary: ['Tăng huyết áp', 'Bệnh mạch vành'],
      doctor: 'BS. Lê Hoàng Minh',
      date: new Date('2024-01-15'),
      notes: 'Bệnh nhân cần kiểm soát đường huyết chặt chẽ, theo dõi huyết áp đều đặn. Đã đặt stent mạch vành LAD năm 2023.'
    }
  },
  {
    id: 'patient-002',
    vitalSigns: {
      bloodPressure: '125/75',
      heartRate: 72,
      temperature: 36.5,
      spo2: 98,
      timestamp: new Date('2024-02-20T14:15:00')
    },
    currentDiagnosis: {
      primary: 'Alzheimer giai đoạn sớm',
      secondary: ['Loãng xương', 'Thiếu máu'],
      doctor: 'BS. Phạm Thị Lan',
      date: new Date('2024-02-20'),
      notes: 'Bệnh nhân cần giám sát thường xuyên, có nguy cơ đi lạc. MMSE: 22/30, tình trạng nhận thức giảm nhẹ.'
    }
  },
  {
    id: 'patient-003',
    vitalSigns: {
      bloodPressure: '130/80',
      heartRate: 82,
      temperature: 37.0,
      spo2: 96,
      timestamp: new Date('2024-03-10T09:45:00')
    },
    currentDiagnosis: {
      primary: 'Động kinh được kiểm soát',
      secondary: ['Hen suyễn'],
      doctor: 'BS. Hoàng Anh Tuấn',
      date: new Date('2024-03-10'),
      notes: 'Không co giật 6 tháng gần nhất. Hen được kiểm soát một phần với FEV1: 78%. Cần mang theo bình xịt hen thường xuyên.'
    }
  },
  {
    id: 'patient-004',
    vitalSigns: {
      bloodPressure: '110/70',
      heartRate: 92,
      temperature: 36.7,
      spo2: 94,
      timestamp: new Date('2024-04-05T11:20:00')
    },
    currentDiagnosis: {
      primary: 'Suy tim sung huyết (EF 35%)',
      secondary: ['Rung nhĩ', 'Suy thận mạn giai đoạn 3'],
      doctor: 'BS. Vũ Đình Khoa',
      date: new Date('2024-04-05'),
      notes: 'Nguy cơ cao: Suy tim nặng + Rung nhĩ + Đang dùng Warfarin. Cần theo dõi INR định kỳ. Hạn chế dịch truyền < 1.5L/ngày.'
    }
  },
  {
    id: 'patient-005',
    vitalSigns: {
      bloodPressure: '135/88',
      heartRate: 76,
      temperature: 36.9,
      spo2: 98,
      timestamp: new Date('2024-05-12T16:00:00')
    },
    currentDiagnosis: {
      primary: 'Bệnh Parkinson',
      secondary: ['Trầm cảm trung bình'],
      doctor: 'BS. Đặng Minh Quân',
      date: new Date('2024-05-12'),
      notes: 'Run tay, khó đi lại. Bệnh nhân hay ngã, cần hỗ trợ khi di chuyển. Thuốc Levodopa phải uống đúng giờ để duy trì hiệu quả.'
    }
  }
];

async function addDetailedData() {
  console.log('🚀 Starting to add detailed patient data...\n');

  try {
    for (const patientData of detailedPatientData) {
      console.log(`📝 Processing patient: ${patientData.id}`);
      
      // Update patient document with new fields
      const patientRef = db.collection('patients').doc(patientData.id);
      
      // Check if patient exists
      const patientDoc = await patientRef.get();
      if (!patientDoc.exists) {
        console.log(`   ⚠️  Patient ${patientData.id} not found, skipping...`);
        continue;
      }
      
      // Add vital signs and diagnosis to main document
      await patientRef.update({
        vitalSigns: patientData.vitalSigns,
        currentDiagnosis: patientData.currentDiagnosis,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`   ✅ Added vital signs and diagnosis for ${patientData.id}`);
    }
    
    console.log('\n✨ All detailed data added successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Patients updated: ${detailedPatientData.length}`);
    console.log(`   - Fields added: vitalSigns, currentDiagnosis`);
    
  } catch (error) {
    console.error('❌ Error adding detailed data:', error);
  } finally {
    // Exit the script
    process.exit(0);
  }
}

// Run the script
addDetailedData();
