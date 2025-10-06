import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

type Dot = { cx: number; cy: number; r: number; duration: number; delay: number }

export default function GlobalBackground() {
  const dots = useMemo<Dot[]>(() => {
    const cols = 14, rows = 7, arr: Dot[] = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x
        const fx = (x + 0.5) / cols
        const fy = (y + 0.5) / rows
        const r = 2.5 + ((i * 31) % 3) // tiny dots for subtlety
        const duration = 3 + ((i * 17) % 30) / 10 // 3..6s
        const delay = ((i * 13) % 20) / 10 // 0..2s
        arr.push({ cx: fx * 1600, cy: fy * 900, r, duration, delay })
      }
    }
    return arr
  }, [])

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none text-[var(--fg)]"
      style={{
        // feather edges so it blends with page bg as you scroll
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)'
      }}
    >
      {/* gentle moving glow (on top of base bg) */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.45 }}
        animate={{ opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(1200px 500px at 15% 25%, color-mix(in oklab, var(--fg) 10%, transparent), transparent),' +
            'radial-gradient(1000px 600px at 85% 75%, color-mix(in oklab, var(--fg) 12%, transparent), transparent)'
        }}
      />

      {/* subtle grid + floating dots */}
      <motion.svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="bggrid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1600" height="900" fill="url(#bggrid)" style={{ color: 'currentColor' }} />
        {dots.map((d, i) => (
          <motion.circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            fill="currentColor"
            style={{ color: 'color-mix(in oklab, var(--fg), transparent 28%)' }}
            initial={{ opacity: 0.5, y: 0 }}
            animate={{ opacity: [0.5, 0.9, 0.5], y: [0, -6, 0] }}
            transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.svg>

      {/* soft vignette for center focus */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1400px 700px at 50% 40%, transparent 50%, color-mix(in oklab, var(--bg), black 10%))'
        }}
      />
    </div>
  )
}
