import { useState } from 'react';
import ParticleSystem from './components/ParticleSystem';
import Fireworks from './components/Fireworks';
import BirthdayCard from './components/BirthdayCard';
import EditPanel from './components/EditPanel';

const DEFAULT_MESSAGE =
  `Happy Birthday muộn nè 🎂🎉 \n\nHơi trễ một chút nhưng lời chúc thì vẫn nguyên vẹn. Mong Trang luôn vui vẻ, xinh đẹp rạng rỡ, gặp nhiều may mắn và có thật nhiều điều khiến bạn mỉm cười mỗi ngày nha. Tuổi mới cứ hạnh phúc thật nhiều nhé ❤️`;

export default function App() {
  const [name, setName] = useState('Trang Trang');
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [sender, setSender] = useState('Người bạn mới quen nè hh');
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
