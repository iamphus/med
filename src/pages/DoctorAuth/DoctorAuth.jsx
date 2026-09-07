import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FiLock, FiUnlock, FiShield, FiFileText, FiArrowLeft, FiAlertTriangle,
  FiCheckCircle, FiActivity, FiKey
} from 'react-icons/fi';
import { DOCTOR_PASSWORD } from '../../data/mockData';
import { usePatients } from '../../hooks/usePatients';
import MedicalRecord from './MedicalRecord';
import './DoctorAuth.css';

export default function DoctorAuth() {
  const { patientId } = useParams();
  const { getPatientById } = usePatients();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check local session storage for doctor auth for this patient
    const isAuthed = sessionStorage.getItem(`doctor_auth_${patientId}`);
    if (isAuthed === 'true') {
      setIsAuthenticated(true);
    }

    async function fetchPatient() {
      const result = await getPatientById(patientId);
      if (result.success) {
        setPatient(result.data);
      } else {
        setPatient(null);
      }
      setLoading(false);
    }

    fetchPatient();
  }, [patientId, getPatientById]);

  const handleVerify = (e) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);

    setTimeout(() => {
      if (password === DOCTOR_PASSWORD || password === '123456') {
        setIsAuthenticated(true);
        sessionStorage.setItem(`doctor_auth_${patientId}`, 'true');
      } else {
        setAuthError('Mật khẩu xác thực không đúng. Vui lòng thử lại!');
      }
      setIsSubmitting(false);
    }, 500);
  };

  const handleLogoutDoctor = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(`doctor_auth_${patientId}`);
    setPassword('');
  };

  if (loading) {
    return (
      <div className="doctor-auth-page">
        <div className="container">
          <div className="page-loading">
            <div className="spinner spinner-lg"></div>
            <p className="page-loading-text">Đang xác thực thông tin...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="doctor-auth-page">
        <div className="container">
          <div className="card text-center py-5">
            <FiAlertTriangle style={{ fontSize: '3rem', color: 'var(--danger)' }} />
            <h2 className="mt-3">Không Tìm Thấy Bệnh Nhân</h2>
            <p className="text-secondary mt-2">Bệnh nhân không tồn tại hoặc mã QR không hợp lệ.</p>
            <Link to="/" className="btn btn-outline mt-4">Trở Về Trang Chủ</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-auth-page">
      {/* Navbar Header */}
      <header className="doctor-nav">
        <div className="container doctor-nav-container">
          <Link to={`/emergency/${patientId}`} className="doctor-back-btn">
            <FiArrowLeft /> <span>Quay lại Cấp cứu</span>
          </Link>
          <div className="doctor-badge">
            <FiShield className="badge-icon" />
            <span>Khu Vực Bác Sĩ / Y Tế</span>
          </div>
          {isAuthenticated && (
            <button onClick={handleLogoutDoctor} className="btn-logout-doctor">
              <FiLock /> Khóa lại
            </button>
          )}
        </div>
      </header>

      <main className="container doctor-main">
        {!isAuthenticated ? (
          /* Password Verification Card */
          <div className="auth-card-wrapper fade-in">
            <div className="auth-card glass-panel">
              <div className="auth-header">
                <div className="auth-icon-circle">
                  <FiLock />
                </div>
                <h2>Xác Thực Truy Cập Bệnh Án</h2>
                <p className="auth-subtitle">
                  Bệnh án chi tiết của bệnh nhân <strong>{patient.name}</strong> được bảo vệ theo tiêu chuẩn y tế.
                </p>
              </div>

              {authError && (
                <div className="auth-alert error pulse">
                  <FiAlertTriangle />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleVerify} className="auth-form">
                <div className="form-group">
                  <label htmlFor="doctor-pass" className="form-label">
                    <FiKey style={{ marginRight: '6px' }} />
                    Mật khẩu xác thực Bác sĩ / Mã OTP
                  </label>
                  <input
                    type="password"
                    id="doctor-pass"
                    className="form-control form-control-lg text-center"
                    placeholder="Nhập mật khẩu (Demo: medlink2024)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoFocus
                  />
                  <small className="form-text text-muted text-center block mt-2">
                    💡 <strong>Demo Mode:</strong> Sử dụng mật khẩu <code>medlink2024</code> hoặc <code>123456</code>
                  </small>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-lg mt-4"
                  disabled={isSubmitting || !password}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span> Đang xác minh...
                    </>
                  ) : (
                    <>
                      <FiUnlock style={{ marginRight: '8px' }} /> Mở Khóa Xem Bệnh Án
                    </>
                  )}
                </button>
              </form>

              <div className="auth-footer-notice">
                <FiCheckCircle className="notice-icon" />
                <span>Nhật ký truy cập sẽ được ghi lại tự động vì lý do bảo mật y tế.</span>
              </div>
            </div>
          </div>
        ) : (
          /* Detailed Medical Record Component */
          <MedicalRecord patient={patient} />
        )}
      </main>
    </div>
  );
}
