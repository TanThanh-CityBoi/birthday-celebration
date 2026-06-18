import { motion, type Variants } from 'framer-motion';

interface Props {
  name: string;
  message: string;
  sender: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.4 } as never,
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.9 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring' as const, stiffness: 90, damping: 14 },
  },
};

const DECO_ITEMS = [
  { emoji: '🌸', top: '4%', left: '2%', delay: 0 },
  { emoji: '💖', top: '8%', right: '3%', delay: 0.3 },
  { emoji: '✨', top: '15%', left: '6%', delay: 0.6 },
  { emoji: '🌷', top: '20%', right: '7%', delay: 0.9 },
  { emoji: '💝', bottom: '18%', left: '3%', delay: 1.2 },
  { emoji: '⭐', bottom: '12%', right: '4%', delay: 1.5 },
  { emoji: '🌺', bottom: '25%', left: '8%', delay: 1.8 },
  { emoji: '💫', bottom: '8%', right: '9%', delay: 2.1 },
];

export default function BirthdayCard({ name, message, sender }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 48px)',
      }}
    >
      {/* Floating corner decorations */}
      {DECO_ITEMS.map((d, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: d.delay, type: 'spring' }}
          style={{
            position: 'fixed',
            top: d.top, left: d.left, right: d.right, bottom: d.bottom,
            fontSize: 'clamp(18px, 3vw, 28px)',
            animation: `float ${2.5 + i * 0.3}s ease-in-out ${d.delay}s infinite`,
            pointerEvents: 'none',
            zIndex: 5,
          }}
        >
          {d.emoji}
        </motion.span>
      ))}

      {/* Main card */}
      <motion.div
        className="glass-card pulse-glow"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          borderRadius: 'clamp(18px, 3vw, 36px)',
          padding: 'clamp(28px, 5vw, 60px) clamp(24px, 5vw, 56px)',
          maxWidth: 'min(680px, 94vw)',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top gradient ribbon */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '6px',
          background: 'linear-gradient(90deg, #f9a8d4, #ec4899, #db2777, #a855f7, #ec4899, #f9a8d4)',
          backgroundSize: '200% auto',
          animation: 'shimmer 3s linear infinite',
        }} />

        {/* Cake emoji */}
        <motion.div
          variants={itemVariants}
          style={{
            fontSize: 'clamp(52px, 11vw, 88px)',
            marginBottom: 'clamp(8px, 1.5vw, 16px)',
            display: 'inline-block',
            animation: 'float 3s ease-in-out infinite',
          }}
        >
          🎂
        </motion.div>

        {/* Main title */}
        <motion.h1
          variants={itemVariants}
          className="shimmer-text"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(30px, 6.5vw, 56px)',
            fontWeight: 700,
            marginBottom: 'clamp(4px, 1vw, 8px)',
            lineHeight: 1.2,
          }}
        >
          Chúc Mừng Sinh Nhật!
        </motion.h1>

        {/* Happy Birthday EN */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(14px, 2.5vw, 22px)',
            color: '#ec4899',
            marginBottom: 'clamp(8px, 1.5vw, 16px)',
            opacity: 0.85,
          }}
        >
          🎉 Happy Birthday 🎉
        </motion.p>

        {/* Name */}
        <motion.div
          variants={itemVariants}
          style={{
            fontSize: 'clamp(20px, 4.5vw, 36px)',
            color: '#be185d',
            fontFamily: "'Dancing Script', cursive",
            fontWeight: 700,
            marginBottom: 'clamp(16px, 3vw, 28px)',
            letterSpacing: '0.03em',
          }}
        >
          🌸 {name} 🌸
        </motion.div>

        {/* Message box */}
        <motion.div
          variants={itemVariants}
          style={{
            background: 'linear-gradient(135deg, rgba(249,168,212,0.28), rgba(236,72,153,0.1))',
            borderRadius: 'clamp(10px, 2vw, 18px)',
            padding: 'clamp(16px, 3vw, 28px)',
            marginBottom: 'clamp(16px, 3vw, 28px)',
            border: '1px solid rgba(249,168,212,0.45)',
          }}
        >
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: 'clamp(14px, 2.2vw, 18px)',
              lineHeight: 1.85,
              color: '#831843',
              whiteSpace: 'pre-wrap',
              textAlign: 'left',
            }}
          >
            {message}
          </p>
        </motion.div>

        {/* Sender */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 'clamp(4px, 1vw, 8px)',
          }}
        >
          <span style={{ fontSize: 'clamp(12px, 2vw, 15px)', color: '#9d174d', fontStyle: 'italic' }}>
            
          </span>
          <span
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(18px, 3.5vw, 28px)',
              fontWeight: 700,
              color: '#db2777',
            }}
          >
            💕 {sender} 💕
          </span>
        </motion.div>

        {/* Balloons row */}
        <motion.div
          variants={itemVariants}
          style={{ marginTop: 'clamp(12px, 2vw, 20px)', fontSize: 'clamp(20px, 4vw, 32px)', letterSpacing: '4px' }}
        >
          🎈🎀🎊🎁🎀🎈
        </motion.div>

        {/* Bottom gradient ribbon */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px',
          background: 'linear-gradient(90deg, #f9a8d4, #ec4899, #db2777, #a855f7, #ec4899, #f9a8d4)',
          backgroundSize: '200% auto',
          animation: 'shimmer 3s linear infinite',
        }} />
      </motion.div>
    </div>
  );
}
