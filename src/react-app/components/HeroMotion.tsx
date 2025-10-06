import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

type Dot = { cx: number; cy: number; r: number; duration: number; delay: number }

export default function HeroMotion() {
  // Deterministic dot grid (no random on each render)
  const dots = useMemo<Dot[]>(() => {
    const cols = 12
    const rows = 6
    const arr: Dot[] = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x
        const fx = (x + 1) / (cols + 1)
        const fy = (y + 1) / (rows + 1)
        const r = 4 + ((i * 31) % 3) // 4..6
        const duration = 3 + ((i * 17) % 30) / 10 // 3..6
        const delay = ((i * 13) % 20) / 10 // 0..2
        arr.push({ cx: fx * 1200, cy: fy * 675, r, duration, delay })
      }
    }
    return arr
  }, [])

  return (
    <div className="mx-auto mt-10 max-w-5xl">
      <div className="aspect-[16/9] rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] overflow-hidden shadow-lg relative">
        {/* Subtle gradient glow */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background:
              'radial-gradient(1200px 400px at 20% 20%, color-mix(in oklab, var(--fg) 10%, transparent), transparent), radial-gradient(1000px 500px at 80% 80%, color-mix(in oklab, var(--fg) 12%, transparent), transparent)'
          }}
        />
        {/* Animated dot grid */}
        <motion.svg
          viewBox="0 0 1200 675"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          {/* faint grid lines */}
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1200" height="675" fill="url(#grid)" />
          {dots.map((d, i) => (
            <motion.circle
              key={i}
              cx={d.cx}
              cy={d.cy}
              r={d.r}
              fill="currentColor"
              style={{ color: 'color-mix(in oklab, var(--fg), transparent 30%)' }}
              initial={{ opacity: 0.6, y: 0 }}
              animate={{ opacity: [0.6, 1, 0.6], y: [0, -6, 0] }}
              transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </motion.svg>
      </div>
    </div>
  )
}
