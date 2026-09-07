import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FiX, FiDownload, FiCopy, FiCheck, FiShield, FiExternalLink } from 'react-icons/fi';
import './QRCodeCard.css';

export default function QRCodeCard({ patient, onClose }) {
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);

  const emergencyUrl = `${window.location.origin}/emergency/${patient.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(emergencyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width + 80;
      canvas.height = img.height + 140;

      // Draw background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Header Text
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 20px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(patient.name, canvas.width / 2, 36);

      ctx.fillStyle = '#64748b';
      ctx.font = '14px Inter, sans-serif';
      ctx.fillText(`Mã BN: ${patient.id} • Nhóm máu: ${patient.bloodType}`, canvas.width / 2, 58);

      // Draw QR Image
      ctx.drawImage(img, 40, 75);

      // Draw Footer
      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText('MEDLINK BAND - THÔNG TIN CẤP CỨU Y TẾ', canvas.width / 2, canvas.height - 20);

      // Download
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `QR_MedLink_${patient.name.replace(/\s+/g, '_')}_${patient.id}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog qr-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Mã QR Vòng Tay - {patient.name}</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body text-center py-4">
          <div className="qr-box-wrapper mb-3" ref={qrRef}>
            <QRCodeSVG
              value={emergencyUrl}
              size={220}
              level="H"
              includeMargin={true}
              fgColor="#0f172a"
              bgColor="#ffffff"
            />
          </div>

          <div className="qr-patient-meta mb-3">
            <h4 className="qr-patient-name">{patient.name}</h4>
            <p className="qr-patient-sub">
              Mã ID: <strong>#{patient.id}</strong> • Nhóm máu: <span className="badge badge-primary">{patient.bloodType}</span>
            </p>
            <div className="qr-url-preview">
              <span>{emergencyUrl}</span>
            </div>
          </div>

          <div className="qr-modal-actions">
            <button onClick={handleDownloadQR} className="btn btn-primary btn-lg">
              <FiDownload /> Tải Mã QR (PNG)
            </button>
            <button onClick={handleCopyLink} className="btn btn-outline btn-lg">
              {copied ? <FiCheck className="text-success" /> : <FiCopy />}
              <span>{copied ? 'Đã sao chép link' : 'Sao chép Link'}</span>
            </button>
          </div>
        </div>

        <div className="modal-footer justify-content-between">
          <div className="qr-status-indicator">
            {patient.braceletStatus === 'active' ? (
              <span className="badge badge-success">🟢 Vòng tay đang hoạt động</span>
            ) : (
              <span className="badge badge-danger">🔴 Vòng tay đã bị khóa</span>
            )}
          </div>
          <a
            href={emergencyUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-sm"
          >
            <FiExternalLink /> Xem trang Cấp cứu
          </a>
        </div>
      </div>
    </div>
  );
}
