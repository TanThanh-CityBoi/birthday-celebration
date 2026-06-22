import { useState } from 'react';
import ParticleSystem from './components/ParticleSystem';
import Fireworks from './components/Fireworks';
import BirthdayCard from './components/BirthdayCard';
import EditPanel from './components/EditPanel';

const DEFAULT_MESSAGE =
  `Chúc em một ngày sinh nhật thật vui vẻ và hạnh phúc! 🌸\nMong em luôn rạng rỡ như những bông hoa mùa xuân,\ntràn đầy sức sống và niềm vui trong từng khoảnh khắc.\n\nEm xứng đáng nhận được tất cả những điều tuyệt vời\nmà cuộc sống có thể mang lại! 💖✨\n\nMãi yêu em nhé! 🎂🎉`;

export default function App() {
  const [name, setName] = useState('Người Yêu Thương');
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [sender, setSender] = useState('Người Yêu Bạn');
  const [editing, setEditing] = useState(false);


  return (
    <>
      {/* Layer 1: falling particles (hearts, flowers, petals) */}
      <ParticleSystem />

      {/* Layer 2: fireworks */}
      <Fireworks />

      {/* Layer 3: main card */}
      <BirthdayCard name={name} message={message} sender={sender} />

      {/* Edit modal */}
      {editing && (
        <EditPanel
          name={name}
          message={message}
          sender={sender}
          onSave={(n, m, s) => { setName(n); setMessage(m); setSender(s); }}
          onClose={() => setEditing(false)}
        />
      )}

      {/* Floating edit button */}
      <button
        className="edit-fab"
        onClick={() => setEditing(true)}
        title="Chỉnh sửa nội dung"
        aria-label="Chỉnh sửa nội dung"
      >
        ✏️
      </button>
    </>
  );
}
