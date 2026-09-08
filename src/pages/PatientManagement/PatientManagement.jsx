import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiSearch, FiPlus, FiDownload, FiEdit2, FiTrash2, FiMaximize,
  FiLock, FiUnlock, FiEye, FiUser, FiPhone, FiHome, FiUsers, FiShield, FiAlertTriangle, FiActivity,
  FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import AdminLayout from '../../components/AdminLayout';
import PatientForm from './PatientForm';
import QRCodeCard from '../../components/QRCodeCard';
import ConfirmDialog from '../../components/ConfirmDialog';
import { usePatients } from '../../hooks/usePatients';
import { calculateAge } from '../../data/mockData';
import { useToast } from '../../components/ToastContainer';
import './PatientManagement.css';

export default function PatientManagement() {
  const toast = useToast();
  
  // Firestore hooks with pagination (10 per page)
  const { 
    patients, 
    loading: patientsLoading, 
    error: patientsError,
    totalCount,
    currentPage,
    totalPages,
    pageSize,
    addPatient,
    updatePatient,
    deletePatient,
    searchPatients,
    goToPage,
    nextPage,
    prevPage
  } = usePatients(10);

  const [searchTerm, setSearchTerm] = useState('');
  const [bloodFilter, setBloodFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  
  // Search results state
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Modals
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [qrPatient, setQrPatient] = useState(null);
  const [detailPatient, setDetailPatient] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { id, name }
  
  // Local loading states for operations
  const [operationLoading, setOperationLoading] = useState(false);
  
  // Privacy protection state
  const [unmaskedPatientIds, setUnmaskedPatientIds] = useState(new Set());
  
  // Helper functions for data masking
  const maskName = (name) => {
    const parts = name.split(' ');
    if (parts.length === 1) return name.charAt(0) + '***';
    return parts[0] + ' ' + parts.slice(1).map(p => p.charAt(0) + '*').join(' ');
  };
  
  const maskPhone = (phone) => {
    if (!phone) return '';
    return phone.slice(0, 3) + '****' + phone.slice(-2);
  };
  
  const toggleUnmask = (patientId) => {
    setUnmaskedPatientIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(patientId)) {
        newSet.delete(patientId);
      } else {
        newSet.add(patientId);
      }
      return newSet;
    });
  };

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm.trim()) {
        setIsSearching(true);
        const result = await searchPatients(searchTerm);
        if (result.success) {
          setSearchResults(result.results);
        }
        setIsSearching(false);
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 500); // Debounce 500ms

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchPatients]);

  // Filter logic - now using search results or current page
  const filteredPatients = useMemo(() => {
    const dataSource = searchTerm.trim() ? searchResults : patients;
    
    return dataSource.filter((p) => {
      const matchBlood = bloodFilter === 'ALL' || p.bloodType === bloodFilter;
      const matchStatus = statusFilter === 'ALL' || p.braceletStatus === statusFilter;
      return matchBlood && matchStatus;
    });
  }, [patients, searchResults, searchTerm, bloodFilter, statusFilter]);

  // Stats - use all patients or search results
  const stats = useMemo(() => {
    const dataSource = searchTerm.trim() ? searchResults : patients;
    const total = searchTerm.trim() ? searchResults.length : totalCount;
    const active = dataSource.filter(p => p.braceletStatus === 'active').length;
    const locked = dataSource.filter(p => p.braceletStatus === 'locked').length;
    const withAllergies = dataSource.filter(p => p.allergies && p.allergies.length > 0).length;
    return { total, active, locked, withAllergies };
  }, [patients, searchResults, searchTerm, totalCount]);

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
        toast.success(`Cập nhật thông tin bệnh nhân "${patientData.name}" thành công!`);
      } else {
        toast.error(`Lỗi cập nhật: ${result.error}`);
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
        toast.success(`Thêm bệnh nhân "${patientData.name}" thành công!`);
        // Tự động hiển thị modal QR sau khi thêm bệnh nhân mới
        // Note: need to find the newly added patient from the list
        setTimeout(() => {
          const newPatient = patients.find(p => p.id === result.id);
          if (newPatient) {
            setQrPatient(newPatient);
          }
        }, 500);
      } else {
        toast.error(`Lỗi thêm bệnh nhân: ${result.error}`);
      }
    }
    
    setOperationLoading(false);
  };

  const handleToggleLock = async (id) => {
    const patient = patients.find(p => p.id === id);
    if (!patient) return;
    
    const nextStatus = patient.braceletStatus === 'active' ? 'locked' : 'active';
    const result = await updatePatient(id, { braceletStatus: nextStatus });
    
    if (result.success) {
      const action = nextStatus === 'locked' ? 'khóa' : 'mở khóa';
      toast.success(`Đã ${action} vòng tay của "${patient.name}" thành công!`);
    } else {
      toast.error(`Lỗi cập nhật trạng thái: ${result.error}`);
    }
  };

  const handleDelete = (id) => {
    const patient = patients.find(p => p.id === id);
    if (!patient) return;
    
    setDeleteConfirm({ id, name: patient.name });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    
    setOperationLoading(true);
    const result = await deletePatient(deleteConfirm.id);
    
    if (result.success) {
      toast.success(`Đã xóa bệnh nhân "${deleteConfirm.name}" thành công!`);
    } else {
      toast.error(`Lỗi xóa bệnh nhân: ${result.error}`);
    }
    
    setDeleteConfirm(null);
    setOperationLoading(false);
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
    
    toast.success(`Đã xuất file CSV với ${patients.length} bệnh nhân!`);
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
      {(patientsLoading || isSearching) && (
        <div className="card p-4 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <p className="mt-3 text-muted">
            {isSearching ? 'Đang tìm kiếm...' : 'Đang tải dữ liệu từ Firestore...'}
          </p>
        </div>
      )}

      {patientsError && (
        <div className="alert alert-danger">
          <FiAlertTriangle /> Lỗi tải dữ liệu: {patientsError}
        </div>
      )}

      {/* Data Table Card */}
      {!patientsLoading && !isSearching && !patientsError && (
        <div className="admin-table-card card">
          {searchTerm.trim() && (
            <div className="search-info-bar">
              <span>
                🔍 Tìm thấy <strong>{filteredPatients.length}</strong> kết quả cho "<strong>{searchTerm}</strong>"
              </span>
              <button 
                className="btn-clear-search"
                onClick={() => setSearchTerm('')}
              >
                ✕ Xóa tìm kiếm
              </button>
            </div>
          )}
          
          {/* Desktop Table View */}
          <div className="admin-table-responsive">
            <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '220px' }}>Họ và tên</th>
                <th style={{ width: '95px' }}>Năm sinh</th>
                <th style={{ width: '90px' }}>Nhóm máu</th>
                <th style={{ width: '180px' }}>Bệnh nền & Dị ứng</th>
                <th style={{ width: '160px' }}>SĐT Khẩn cấp</th>
                <th style={{ width: '115px' }}>Trạng thái</th>
                <th style={{ width: '200px', textAlign: 'center' }}>Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((p) => {
                  const isUnmasked = unmaskedPatientIds.has(p.id);
                  
                  return (
                    <tr key={p.id}>
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
                          {(() => {
                            const allergies = p.allergies || [];
                            const conditions = p.conditions || [];
                            const totalItems = allergies.length + conditions.length;
                            const maxDisplay = 2;
                            
                            if (totalItems === 0) {
                              return <span className="text-muted font-sm">Bình thường</span>;
                            }
                            
                            const allergyBadges = allergies.slice(0, Math.min(allergies.length, maxDisplay)).map((alg, i) => (
                              <span key={`a-${i}`} className="badge badge-danger badge-compact" title={alg}>⚠️ {alg}</span>
                            ));
                            
                            const remainingSlots = maxDisplay - allergyBadges.length;
                            const conditionBadges = conditions.slice(0, Math.max(0, remainingSlots)).map((cond, i) => (
                              <span key={`c-${i}`} className="badge badge-warning badge-compact" title={cond}>{cond}</span>
                            ));
                            
                            const displayedCount = allergyBadges.length + conditionBadges.length;
                            const remainingCount = totalItems - displayedCount;
                            
                            return (
                              <>
                                {allergyBadges}
                                {conditionBadges}
                                {remainingCount > 0 && (
                                  <span 
                                    className="badge badge-secondary badge-compact" 
                                    title={`${allergies.slice(allergyBadges.length).concat(conditions.slice(conditionBadges.length)).join(', ')}`}
                                  >
                                    +{remainingCount}
                                  </span>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      </td>
                      <td>
                        {p.emergencyContacts && p.emergencyContacts.length > 0 ? (
                          <div className="contact-mini">
                            <span className="contact-name">
                              {p.emergencyContacts[0].name}
                            </span>
                            <span className="contact-phone">
                              <FiPhone /> {isUnmasked ? p.emergencyContacts[0].phone : maskPhone(p.emergencyContacts[0].phone)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                      <td>
                        {p.braceletStatus === 'active' ? (
                          <span className="badge badge-success">
                            🟢 Hoạt động
                          </span>
                        ) : (
                          <span className="badge badge-danger">
                            🔴 Đã khóa
                          </span>
                        )}
                      </td>
                      <td className="actions-cell">
                        <div className="actions-flex">
                          <button
                            onClick={() => toggleUnmask(p.id)}
                            className={`btn-action ${isUnmasked ? 'unmask' : 'mask'}`}
                            title={isUnmasked ? 'Ẩn số điện thoại' : 'Hiện số điện thoại'}
                          >
                            {isUnmasked ? <FiEye /> : <FiShield />}
                          </button>
                          <button
                            onClick={() => window.open(`/emergency/${p.id}`, '_blank')}
                            className="btn-action view"
                            title="Xem trang thông tin cấp cứu công khai"
                          >
                            <FiEye />
                          </button>
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
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    {searchTerm.trim() 
                      ? `Không tìm thấy bệnh nhân nào phù hợp với từ khóa "${searchTerm}"`
                      : 'Không tìm thấy bệnh nhân nào phù hợp với bộ lọc.'
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Card View */}
        <div className="mobile-patient-cards">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((p) => {
              const isUnmasked = unmaskedPatientIds.has(p.id);
              
              return (
                <div key={p.id} className="mobile-patient-card">
                  <div className="mobile-card-header">
                    <div className="mobile-card-name">
                      <h4>{p.name}</h4>
                      <span className="subtitle">{p.gender} • {p.birthYear} ({calculateAge(p.birthYear)}t)</span>
                    </div>
                    <div className="mobile-card-status">
                      {p.braceletStatus === 'active' ? (
                        <span className="badge badge-success">🟢 Hoạt động</span>
                      ) : (
                        <span className="badge badge-danger">🔴 Đã khóa</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mobile-card-body">
                    <div className="mobile-card-field">
                      <div className="mobile-card-label">Nhóm máu</div>
                      <div className="mobile-card-value">
                        <span className="badge badge-primary">{p.bloodType}</span>
                      </div>
                    </div>
                    
                    <div className="mobile-card-field">
                      <div className="mobile-card-label">Liên hệ</div>
                      <div className="mobile-card-value">
                        {p.emergencyContacts && p.emergencyContacts.length > 0 ? (
                          <div className="contact-mini">
                            <span className="contact-name">{p.emergencyContacts[0].name}</span>
                            <span className="contact-phone">
                              <FiPhone /> {isUnmasked ? p.emergencyContacts[0].phone : maskPhone(p.emergencyContacts[0].phone)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </div>
                    </div>
                    
                    {((p.allergies && p.allergies.length > 0) || (p.conditions && p.conditions.length > 0)) && (
                      <div className="mobile-card-field full-width">
                        <div className="mobile-card-label">Bệnh nền & Dị ứng</div>
                        <div className="mobile-card-value">
                          <div className="tags-cell">
                            {(() => {
                              const allergies = p.allergies || [];
                              const conditions = p.conditions || [];
                              const totalItems = allergies.length + conditions.length;
                              const maxDisplay = 3;
                              
                              const allergyBadges = allergies.slice(0, Math.min(allergies.length, maxDisplay)).map((alg, i) => (
                                <span key={`a-${i}`} className="badge badge-danger badge-compact" title={alg}>⚠️ {alg}</span>
                              ));
                              
                              const remainingSlots = maxDisplay - allergyBadges.length;
                              const conditionBadges = conditions.slice(0, Math.max(0, remainingSlots)).map((cond, i) => (
                                <span key={`c-${i}`} className="badge badge-warning badge-compact" title={cond}>{cond}</span>
                              ));
                              
                              const displayedCount = allergyBadges.length + conditionBadges.length;
                              const remainingCount = totalItems - displayedCount;
                              
                              return (
                                <>
                                  {allergyBadges}
                                  {conditionBadges}
                                  {remainingCount > 0 && (
                                    <span 
                                      className="badge badge-secondary badge-compact" 
                                      title={`${allergies.slice(allergyBadges.length).concat(conditions.slice(conditionBadges.length)).join(', ')}`}
                                    >
                                      +{remainingCount}
                                    </span>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mobile-card-actions">
                    <button
                      onClick={() => toggleUnmask(p.id)}
                      className={`btn-action ${isUnmasked ? 'unmask' : 'mask'}`}
                      title={isUnmasked ? 'Ẩn số điện thoại' : 'Hiện số điện thoại'}
                    >
                      {isUnmasked ? <FiEye /> : <FiShield />}
                    </button>
                    <button
                      onClick={() => window.open(`/emergency/${p.id}`, '_blank')}
                      className="btn-action view"
                      title="Xem trang cấp cứu"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => setQrPatient(p)}
                      className="btn-action qr"
                      title="Tạo mã QR"
                    >
                      <FiMaximize />
                    </button>
                    <button
                      onClick={() => handleEdit(p)}
                      className="btn-action edit"
                      title="Chỉnh sửa"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleToggleLock(p.id)}
                      className={`btn-action ${p.braceletStatus === 'active' ? 'lock' : 'unlock'}`}
                      title={p.braceletStatus === 'active' ? 'Khóa' : 'Mở khóa'}
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
                </div>
              );
            })
          ) : (
            <div className="text-center py-4 text-muted">
              {searchTerm.trim() 
                ? `Không tìm thấy bệnh nhân nào phù hợp với từ khóa "${searchTerm}"`
                : 'Không tìm thấy bệnh nhân nào phù hợp với bộ lọc.'
              }
            </div>
          )}
        </div>
        
        {/* Pagination - hide when searching */}
        {!patientsLoading && !isSearching && !patientsError && !searchTerm.trim() && totalPages > 1 && (
          <div className="pagination-container">
            <div className="pagination-info">
              Hiển thị <strong>{((currentPage - 1) * pageSize) + 1}</strong> - <strong>{Math.min(currentPage * pageSize, totalCount)}</strong> trong tổng số <strong>{totalCount}</strong> bệnh nhân
            </div>
            
            <div className="pagination-controls">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className="pagination-btn"
                title="Trang trước"
              >
                <FiChevronLeft />
              </button>
              
              {/* Page numbers */}
              <div className="pagination-numbers">
                {/* First page */}
                {currentPage > 3 && (
                  <>
                    <button onClick={() => goToPage(1)} className="pagination-number">1</button>
                    {currentPage > 4 && <span className="pagination-dots">...</span>}
                  </>
                )}
                
                {/* Pages around current */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    return page === currentPage || 
                           page === currentPage - 1 || 
                           page === currentPage + 1 ||
                           (page === currentPage - 2 && currentPage > 2) ||
                           (page === currentPage + 2 && currentPage < totalPages - 1);
                  })
                  .map(page => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`pagination-number ${page === currentPage ? 'active' : ''}`}
                    >
                      {page}
                    </button>
                  ))
                }
                
                {/* Last page */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && <span className="pagination-dots">...</span>}
                    <button onClick={() => goToPage(totalPages)} className="pagination-number">{totalPages}</button>
                  </>
                )}
              </div>
              
              <button 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className="pagination-btn"
                title="Trang sau"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
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

      {/* Confirm Delete Dialog */}
      {deleteConfirm && (
        <ConfirmDialog
          title="Xác nhận xóa bệnh nhân"
          message={`Bạn có chắc chắn muốn xóa bệnh nhân "${deleteConfirm.name}" khỏi hệ thống? Hành động này không thể hoàn tác.`}
          confirmText="Xóa bệnh nhân"
          cancelText="Hủy bỏ"
          type="danger"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </AdminLayout>
  );
}
