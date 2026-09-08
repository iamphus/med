// Danh sách các dị ứng phổ biến trong y tế
export const commonAllergies = [
  // Thuốc kháng sinh
  { id: 'allergy-001', name: 'Penicillin', category: 'Kháng sinh', severity: 'high' },
  { id: 'allergy-002', name: 'Amoxicillin', category: 'Kháng sinh', severity: 'high' },
  { id: 'allergy-003', name: 'Ampicillin', category: 'Kháng sinh', severity: 'high' },
  { id: 'allergy-004', name: 'Cephalosporin', category: 'Kháng sinh', severity: 'high' },
  { id: 'allergy-005', name: 'Sulfonamide (Sulfamide)', category: 'Kháng sinh', severity: 'high' },
  { id: 'allergy-006', name: 'Tetracycline', category: 'Kháng sinh', severity: 'medium' },
  { id: 'allergy-007', name: 'Erythromycin', category: 'Kháng sinh', severity: 'medium' },
  { id: 'allergy-008', name: 'Ciprofloxacin', category: 'Kháng sinh', severity: 'medium' },
  { id: 'allergy-009', name: 'Metronidazole (Flagyl)', category: 'Kháng sinh', severity: 'medium' },
  
  // Thuốc giảm đau/chống viêm
  { id: 'allergy-010', name: 'Aspirin', category: 'Giảm đau', severity: 'high' },
  { id: 'allergy-011', name: 'Ibuprofen', category: 'Giảm đau', severity: 'medium' },
  { id: 'allergy-012', name: 'Naproxen', category: 'Giảm đau', severity: 'medium' },
  { id: 'allergy-013', name: 'Diclofenac', category: 'Giảm đau', severity: 'medium' },
  { id: 'allergy-014', name: 'NSAIDs (nhóm thuốc)', category: 'Giảm đau', severity: 'high' },
  { id: 'allergy-015', name: 'Paracetamol', category: 'Giảm đau', severity: 'medium' },
  
  // Thuốc gây mê/giảm đau mạnh
  { id: 'allergy-016', name: 'Morphine', category: 'Giảm đau mạnh', severity: 'high' },
  { id: 'allergy-017', name: 'Codeine', category: 'Giảm đau mạnh', severity: 'high' },
  { id: 'allergy-018', name: 'Fentanyl', category: 'Giảm đau mạnh', severity: 'high' },
  { id: 'allergy-019', name: 'Lidocaine (gây tê)', category: 'Gây tê', severity: 'medium' },
  { id: 'allergy-020', name: 'Novocaine (Procaine)', category: 'Gây tê', severity: 'medium' },
  
  // Thuốc khác
  { id: 'allergy-021', name: 'Insulin', category: 'Nội tiết', severity: 'high' },
  { id: 'allergy-022', name: 'Heparin', category: 'Chống đông', severity: 'high' },
  { id: 'allergy-023', name: 'Warfarin', category: 'Chống đông', severity: 'medium' },
  { id: 'allergy-024', name: 'Amlodipine', category: 'Tim mạch', severity: 'medium' },
  { id: 'allergy-025', name: 'Atorvastatin', category: 'Hạ mỡ máu', severity: 'medium' },
  
  // Thuốc cản quang và vật liệu y tế
  { id: 'allergy-026', name: 'Iodine (Cản quang)', category: 'Chẩn đoán', severity: 'high' },
  { id: 'allergy-027', name: 'Gadolinium (MRI)', category: 'Chẩn đoán', severity: 'high' },
  { id: 'allergy-028', name: 'Latex', category: 'Vật liệu', severity: 'high' },
  { id: 'allergy-029', name: 'Băng dính y tế', category: 'Vật liệu', severity: 'low' },
  { id: 'allergy-030', name: 'Cồn y tế', category: 'Vật liệu', severity: 'low' },
  
  // Thực phẩm
  { id: 'allergy-031', name: 'Hải sản (tôm, cua)', category: 'Thực phẩm', severity: 'high' },
  { id: 'allergy-032', name: 'Sò, ốc, nghêu', category: 'Thực phẩm', severity: 'high' },
  { id: 'allergy-033', name: 'Cá', category: 'Thực phẩm', severity: 'medium' },
  { id: 'allergy-034', name: 'Trứng', category: 'Thực phẩm', severity: 'medium' },
  { id: 'allergy-035', name: 'Sữa bò', category: 'Thực phẩm', severity: 'medium' },
  { id: 'allergy-036', name: 'Đậu phộng', category: 'Thực phẩm', severity: 'high' },
  { id: 'allergy-037', name: 'Hạt điều, hạt phỉ', category: 'Thực phẩm', severity: 'high' },
  { id: 'allergy-038', name: 'Lúa mì (Gluten)', category: 'Thực phẩm', severity: 'medium' },
  { id: 'allergy-039', name: 'Đậu nành', category: 'Thực phẩm', severity: 'medium' },
  
  // Môi trường
  { id: 'allergy-040', name: 'Phấn hoa', category: 'Môi trường', severity: 'low' },
  { id: 'allergy-041', name: 'Bụi nhà', category: 'Môi trường', severity: 'low' },
  { id: 'allergy-042', name: 'Lông thú cưng (chó, mèo)', category: 'Môi trường', severity: 'low' },
  { id: 'allergy-043', name: 'Nấm mốc', category: 'Môi trường', severity: 'low' },
  { id: 'allergy-044', name: 'Ong, ong vò vẽ (nọc độc)', category: 'Côn trùng', severity: 'high' },
  { id: 'allergy-045', name: 'Kiến lửa', category: 'Côn trùng', severity: 'medium' },
];

// Danh sách bệnh nền phổ biến ở người cao tuổi
export const commonConditions = [
  // Tim mạch
  { id: 'condition-001', name: 'Tăng huyết áp', category: 'Tim mạch', icd10: 'I10', severity: 'medium' },
  { id: 'condition-002', name: 'Bệnh mạch vành', category: 'Tim mạch', icd10: 'I25', severity: 'high' },
  { id: 'condition-003', name: 'Suy tim', category: 'Tim mạch', icd10: 'I50', severity: 'high' },
  { id: 'condition-004', name: 'Rung nhĩ', category: 'Tim mạch', icd10: 'I48', severity: 'high' },
  { id: 'condition-005', name: 'Nhồi máu cơ tim (tiền sử)', category: 'Tim mạch', icd10: 'I25.2', severity: 'high' },
  { id: 'condition-006', name: 'Bệnh van tim', category: 'Tim mạch', icd10: 'I34-I39', severity: 'medium' },
  { id: 'condition-007', name: 'Bệnh động mạch ngoại biên', category: 'Tim mạch', icd10: 'I73', severity: 'medium' },
  { id: 'condition-008', name: 'Suy tĩnh mạch chi dưới', category: 'Tim mạch', icd10: 'I87.2', severity: 'low' },
  
  // Chuyển hóa/Nội tiết
  { id: 'condition-009', name: 'Đái tháo đường type 2', category: 'Nội tiết', icd10: 'E11', severity: 'high' },
  { id: 'condition-010', name: 'Đái tháo đường type 1', category: 'Nội tiết', icd10: 'E10', severity: 'high' },
  { id: 'condition-011', name: 'Rối loạn lipid máu', category: 'Nội tiết', icd10: 'E78', severity: 'medium' },
  { id: 'condition-012', name: 'Gút (Gout)', category: 'Nội tiết', icd10: 'M10', severity: 'medium' },
  { id: 'condition-013', name: 'Béo phì', category: 'Nội tiết', icd10: 'E66', severity: 'medium' },
  { id: 'condition-014', name: 'Suy giáp', category: 'Nội tiết', icd10: 'E03', severity: 'medium' },
  { id: 'condition-015', name: 'Cường giáp', category: 'Nội tiết', icd10: 'E05', severity: 'medium' },
  
  // Thần kinh
  { id: 'condition-016', name: 'Tai biến mạch máu não (tiền sử)', category: 'Thần kinh', icd10: 'I69', severity: 'high' },
  { id: 'condition-017', name: 'Parkinson', category: 'Thần kinh', icd10: 'G20', severity: 'high' },
  { id: 'condition-018', name: 'Alzheimer', category: 'Thần kinh', icd10: 'G30', severity: 'high' },
  { id: 'condition-019', name: 'Sa sút trí tuệ (Dementia)', category: 'Thần kinh', icd10: 'F03', severity: 'high' },
  { id: 'condition-020', name: 'Động kinh', category: 'Thần kinh', icd10: 'G40', severity: 'high' },
  { id: 'condition-021', name: 'Đau thần kinh tọa', category: 'Thần kinh', icd10: 'M54.3', severity: 'low' },
  { id: 'condition-022', name: 'Rối loạn tiền đình', category: 'Thần kinh', icd10: 'H81', severity: 'low' },
  { id: 'condition-023', name: 'Chứng đau nửa đầu (Migraine)', category: 'Thần kinh', icd10: 'G43', severity: 'medium' },
  
  // Hô hấp
  { id: 'condition-024', name: 'Hen suyễn', category: 'Hô hấp', icd10: 'J45', severity: 'medium' },
  { id: 'condition-025', name: 'COPD (Bệnh phổi tắc nghẽn mạn)', category: 'Hô hấp', icd10: 'J44', severity: 'high' },
  { id: 'condition-026', name: 'Viêm phế quản mạn', category: 'Hô hấp', icd10: 'J42', severity: 'medium' },
  { id: 'condition-027', name: 'Xơ phổi', category: 'Hô hấp', icd10: 'J84', severity: 'high' },
  { id: 'condition-028', name: 'Ngưng thở khi ngủ (Sleep Apnea)', category: 'Hô hấp', icd10: 'G47.3', severity: 'medium' },
  
  // Tiêu hóa
  { id: 'condition-029', name: 'Loét dạ dày-tá tràng', category: 'Tiêu hóa', icd10: 'K25-K27', severity: 'medium' },
  { id: 'condition-030', name: 'Trào ngược dạ dày-thực quản (GERD)', category: 'Tiêu hóa', icd10: 'K21', severity: 'low' },
  { id: 'condition-031', name: 'Viêm gan B mạn', category: 'Tiêu hóa', icd10: 'B18.1', severity: 'high' },
  { id: 'condition-032', name: 'Viêm gan C mạn', category: 'Tiêu hóa', icd10: 'B18.2', severity: 'high' },
  { id: 'condition-033', name: 'Xơ gan', category: 'Tiêu hóa', icd10: 'K74', severity: 'high' },
  { id: 'condition-034', name: 'Hội chứng ruột kích thích (IBS)', category: 'Tiêu hóa', icd10: 'K58', severity: 'low' },
  { id: 'condition-035', name: 'Táo bón mạn', category: 'Tiêu hóa', icd10: 'K59.0', severity: 'low' },
  
  // Thận-Tiết niệu
  { id: 'condition-036', name: 'Suy thận mạn', category: 'Thận', icd10: 'N18', severity: 'high' },
  { id: 'condition-037', name: 'Sỏi thận', category: 'Thận', icd10: 'N20', severity: 'medium' },
  { id: 'condition-038', name: 'Phì đại tuyến tiền liệt lành tính (BPH)', category: 'Tiết niệu', icd10: 'N40', severity: 'low' },
  { id: 'condition-039', name: 'Viêm bàng quang mạn', category: 'Tiết niệu', icd10: 'N30', severity: 'low' },
  
  // Xương khớp
  { id: 'condition-040', name: 'Loãng xương', category: 'Xương khớp', icd10: 'M81', severity: 'medium' },
  { id: 'condition-041', name: 'Thoái hóa khớp gối', category: 'Xương khớp', icd10: 'M17', severity: 'medium' },
  { id: 'condition-042', name: 'Thoái hóa cột sống', category: 'Xương khớp', icd10: 'M47', severity: 'medium' },
  { id: 'condition-043', name: 'Viêm khớp dạng thấp', category: 'Xương khớp', icd10: 'M05', severity: 'medium' },
  { id: 'condition-044', name: 'Đau lưng mạn', category: 'Xương khớp', icd10: 'M54.5', severity: 'low' },
  
  // Tâm thần
  { id: 'condition-045', name: 'Trầm cảm', category: 'Tâm thần', icd10: 'F32-F33', severity: 'medium' },
  { id: 'condition-046', name: 'Lo âu', category: 'Tâm thần', icd10: 'F41', severity: 'medium' },
  { id: 'condition-047', name: 'Rối loạn lưỡng cực', category: 'Tâm thần', icd10: 'F31', severity: 'high' },
  { id: 'condition-048', name: 'Tâm thần phân liệt', category: 'Tâm thần', icd10: 'F20', severity: 'high' },
  { id: 'condition-049', name: 'Mất ngủ mạn', category: 'Tâm thần', icd10: 'F51.0', severity: 'low' },
  
  // Mắt/Tai
  { id: 'condition-050', name: 'Đục thủy tinh thể (Cataract)', category: 'Mắt', icd10: 'H25-H26', severity: 'low' },
  { id: 'condition-051', name: 'Glaucoma (Tăng nhãn áp)', category: 'Mắt', icd10: 'H40', severity: 'medium' },
  { id: 'condition-052', name: 'Thoái hóa điểm vàng (AMD)', category: 'Mắt', icd10: 'H35.3', severity: 'medium' },
  { id: 'condition-053', name: 'Điếc/Giảm thính lực', category: 'Tai', icd10: 'H90-H91', severity: 'low' },
  
  // Ung thư (tiền sử)
  { id: 'condition-054', name: 'Ung thư phổi (tiền sử)', category: 'Ung thư', icd10: 'C34', severity: 'high' },
  { id: 'condition-055', name: 'Ung thư đại trực tràng (tiền sử)', category: 'Ung thư', icd10: 'C18-C20', severity: 'high' },
  { id: 'condition-056', name: 'Ung thư vú (tiền sử)', category: 'Ung thư', icd10: 'C50', severity: 'high' },
  { id: 'condition-057', name: 'Ung thư tuyến tiền liệt (tiền sử)', category: 'Ung thư', icd10: 'C61', severity: 'high' },
  { id: 'condition-058', name: 'Ung thư gan (tiền sử)', category: 'Ung thư', icd10: 'C22', severity: 'high' },
  
  // Huyết học
  { id: 'condition-059', name: 'Thiếu máu', category: 'Huyết học', icd10: 'D50-D64', severity: 'medium' },
  { id: 'condition-060', name: 'Rối loạn đông máu', category: 'Huyết học', icd10: 'D65-D69', severity: 'high' },
];

// Helper functions
export const searchAllergies = (query) => {
  if (!query || query.trim() === '') return [];
  const lowerQuery = query.toLowerCase();
  return commonAllergies.filter(allergy => 
    allergy.name.toLowerCase().includes(lowerQuery) ||
    allergy.category.toLowerCase().includes(lowerQuery)
  );
};

export const searchConditions = (query) => {
  if (!query || query.trim() === '') return [];
  const lowerQuery = query.toLowerCase();
  return commonConditions.filter(condition => 
    condition.name.toLowerCase().includes(lowerQuery) ||
    condition.category.toLowerCase().includes(lowerQuery) ||
    (condition.icd10 && condition.icd10.toLowerCase().includes(lowerQuery))
  );
};

export const getAllergiesByCategory = () => {
  const grouped = {};
  commonAllergies.forEach(allergy => {
    if (!grouped[allergy.category]) {
      grouped[allergy.category] = [];
    }
    grouped[allergy.category].push(allergy);
  });
  return grouped;
};

export const getConditionsByCategory = () => {
  const grouped = {};
  commonConditions.forEach(condition => {
    if (!grouped[condition.category]) {
      grouped[condition.category] = [];
    }
    grouped[condition.category].push(condition);
  });
  return grouped;
};
