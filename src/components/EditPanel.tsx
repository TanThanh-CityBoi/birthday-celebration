import { useState } from 'react';
import type { CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  name: string;
  message: string;
  sender: string;
  onSave: (name: string, message: string, sender: string) => void;
  onClose: () => void;
}

const baseInput: CSSProperties = {
  width: '100%',
  padding: 'clamp(8px, 2vw, 14px) clamp(10px, 2vw, 16px)',
  borderRadius: '10px',
  border: '2px solid #f9a8d4',
  outline: 'none',
  fontSize: 'clamp(13px, 2vw, 16px)',
  fontFamily: "'Nunito', sans-serif",
  color: '#831843',
  background: 'rgba(255,255,255,0.85)',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
};

const labelStyle: CSSProperties = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: 700,
  color: '#be185d',
  fontSize: 'clamp(12px, 1.8vw, 14px)',
  fontFamily: "'Nunito', sans-serif",
};

function Field({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  const [focused, setFocused] = useState(false);
  const focusStyle: CSSProperties = focused
    ? { borderColor: '#ec4899', boxShadow: '0 0 0 3px rgba(236,72,153,0.15)' }
    : {};

  return (
    <div style={{ marginBottom: 'clamp(12px, 2.5vw, 20px)' }}>
      <label style={labelStyle}>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...baseInput, ...focusStyle, minHeight: 'clamp(90px, 15vw, 140px)', resize: 'vertical' }}
        />
      ) : (
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...baseInput, ...focusStyle }}
        />
      )}
    </div>
  );
}

export default function EditPanel({ name, message, sender, onSave, onClose }: Props) {
  const [n, setN] = useState(name);
  const [m, setM] = useState(message);
  const [s, setS] = useState(sender);

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 24 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          style={{
            borderRadius: 'clamp(16px, 3vw, 28px)',
            padding: 'clamp(20px, 4vw, 44px)',
            maxWidth: 'min(540px, 96vw)',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
          onClick={e => e.stopPropagation()}
        >
          <h2
            style={{
              textAlign: 'center',
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(22px, 4.5vw, 32px)',
              color: '#be185d',
              marginBottom: 'clamp(16px, 3vw, 28px)',
            }}
          >
            ✏️ Chỉnh sửa nội dung
          </h2>

          <Field label="🌸 Tên người được chúc mừng" value={n} onChange={setN} />
          <Field label="💌 Lời chúc sinh nhật" value={m} onChange={setM} multiline />
          <Field label="💕 Tên người gửi" value={s} onChange={setS} />

          <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 14px)', justifyContent: 'flex-end', marginTop: '4px' }}>
            <button
              onClick={onClose}
              style={{
                padding: 'clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 28px)',
                borderRadius: '10px',
                border: '2px solid #f9a8d4',
                background: 'white',
                color: '#be185d',
                cursor: 'pointer',
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(13px, 2vw, 15px)',
                transition: 'background 0.2s',
              }}
            >
              Hủy
            </button>
            <button
              onClick={() => { onSave(n, m, s); onClose(); }}
              style={{
                padding: 'clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 28px)',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #ec4899, #db2777)',
                color: 'white',
                cursor: 'pointer',
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(13px, 2vw, 15px)',
                boxShadow: '0 4px 14px rgba(219,39,119,0.4)',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)'; }}
              onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
            >
              💾 Lưu thay đổi
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
