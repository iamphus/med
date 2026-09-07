// Mock data cho MedLink Band - Dữ liệu mẫu bệnh nhân
export const mockPatients = [
  {
    id: "patient-001",
    name: "Nguyễn Văn An",
    avatar: null,
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
    braceletStatus: "active", // active | locked
    createdAt: "2024-01-15",
    medicalRecord: {
      medications: [
        { name: "Losartan 50mg", dosage: "1 viên/ngày, sáng", note: "Hạ huyết áp" },
        { name: "Metformin 500mg", dosage: "2 viên/ngày, sáng-chiều", note: "Tiểu đường" },
        { name: "Aspirin 81mg", dosage: "1 viên/ngày, sau ăn", note: "Chống đông máu" }
      ],
      examHistory: [
        { date: "2024-08-20", doctor: "BS. Lê Hoàng Minh", diagnosis: "Kiểm tra định kỳ - Huyết áp ổn định 130/85", note: "Tiếp tục dùng thuốc hiện tại" },
        { date: "2024-06-10", doctor: "BS. Nguyễn Thu Hà", diagnosis: "HbA1c: 7.2% - Tiểu đường kiểm soát tốt", note: "Giảm Metformin nếu HbA1c < 7% lần sau" },
        { date: "2024-03-05", doctor: "BS. Lê Hoàng Minh", diagnosis: "Đau ngực nhẹ - ECG bình thường", note: "Theo dõi, tái khám sau 3 tháng" },
        { date: "2023-12-18", doctor: "BS. Trần Quốc Bảo", diagnosis: "Đặt stent mạch vành LAD", note: "Dùng Plavix 75mg thêm 12 tháng" }
      ],
      specialInstructions: "⚠️ KHÔNG dùng thuốc nhóm NSAID. Cần thông báo BS tim mạch trước khi phẫu thuật bất kỳ. Nguy cơ xuất huyết khi dùng chống đông."
    }
  },
  {
    id: "patient-002",
    name: "Trần Thị Mai",
    avatar: null,
    birthYear: 1948,
    gender: "Nữ",
    bloodType: "AB-",
    allergies: ["Sulfonamide", "Hải sản (tôm, cua)"],
    conditions: ["Alzheimer giai đoạn sớm", "Loãng xương", "Thiếu máu"],
    emergencyContacts: [
      { name: "Trần Minh Đức (Con trai)", phone: "0908765432", relationship: "Con trai" },
      { name: "Lý Thị Hương (Con dâu)", phone: "0918765432", relationship: "Con dâu" }
    ],
    doctorContact: { name: "BS. Phạm Thị Lan", phone: "0903456789", hospital: "BV Đại học Y Dược" },
    braceletStatus: "active",
    createdAt: "2024-02-20",
    medicalRecord: {
      medications: [
        { name: "Donepezil 5mg", dosage: "1 viên/ngày, tối", note: "Alzheimer" },
        { name: "Calcium + Vitamin D3", dosage: "1 viên/ngày, sáng", note: "Loãng xương" },
        { name: "Ferrous sulfate 325mg", dosage: "1 viên/ngày, trước ăn", note: "Thiếu máu" }
      ],
      examHistory: [
        { date: "2024-09-01", doctor: "BS. Phạm Thị Lan", diagnosis: "MMSE: 22/30 - Alzheimer ổn định", note: "Tiếp tục Donepezil, tái khám 3 tháng" },
        { date: "2024-07-15", doctor: "BS. Nguyễn Văn Hùng", diagnosis: "DEXA scan: T-score -2.8", note: "Xem xét Alendronate nếu gãy xương" },
        { date: "2024-04-22", doctor: "BS. Phạm Thị Lan", diagnosis: "Hay quên, đi lạc 2 lần trong tháng", note: "Cần người giám sát thường xuyên" }
      ],
      specialInstructions: "⚠️ Bệnh nhân Alzheimer - có thể không nhớ tên/địa chỉ. Liên hệ NGAY con trai Trần Minh Đức: 0908765432. KHÔNG cho ăn hải sản."
    }
  },
  {
    id: "patient-003",
    name: "Lê Quang Vinh",
    avatar: null,
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
    createdAt: "2024-03-10",
    medicalRecord: {
      medications: [
        { name: "Levetiracetam 500mg", dosage: "2 viên/ngày, sáng-tối", note: "Chống co giật" },
        { name: "Salbutamol MDI", dosage: "Xịt khi khó thở, tối đa 4 lần/ngày", note: "Cắt cơn hen" },
        { name: "Budesonide/Formoterol", dosage: "2 nhát xịt/ngày, sáng-tối", note: "Dự phòng hen" }
      ],
      examHistory: [
        { date: "2024-08-05", doctor: "BS. Hoàng Anh Tuấn", diagnosis: "EEG bình thường, không co giật 6 tháng", note: "Duy trì Levetiracetam" },
        { date: "2024-05-20", doctor: "BS. Trần Thị Kim", diagnosis: "FEV1: 78% - Hen kiểm soát một phần", note: "Tăng Budesonide lên 400mcg" }
      ],
      specialInstructions: "⚠️ KHI CO GIẬT: Đặt nằm nghiêng, KHÔNG đè giữ, KHÔNG nhét vật vào miệng. Gọi 115 nếu co giật > 5 phút. Luôn mang theo bình xịt hen."
    }
  },
  {
    id: "patient-004",
    name: "Phạm Thị Hồng",
    avatar: null,
    birthYear: 1940,
    gender: "Nữ",
    bloodType: "A+",
    allergies: ["Morphine", "Latex"],
    conditions: ["Suy tim (EF 35%)", "Rung nhĩ", "Suy thận mạn giai đoạn 3"],
    emergencyContacts: [
      { name: "Phạm Văn Tuấn (Con trai)", phone: "0945678901", relationship: "Con trai" },
      { name: "Viện dưỡng lão Bình An", phone: "02812345678", relationship: "Viện dưỡng lão" }
    ],
    doctorContact: { name: "BS. Vũ Đình Khoa", phone: "0911223344", hospital: "BV Tim Tâm Đức" },
    braceletStatus: "locked",
    createdAt: "2024-04-05",
    medicalRecord: {
      medications: [
        { name: "Furosemide 40mg", dosage: "1 viên/ngày, sáng", note: "Lợi tiểu - suy tim" },
        { name: "Carvedilol 12.5mg", dosage: "2 viên/ngày, sáng-tối", note: "Suy tim" },
        { name: "Warfarin 3mg", dosage: "1 viên/ngày, tối", note: "Chống đông - rung nhĩ" },
        { name: "Enalapril 5mg", dosage: "1 viên/ngày, sáng", note: "Ức chế men chuyển" }
      ],
      examHistory: [
        { date: "2024-07-30", doctor: "BS. Vũ Đình Khoa", diagnosis: "Echo tim: EF 35%, không cải thiện", note: "Xem xét CRT-D nếu tiếp tục xấu" },
        { date: "2024-06-01", doctor: "BS. Nguyễn Thị Thảo", diagnosis: "INR: 2.5 - trong khoảng mục tiêu", note: "Duy trì Warfarin 3mg" },
        { date: "2024-04-15", doctor: "BS. Vũ Đình Khoa", diagnosis: "Phù chân, khó thở khi nằm", note: "Tăng Furosemide, hạn chế muối" }
      ],
      specialInstructions: "⚠️ NGUY CƠ CAO: Suy tim nặng + Rung nhĩ + Đang dùng Warfarin. KHÔNG tiêm bắp. Kiểm tra INR trước mọi thủ thuật. Hạn chế dịch truyền < 1.5L/ngày. DỊ ỨNG MORPHINE - dùng Fentanyl thay thế."
    }
  },
  {
    id: "patient-005",
    name: "Võ Thanh Sơn",
    avatar: null,
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
    createdAt: "2024-05-12",
    medicalRecord: {
      medications: [
        { name: "Levodopa/Carbidopa 250/25mg", dosage: "3 lần/ngày, trước ăn 30 phút", note: "Parkinson" },
        { name: "Pramipexole 0.5mg", dosage: "3 lần/ngày", note: "Hỗ trợ Parkinson" },
        { name: "Sertraline 50mg", dosage: "1 viên/ngày, sáng", note: "Trầm cảm" }
      ],
      examHistory: [
        { date: "2024-08-10", doctor: "BS. Đặng Minh Quân", diagnosis: "Run tay tăng, khó đi lại", note: "Tăng Levodopa, đánh giá lại 1 tháng" },
        { date: "2024-05-25", doctor: "BS. Lý Thị Thanh", diagnosis: "PHQ-9: 12 - Trầm cảm trung bình", note: "Bắt đầu Sertraline, theo dõi sát" }
      ],
      specialInstructions: "⚠️ DỊ ỨNG IODINE - KHÔNG chụp CT có cản quang. Bệnh nhân hay ngã do Parkinson - cần hỗ trợ khi đi lại. Thuốc Levodopa phải uống ĐÚNG GIỜ."
    }
  }
];

// Mật khẩu demo cho bác sĩ (MVP)
export const DOCTOR_PASSWORD = "medlink2024";

// Helper: tìm bệnh nhân theo ID
export const getPatientById = (id) => {
  return mockPatients.find(p => p.id === id) || null;
};

// Helper: tính tuổi
export const calculateAge = (birthYear) => {
  return new Date().getFullYear() - birthYear;
};
