import { useState, useEffect, useRef } from 'react';
import { FiX, FiCamera, FiUpload, FiUser, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function PatientForm({ patient, onSave, onClose }) {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);

  const [form, setForm] = useState({
    name: '',
    birthYear: '',
    gender: 'Nam',
    bloodType: 'O+',
    allergies: [],
    conditions: [],
    avatar: null,
    emergencyContacts: [{ name: '', phone: '', relationship: '' }],
    doctorContact: { name: '', phone: '', hospital: '' },
    specialInstructions: '',
    medications: '',
  });

  const [allergyInput, setAllergyInput] = useState('');
  const [conditionInput, setConditionInput] = useState('');

  useEffect(() => {
    if (patient) {
      setForm({
        name: patient.name || '',
        birthYear: patient.birthYear || '',
        gender: patient.gender || 'Nam',
        bloodType: patient.bloodType || 'O+',
        allergies: patient.allergies || [],
        conditions: patient.conditions || [],
        avatar: patient.avatar || null,
        emergencyContacts: patient.emergencyContacts?.length > 0
          ? patient.emergencyContacts
          : [{ name: '', phone: '', relationship: '' }],
        doctorContact: patient.doctorContact || { name: '', phone: '', hospital: '' },
        specialInstructions: patient.medicalRecord?.specialInstructions || '',
        medications: patient.medicalRecord?.medications?.map(m => `${m.name} - ${m.dosage}`).join('\n') || '',
      });
    }
  }, [patient]);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // Photo handling
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateForm('avatar', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 }
      });
      setStream(mediaStream);
      setShowCamera(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch (err) {
      alert('Không thể truy cập camera. Vui lòng cho phép quyền camera.');
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    updateForm('avatar', dataUrl);
    closeCamera();
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  // Tags (allergies, conditions)
  const addTag = (field, input, setInput) => {
    const trimmed = input.trim();
    if (trimmed && !form[field].includes(trimmed)) {
      updateForm(field, [...form[field], trimmed]);
      setInput('');
    }
  };

  const removeTag = (field, index) => {
    updateForm(field, form[field].filter((_, i) => i !== index));
  };

  // Emergency contacts
  const addContact = () => {
    updateForm('emergencyContacts', [...form.emergencyContacts, { name: '', phone: '', relationship: '' }]);
  };

  const updateContact = (index, field, value) => {
    const contacts = [...form.emergencyContacts];
    contacts[index] = { ...contacts[index], [field]: value };
    updateForm('emergencyContacts', contacts);
  };

  const removeContact = (index) => {
    if (form.emergencyContacts.length > 1) {
      updateForm('emergencyContacts', form.emergencyContacts.filter((_, i) => i !== index));
    }
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.birthYear || !form.bloodType) {
      alert('Vui lòng nhập đầy đủ: Họ tên, Năm sinh, Nhóm máu');
      return;
    }
    if (!form.emergencyContacts[0]?.name || !form.emergencyContacts[0]?.phone) {
      alert('Vui lòng nhập ít nhất 1 người liên hệ khẩn cấp');
      return;
    }
    onSave(form);
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-dialog patient-form-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">
              {patient ? `Sửa: ${patient.name}` : 'Thêm Bệnh Nhân Mới'}
            </h3>
            <button className="modal-close-btn" onClick={onClose}>
              <FiX />
            </button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit} className="patient-form" id="patient-form">
          {/* Avatar */}
          <div className="form-section">
            <div className="form-avatar-section">
              <div className="form-avatar-preview">
                {form.avatar ? (
                  <img src={form.avatar} alt="Ảnh" />
                ) : (
                  <div className="form-avatar-empty">
                    <FiUser />
                  </div>
                )}
              </div>
              <div className="form-avatar-actions">
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => fileInputRef.current?.click()}>
                  <FiUpload /> Tải ảnh
                </button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={openCamera}>
                  <FiCamera /> Chụp ảnh
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            {/* Camera Preview */}
            {showCamera && (
              <div className="form-camera-preview">
                <video ref={videoRef} autoPlay playsInline muted />
                <div className="form-camera-actions">
                  <button type="button" className="btn btn-primary" onClick={capturePhoto}>
                    <FiCamera /> Chụp
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={closeCamera}>
                    Hủy
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="form-section">
            <h4 className="form-section-title">Thông tin cơ bản</h4>
            <div className="form-row">
              <div className="form-group form-group-flex">
                <label className="form-label">Họ tên *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nguyễn Văn A"
                  value={form.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-row form-row-2">
              <div className="form-group">
                <label className="form-label">Năm sinh *</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="1955"
                  value={form.birthYear}
                  onChange={(e) => updateForm('birthYear', parseInt(e.target.value) || '')}
                  min="1900"
                  max={new Date().getFullYear()}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Giới tính *</label>
                <select className="form-select" value={form.gender} onChange={(e) => updateForm('gender', e.target.value)}>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Nhóm máu *</label>
              <div className="blood-type-grid">
                {bloodTypes.map(bt => (
                  <button
                    key={bt}
                    type="button"
                    className={`blood-type-btn ${form.bloodType === bt ? 'active' : ''}`}
                    onClick={() => updateForm('bloodType', bt)}
                  >
                    {bt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Medical Info */}
          <div className="form-section">
            <h4 className="form-section-title">Thông tin y tế</h4>

            {/* Allergies */}
            <div className="form-group">
              <label className="form-label">Dị ứng</label>
              <div className="tag-input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nhập tên dị ứng, nhấn Enter..."
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag('allergies', allergyInput, setAllergyInput);
                    }
                  }}
                />
                {form.allergies.length > 0 && (
                  <div className="tag-list">
                    {form.allergies.map((a, i) => (
                      <span key={i} className="badge badge-danger tag-item">
                        {a}
                        <button type="button" onClick={() => removeTag('allergies', i)} className="tag-remove">
                          <FiX />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Conditions */}
            <div className="form-group">
              <label className="form-label">Bệnh nền</label>
              <div className="tag-input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nhập bệnh nền, nhấn Enter..."
                  value={conditionInput}
                  onChange={(e) => setConditionInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag('conditions', conditionInput, setConditionInput);
                    }
                  }}
                />
                {form.conditions.length > 0 && (
                  <div className="tag-list">
                    {form.conditions.map((c, i) => (
                      <span key={i} className="badge badge-warning tag-item">
                        {c}
                        <button type="button" onClick={() => removeTag('conditions', i)} className="tag-remove">
                          <FiX />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Special Instructions */}
            <div className="form-group">
              <label className="form-label">Chỉ định đặc biệt</label>
              <textarea
                className="form-textarea"
                placeholder="VD: Không dùng NSAID, cần thông báo BS tim mạch trước phẫu thuật..."
                value={form.specialInstructions}
                onChange={(e) => updateForm('specialInstructions', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="form-section">
            <h4 className="form-section-title">Liên hệ khẩn cấp</h4>

            {form.emergencyContacts.map((contact, i) => (
              <div key={i} className="contact-card">
                <div className="contact-card-header">
                  <span className="contact-card-number">Người liên hệ {i + 1} {i === 0 ? '*' : ''}</span>
                  {i > 0 && (
                    <button type="button" className="btn btn-ghost btn-sm btn-delete" onClick={() => removeContact(i)}>
                      <FiTrash2 />
                    </button>
                  )}
                </div>
                <div className="form-row form-row-2">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Họ tên"
                      value={contact.name}
                      onChange={(e) => updateContact(i, 'name', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="SĐT"
                      value={contact.phone}
                      onChange={(e) => updateContact(i, 'phone', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Mối quan hệ (VD: Con gái, Con trai...)"
                    value={contact.relationship}
                    onChange={(e) => updateContact(i, 'relationship', e.target.value)}
                  />
                </div>
              </div>
            ))}

            <button type="button" className="btn btn-ghost btn-sm" onClick={addContact}>
              <FiPlus /> Thêm người liên hệ
            </button>
          </div>

          {/* Doctor Contact */}
          <div className="form-section">
            <h4 className="form-section-title">Bác sĩ điều trị</h4>
            <div className="form-row form-row-2">
              <div className="form-group">
                <label className="form-label">Tên bác sĩ</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="BS. Nguyễn Văn B"
                  value={form.doctorContact.name}
                  onChange={(e) => updateForm('doctorContact', { ...form.doctorContact, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">SĐT bác sĩ</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="0901234567"
                  value={form.doctorContact.phone}
                  onChange={(e) => updateForm('doctorContact', { ...form.doctorContact, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Bệnh viện</label>
              <input
                type="text"
                className="form-input"
                placeholder="BV Chợ Rẫy"
                value={form.doctorContact.hospital}
                onChange={(e) => updateForm('doctorContact', { ...form.doctorContact, hospital: e.target.value })}
              />
            </div>
          </div>

            </form>
          </div>

          {/* Submit */}
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" form="patient-form" className="btn btn-primary" id="save-patient-btn">
              {patient ? 'Cập Nhật' : 'Thêm Bệnh Nhân'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
