import { useState } from 'react';
import {
  FiUser, FiCalendar, FiDroplet, FiHeart, FiAlertTriangle, FiCheckSquare,
  FiClock, FiFileText, FiPrinter, FiPlusCircle, FiShield, FiPhoneCall, FiAward
} from 'react-icons/fi';
import { calculateAge } from '../../data/mockData';

export default function MedicalRecord({ patient }) {
  const { medicalRecord } = patient;
  const [activeTab, setActiveTab] = useState('history'); // history | medications | notes
  const [examHistory, setExamHistory] = useState(medicalRecord?.examHistory || []);
  const [showAddExamModal, setShowAddExamModal] = useState(false);
  const [newExam, setNewExam] = useState({
    date: new Date().toISOString().split('T')[0],
    doctor: 'BS. Trực Cấp Cứu',
    diagnosis: '',
    note: ''
  });

  const handlePrint = () => {
    window.print();
  };

  const handleAddExamSubmit = (e) => {
    e.preventDefault();
    if (!newExam.diagnosis) return;

    setExamHistory([newExam, ...examHistory]);
    setShowAddExamModal(false);
    setNewExam({
      date: new Date().toISOString().split('T')[0],
      doctor: 'BS. Trực Cấp Cứu',
      diagnosis: '',
      note: ''
    });
  };

  return (
    <div className="medical-record-container fade-in">
      {/* Patient Header Card */}
      <div className="patient-summary-card glass-panel mb-4">
        <div className="summary-header">
          <div className="patient-avatar-box">
            {patient.avatar ? (
              <img src={patient.avatar} alt={patient.name} />
            ) : (
              <div className="avatar-placeholder-doc">
                <FiUser />
              </div>
            )}
          </div>
          <div className="patient-main-meta">
            <div className="patient-title-row">
              <h2>{patient.name}</h2>
              <span className="badge badge-success">
                <FiAward style={{ marginRight: '4px' }} /> Hồ sơ verified
              </span>
            </div>
            <div className="patient-meta-grid">
              <span><strong>Mã BN:</strong> #{patient.id.toUpperCase()}</span>
              <span><FiCalendar /> {patient.birthYear} ({calculateAge(patient.birthYear)} tuổi)</span>
              <span><strong>Giới tính:</strong> {patient.gender}</span>
              <span><FiDroplet className="text-danger" /> <strong>Nhóm máu:</strong> {patient.bloodType}</span>
            </div>
          </div>
          <div className="summary-actions">
            <button onClick={handlePrint} className="btn btn-outline btn-sm no-print">
              <FiPrinter /> In Bệnh Án
            </button>
            <button
              onClick={() => setShowAddExamModal(true)}
              className="btn btn-primary btn-sm no-print"
            >
              <FiPlusCircle /> Thêm Khám Mới
            </button>
          </div>
        </div>
      </div>

      {/* Critical Medical Warning Box */}
      {medicalRecord?.specialInstructions && (
        <div className="critical-instruction-box mb-4 pulse-border">
          <div className="critical-header">
            <FiShield className="critical-icon" />
            <h3>CHỈ ĐỊNH ĐẶC BIỆT & CẢNH BÁO LÂM SÀNG</h3>
          </div>
          <div className="critical-content">
            <p>{medicalRecord.specialInstructions}</p>
          </div>
        </div>
      )}

      {/* Vitals Summary Strip */}
      <div className="record-grid-top mb-4">
        <div className="record-card glass-panel">
          <div className="record-card-title text-danger">
            <FiAlertTriangle /> Dị Ứng Thuốc / Thực Phẩm
          </div>
          {patient.allergies && patient.allergies.length > 0 ? (
            <ul className="allergy-list">
              {patient.allergies.map((alg, index) => (
                <li key={index} className="allergy-item-danger">
                  ⚠️ {alg}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">Chưa ghi nhận dị ứng</p>
          )}
        </div>

        <div className="record-card glass-panel">
          <div className="record-card-title text-warning">
            <FiHeart /> Bệnh Nền Tiền Sử
          </div>
          {patient.conditions && patient.conditions.length > 0 ? (
            <div className="condition-tags">
              {patient.conditions.map((cond, index) => (
                <span key={index} className="badge badge-warning">
                  {cond}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-muted">Chưa có thông tin bệnh nền</p>
          )}
        </div>

        <div className="record-card glass-panel">
          <div className="record-card-title text-info">
            <FiPhoneCall /> Bác Sĩ Phụ Trách Chính
          </div>
          {patient.doctorContact ? (
            <div className="doctor-contact-info">
              <p className="doc-name">{patient.doctorContact.name}</p>
              <p className="doc-hospital">{patient.doctorContact.hospital}</p>
              <a href={`tel:${patient.doctorContact.phone}`} className="doc-phone">
                📞 {patient.doctorContact.phone}
              </a>
            </div>
          ) : (
            <p className="text-muted">Chưa đăng ký bác sĩ phụ trách</p>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="record-tabs-wrapper no-print">
        <div className="record-tabs">
          <button
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <FiClock /> Lịch Sử Khám Bệnh ({examHistory.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'medications' ? 'active' : ''}`}
            onClick={() => setActiveTab('medications')}
          >
            <FiCheckSquare /> Đơn Thuốc Đang Dùng ({medicalRecord?.medications?.length || 0})
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="record-tab-content">
        {/* Tab 1: Exam History Timeline */}
        {activeTab === 'history' && (
          <div className="timeline-section glass-panel">
            <h3 className="section-title">
              <FiClock /> Lịch Sử Lần Khám & Chẩn Đoán
            </h3>
            {examHistory.length > 0 ? (
              <div className="timeline">
                {examHistory.map((exam, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <span className="timeline-date">
                          <FiCalendar /> {exam.date}
                        </span>
                        <span className="timeline-doctor">
                          <FiUser /> {exam.doctor}
                        </span>
                      </div>
                      <h4 className="timeline-diagnosis">{exam.diagnosis}</h4>
                      {exam.note && (
                        <p className="timeline-note">
                          <strong>Ghi chú / Đề xuất:</strong> {exam.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted text-center py-4">Chưa có dữ liệu lịch sử khám bệnh.</p>
            )}
          </div>
        )}

        {/* Tab 2: Active Medications */}
        {activeTab === 'medications' && (
          <div className="medications-section glass-panel">
            <h3 className="section-title">
              <FiCheckSquare /> Đơn Thuốc Đang Sử Dụng Thường Xuyên
            </h3>
            {medicalRecord?.medications && medicalRecord.medications.length > 0 ? (
              <div className="medication-table-wrapper">
                <table className="medication-table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên Thuốc</th>
                      <th>Liều Dùng</th>
                      <th>Ghi Chú Y Khoa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicalRecord.medications.map((med, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="med-name">
                          <strong>{med.name}</strong>
                        </td>
                        <td className="med-dosage">{med.dosage}</td>
                        <td className="med-note">{med.note || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted text-center py-4">Chưa có thông tin đơn thuốc.</p>
            )}
          </div>
        )}
      </div>

      {/* Modal Add Exam Record */}
      {showAddExamModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel fade-in">
            <div className="modal-header">
              <h3>Thêm Nhật Ký Khám Bệnh Mới</h3>
              <button
                className="modal-close"
                onClick={() => setShowAddExamModal(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAddExamSubmit} className="modal-body">
              <div className="form-group">
                <label className="form-label">Ngày khám</label>
                <input
                  type="date"
                  className="form-control"
                  value={newExam.date}
                  onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Bác sĩ / Khoa khám</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="VD: BS. Nguyễn Văn A - Khoa Cấp Cứu"
                  value={newExam.doctor}
                  onChange={(e) => setNewExam({ ...newExam, doctor: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Chẩn đoán / Tình trạng</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Nhập chẩn đoán y khoa..."
                  value={newExam.diagnosis}
                  onChange={(e) => setNewExam({ ...newExam, diagnosis: e.target.value })}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Ghi chú & Y lệnh</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Thuốc kê thêm, chỉ định tái khám..."
                  value={newExam.note}
                  onChange={(e) => setNewExam({ ...newExam, note: e.target.value })}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowAddExamModal(false)}
                >
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                  Lưu Nhật Ký
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
