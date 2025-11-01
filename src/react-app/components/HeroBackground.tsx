import { useMemo } from 'react'
import { motion } from 'framer-motion'

type Dot = { cx: number; cy: number; r: number; duration: number; delay: number }

export default function HeroBackground() {
  const dots = useMemo<Dot[]>(() => {
    const cols = 12, rows = 6, arr: Dot[] = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x
        const fx = (x + 0.5) / cols
        const fy = (y + 0.5) / rows
        const r = 3 + ((i * 31) % 3) // 3..5
        const duration = 3 + ((i * 17) % 30) / 10 // 3..6
        const delay = ((i * 13) % 20) / 10 // 0..2
        arr.push({ cx: fx * 1200, cy: fy * 600, r, duration, delay })
      }
    }
    return arr
  }, [])

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none text-[var(--fg)]"
      // feather the top/bottom edges so it blends into page background
      style={{
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
      }}
    >
      {/* soft moving glow */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(1000px 400px at 20% 30%, color-mix(in oklab, var(--fg) 12%, transparent), transparent),' +
            'radial-gradient(900px 500px at 80% 70%, color-mix(in oklab, var(--fg) 14%, transparent), transparent)'
        }}
      />

      {/* ultra-subtle grid + floating dots */}
      <motion.svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeOpacity="0.09" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1200" height="600" fill="url(#grid)" style={{ color: 'currentColor' }} />
        {dots.map((d, i) => (
          <motion.circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            fill="currentColor"
            style={{ color: 'color-mix(in oklab, var(--fg), transparent 25%)' }}
            initial={{ opacity: 0.55, y: 0 }}
            animate={{ opacity: [0.55, 1, 0.55], y: [0, -8, 0] }}
            transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.svg>

      {/* subtle vignette center focus */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1200px 600px at 50% 40%, transparent 45%, color-mix(in oklab, var(--bg), black 12%))'
        }}
      />
    </div>
  )
}
