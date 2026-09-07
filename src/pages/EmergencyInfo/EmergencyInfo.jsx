import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiPhone, FiAlertTriangle, FiHeart, FiDroplet, FiShield, FiFileText, FiUser, FiCalendar } from 'react-icons/fi';
import { calculateAge } from '../../data/mockData';
import { usePatients } from '../../hooks/usePatients';
import './EmergencyInfo.css';

export default function EmergencyInfo() {
  const { patientId } = useParams();
  const { getPatientById } = usePatients();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPatient() {
      setLoading(true);
      setError(null);
      
      const result = await getPatientById(patientId);
      
      if (result.success) {
        const data = result.data;
        if (data.braceletStatus === 'locked') {
          setError('locked');
        } else {
          setPatient(data);
        }
      } else {
        setError('not_found');
      }
      
      setLoading(false);
    }

    fetchPatient();
  }, [patientId, getPatientById]);

  if (loading) {
    return (
      <div className="emergency-page">
        <div className="container">
          <div className="page-loading">
            <div className="emergency-loading-icon">
              <FiHeart />
            </div>
            <div className="spinner spinner-lg"></div>
            <p className="page-loading-text">Đang tải thông tin cấp cứu...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error === 'locked') {
    return (
      <div className="emergency-page">
        <div className="container">
          <div className="emergency-error">
            <div className="emergency-error-icon locked">
              <FiShield />
            </div>
            <h2>Vòng Tay Đã Bị Vô Hiệu Hóa</h2>
            <p>Vòng tay này đã được báo mất và bị khóa bởi chủ sở hữu.</p>
            <p className="emergency-error-sub">Nếu bạn tìm thấy vòng tay này, vui lòng liên hệ cơ sở y tế gần nhất.</p>
          </div>
        </div>
      </div>
    );
  }

  if (error === 'not_found') {
    return (
      <div className="emergency-page">
        <div className="container">
          <div className="emergency-error">
            <div className="emergency-error-icon">
              <FiAlertTriangle />
            </div>
            <h2>Không Tìm Thấy Thông Tin</h2>
            <p>Mã QR/NFC này không hợp lệ hoặc đã bị xóa.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="emergency-page">
      <div className="container">
        {/* Emergency Header */}
        <header className="emergency-header">
          <div className="emergency-header-pulse"></div>
          <div className="emergency-header-content">
            <FiAlertTriangle className="emergency-header-icon" />
            <h1>THÔNG TIN CẤP CỨU</h1>
          </div>
        </header>

        {/* Patient Identity */}
        <section className="emergency-identity" style={{ animationDelay: '0.1s' }}>
          <div className="emergency-avatar">
            {patient.avatar ? (
              <img src={patient.avatar} alt={patient.name} />
            ) : (
              <div className="emergency-avatar-placeholder">
                <FiUser />
              </div>
            )}
          </div>
          <div className="emergency-identity-info">
            <h2 className="emergency-name">{patient.name}</h2>
            <div className="emergency-identity-meta">
              <span className="emergency-meta-item">
                <FiCalendar />
                {patient.birthYear} ({calculateAge(patient.birthYear)} tuổi)
              </span>
              <span className="emergency-meta-item">
                {patient.gender}
              </span>
            </div>
          </div>
        </section>

        {/* Vital Info Cards */}
        <section className="emergency-vitals">
          {/* Blood Type */}
          <div className="vital-card blood-type" style={{ animationDelay: '0.2s' }}>
            <div className="vital-card-icon blood">
              <FiDroplet />
            </div>
            <div className="vital-card-content">
              <span className="vital-card-label">Nhóm máu</span>
              <span className="vital-card-value blood">{patient.bloodType}</span>
            </div>
          </div>

          {/* Allergies */}
          <div className={`vital-card allergies ${patient.allergies.length > 0 ? 'has-data' : ''}`} style={{ animationDelay: '0.3s' }}>
            <div className="vital-card-icon danger">
              <FiAlertTriangle />
            </div>
            <div className="vital-card-content">
              <span className="vital-card-label">Dị ứng</span>
              {patient.allergies.length > 0 ? (
                <div className="vital-tags">
                  {patient.allergies.map((allergy, i) => (
                    <span key={i} className="badge badge-danger badge-lg">{allergy}</span>
                  ))}
                </div>
              ) : (
                <span className="vital-card-value safe">Không có</span>
              )}
            </div>
          </div>

          {/* Conditions */}
          <div className="vital-card conditions" style={{ animationDelay: '0.4s' }}>
            <div className="vital-card-icon primary">
              <FiHeart />
            </div>
            <div className="vital-card-content">
              <span className="vital-card-label">Bệnh nền</span>
              {patient.conditions.length > 0 ? (
                <div className="vital-tags">
                  {patient.conditions.map((condition, i) => (
                    <span key={i} className="badge badge-warning badge-lg">{condition}</span>
                  ))}
                </div>
              ) : (
                <span className="vital-card-value safe">Không có</span>
              )}
            </div>
          </div>

          {/* Special Instructions */}
          {patient.medicalRecord?.specialInstructions && (
            <div className="vital-card special-instructions" style={{ animationDelay: '0.45s' }}>
              <div className="vital-card-icon danger">
                <FiShield />
              </div>
              <div className="vital-card-content">
                <span className="vital-card-label">Chỉ định đặc biệt</span>
                <p className="special-instructions-text">
                  {patient.medicalRecord.specialInstructions}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Emergency Call Buttons */}
        <section className="emergency-actions" style={{ animationDelay: '0.5s' }}>
          <h3 className="emergency-actions-title">
            <FiPhone /> Gọi Khẩn Cấp
          </h3>

          {patient.emergencyContacts.map((contact, i) => (
            <a
              key={i}
              href={`tel:${contact.phone}`}
              className="emergency-call-btn family"
              id={`call-family-${i}`}
            >
              <div className="call-btn-icon">
                <FiPhone />
              </div>
              <div className="call-btn-info">
                <span className="call-btn-name">{contact.name}</span>
                <span className="call-btn-phone">{contact.phone}</span>
              </div>
              <div className="call-btn-action">GỌI NGAY</div>
            </a>
          ))}

          {patient.doctorContact && (
            <a
              href={`tel:${patient.doctorContact.phone}`}
              className="emergency-call-btn doctor"
              id="call-doctor"
            >
              <div className="call-btn-icon doctor-icon">
                <FiHeart />
              </div>
              <div className="call-btn-info">
                <span className="call-btn-name">{patient.doctorContact.name}</span>
                <span className="call-btn-phone">{patient.doctorContact.hospital} • {patient.doctorContact.phone}</span>
              </div>
              <div className="call-btn-action">GỌI NGAY</div>
            </a>
          )}
        </section>

        {/* Doctor Access */}
        <section className="emergency-doctor-access" style={{ animationDelay: '0.6s' }}>
          <Link to={`/medical-record/${patientId}`} className="doctor-access-btn" id="view-medical-record">
            <FiFileText />
            <span>Xem Bệnh Án Chi Tiết</span>
            <span className="doctor-access-hint">(Dành cho bác sĩ - cần mật khẩu)</span>
          </Link>
        </section>

        {/* Footer */}
        <footer className="emergency-footer">
          <p>MedLink Band • Hệ thống thông tin cấp cứu y tế</p>
        </footer>
      </div>
    </div>
  );
}
