import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiSearch, FiPlus, FiDownload, FiEdit2, FiTrash2, FiMaximize,
  FiLock, FiUnlock, FiEye, FiUser, FiPhone, FiHome, FiUsers, FiShield, FiAlertTriangle, FiActivity
} from 'react-icons/fi';
import AdminLayout from '../../components/AdminLayout';
import PatientForm from './PatientForm';
import QRCodeCard from '../../components/QRCodeCard';
import { usePatients } from '../../hooks/usePatients';
import { calculateAge } from '../../data/mockData';
import './PatientManagement.css';

export default function PatientManagement() {
  // Firestore hooks
  const { 
    patients, 
    loading: patientsLoading, 
    error: patientsError,
    addPatient,
    updatePatient,
    deletePatient,
    searchPatients
  } = usePatients();

  const [searchTerm, setSearchTerm] = useState('');
  const [bloodFilter, setBloodFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  
  // Modals
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [qrPatient, setQrPatient] = useState(null);
  
  // Local loading states for operations
  const [operationLoading, setOperationLoading] = useState(false);

  // Filter logic - now using Firestore data
  const filteredPatients = useMemo(() => {
    // First, apply search
    const searched = searchTerm ? searchPatients(searchTerm) : patients;
    
    // Then apply blood and status filters
    return searched.filter((p) => {
      const matchBlood = bloodFilter === 'ALL' || p.bloodType === bloodFilter;
      const matchStatus = statusFilter === 'ALL' || p.braceletStatus === statusFilter;
      return matchBlood && matchStatus;
    });
  }, [patients, searchTerm, bloodFilter, statusFilter, searchPatients]);

  // Stats
  const stats = useMemo(() => {
    const total = patients.length;
    const active = patients.filter(p => p.braceletStatus === 'active').length;
    const locked = patients.filter(p => p.braceletStatus === 'locked').length;
    const withAllergies = patients.filter(p => p.allergies && p.allergies.length > 0).length;
    return { total, active, locked, withAllergies };
  }, [patients]);

  // Handlers
  const handleCreateNew = () => {
    setEditingPatient(null);
    setShowFormModal(true);
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setShowFormModal(true);
  };

  const handleSavePatient = async (patientData) => {
    setOperationLoading(true);
    
    if (editingPatient) {
      // Update existing patient
      const result = await updatePatient(editingPatient.id, {
        ...patientData,
        braceletStatus: editingPatient.braceletStatus // Keep existing status
      });
      
      if (result.success) {
        setShowFormModal(false);
        setEditingPatient(null);
      } else {
        alert(`Lỗi cập nhật: ${result.error}`);
      }
    } else {
      // Create new patient
      const newPatientData = {
        ...patientData,
        braceletStatus: 'active',
        medicalRecord: {
          medications: [],
          examHistory: [],
          specialInstructions: patientData.specialInstructions || ''
        }
      };
      
      const result = await addPatient(newPatientData);
      
      if (result.success) {
        setShowFormModal(false);
        // Tự động hiển thị modal QR sau khi thêm bệnh nhân mới
        // Note: need to find the newly added patient from the list
        setTimeout(() => {
          const newPatient = patients.find(p => p.id === result.id);
          if (newPatient) {
            setQrPatient(newPatient);
          }
        }, 500);
      } else {
        alert(`Lỗi thêm bệnh nhân: ${result.error}`);
      }
    }
    
    setOperationLoading(false);
  };

  const handleToggleLock = async (id) => {
    const patient = patients.find(p => p.id === id);
    if (!patient) return;
    
    const nextStatus = patient.braceletStatus === 'active' ? 'locked' : 'active';
    const result = await updatePatient(id, { braceletStatus: nextStatus });
    
    if (!result.success) {
      alert(`Lỗi cập nhật trạng thái: ${result.error}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bệnh nhân này khỏi hệ thống?')) {
      setOperationLoading(true);
      const result = await deletePatient(id);
      
      if (!result.success) {
        alert(`Lỗi xóa bệnh nhân: ${result.error}`);
      }
      setOperationLoading(false);
    }
  };

  const handleExportCSV = () => {
    const headers = "ID,Họ Tên,Năm Sinh,Giới Tính,Nhóm Máu,Bệnh Nền,Trạng Thái\n";
    const rows = patients.map(p => 
      `"${p.id}","${p.name}","${p.birthYear}","${p.gender}","${p.bloodType}","${(p.conditions || []).join(';') || 'Không'}","${p.braceletStatus}"`
    ).join("\n");

    const blob = new Blob(["\uFEFF" + headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Danh_sach_benh_nhan_MedLink_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout currentTab="patients">
      {/* Top Header & Breadcrumb */}
      <div className="admin-page-header">
        <div className="header-title-box">
          <h2>Danh Sách Bệnh Nhân & Vòng Tay QR</h2>
          <span className="subtitle">Quản lý hồ sơ cấp cứu và trạng thái mã QR vòng tay</span>
        </div>
        <div className="breadcrumb-box">
          <FiHome className="bc-icon" />
          <span>Trang chủ</span>
          <span className="bc-sep">&gt;</span>
          <span className="bc-current">Quản lý bệnh nhân</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid mb-3">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e0f2fe' }}>
            <FiUsers style={{ color: '#0284c7' }} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Tổng bệnh nhân</div>
            <div className="stat-value">{stats.total}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#dcfce7' }}>
            <FiShield style={{ color: '#16a34a' }} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Đang hoạt động</div>
            <div className="stat-value">{stats.active}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fee2e2' }}>
            <FiLock style={{ color: '#dc2626' }} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Đã khóa</div>
            <div className="stat-value">{stats.locked}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fef3c7' }}>
            <FiAlertTriangle style={{ color: '#d97706' }} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Có dị ứng</div>
            <div className="stat-value">{stats.withAllergies}</div>
          </div>
        </div>
      </div>

      {/* Filter & Toolbar Box (Matching Reference Layout) */}
      <div className="admin-toolbar-card card mb-3">
        <div className="toolbar-flex">
          {/* Search */}
          <div className="search-input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập từ khóa tìm kiếm (tên, mã ID, bệnh nền...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">
              <FiSearch />
            </button>
          </div>

          {/* Filters */}
          <div className="filter-select-group">
            <select
              className="form-select"
              value={bloodFilter}
              onChange={(e) => setBloodFilter(e.target.value)}
            >
              <option value="ALL">Tất cả (nhóm máu)</option>
              <option value="A+">Nhóm máu A+</option>
              <option value="A-">Nhóm máu A-</option>
              <option value="B+">Nhóm máu B+</option>
              <option value="B-">Nhóm máu B-</option>
              <option value="O+">Nhóm máu O+</option>
              <option value="O-">Nhóm máu O-</option>
              <option value="AB+">Nhóm máu AB+</option>
              <option value="AB-">Nhóm máu AB-</option>
            </select>

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Tất cả (trạng thái)</option>
              <option value="active">🟢 Đang hoạt động</option>
              <option value="locked">🔴 Đã khóa vòng tay</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons-group">
            <button onClick={handleCreateNew} className="btn btn-primary">
              <FiPlus /> Thêm mới
            </button>
            <button onClick={handleExportCSV} className="btn btn-success">
              <FiDownload /> Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Loading & Error States */}
      {patientsLoading && (
        <div className="card p-4 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <p className="mt-3 text-muted">Đang tải dữ liệu từ Firestore...</p>
        </div>
      )}

      {patientsError && (
        <div className="alert alert-danger">
          <FiAlertTriangle /> Lỗi tải dữ liệu: {patientsError}
        </div>
      )}

      {/* Data Table Card */}
      {!patientsLoading && !patientsError && (
        <div className="admin-table-card card">
          <div className="admin-table-responsive">
            <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th style={{ width: '190px' }}>Họ và tên</th>
                <th style={{ width: '100px' }}>Năm sinh</th>
                <th style={{ width: '90px' }}>Nhóm máu</th>
                <th>Bệnh nền & Dị ứng</th>
                <th style={{ width: '160px' }}>SĐT Khẩn cấp</th>
                <th style={{ width: '120px' }}>Trạng thái</th>
                <th style={{ width: '160px', textAlign: 'center' }}>Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((p) => (
                  <tr key={p.id}>
                    <td className="patient-id-cell">
                      <strong>#{p.id.replace('patient-', '')}</strong>
                    </td>
                    <td>
                      <div className="patient-name-box">
                        <span className="patient-name-text">{p.name}</span>
                        <span className="patient-gender-sub">{p.gender}</span>
                      </div>
                    </td>
                    <td>
                      {p.birthYear} <small className="text-muted">({calculateAge(p.birthYear)}t)</small>
                    </td>
                    <td>
                      <span className="badge badge-primary">{p.bloodType}</span>
                    </td>
                    <td>
                      <div className="tags-cell">
                        {p.allergies && p.allergies.map((alg, i) => (
                          <span key={`a-${i}`} className="badge badge-danger">⚠️ {alg}</span>
                        ))}
                        {p.conditions && p.conditions.map((cond, i) => (
                          <span key={`c-${i}`} className="badge badge-warning">{cond}</span>
                        ))}
                        {(!p.allergies || p.allergies.length === 0) && (!p.conditions || p.conditions.length === 0) && (
                          <span className="text-muted font-sm">Bình thường</span>
                        )}
                      </div>
                    </td>
                    <td>
                      {p.emergencyContacts && p.emergencyContacts.length > 0 ? (
                        <div className="contact-mini">
                          <span className="contact-name">{p.emergencyContacts[0].name}</span>
                          <span className="contact-phone"><FiPhone /> {p.emergencyContacts[0].phone}</span>
                        </div>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                    <td>
                      {p.braceletStatus === 'active' ? (
                        <span className="badge badge-success">🟢 Hoạt động</span>
                      ) : (
                        <span className="badge badge-danger">🔴 Đã khóa</span>
                      )}
                    </td>
                    <td className="actions-cell">
                      <div className="actions-flex">
                        <Link
                          to={`/emergency/${p.id}`}
                          className="btn-action view"
                          title="Xem trang thông tin cấp cứu công khai"
                          target="_blank"
                        >
                          <FiEye />
                        </Link>
                        <button
                          onClick={() => setQrPatient(p)}
                          className="btn-action qr"
                          title="Tạo & Tải mã QR"
                        >
                          <FiMaximize />
                        </button>
                        <button
                          onClick={() => handleEdit(p)}
                          className="btn-action edit"
                          title="Chỉnh sửa thông tin"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleToggleLock(p.id)}
                          className={`btn-action ${p.braceletStatus === 'active' ? 'lock' : 'unlock'}`}
                          title={p.braceletStatus === 'active' ? 'Khóa vòng tay' : 'Mở khóa vòng tay'}
                        >
                          {p.braceletStatus === 'active' ? <FiLock /> : <FiUnlock />}
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="btn-action delete"
                          title="Xóa"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted">
                    Không tìm thấy bệnh nhân nào phù hợp với bộ lọc.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* Patient Form Modal */}
      {showFormModal && (
        <PatientForm
          patient={editingPatient}
          onSave={handleSavePatient}
          onClose={() => setShowFormModal(false)}
        />
      )}

      {/* QR Code Modal */}
      {qrPatient && (
        <QRCodeCard
          patient={qrPatient}
          onClose={() => setQrPatient(null)}
        />
      )}
    </AdminLayout>
  );
}
