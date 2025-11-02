import { useMemo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Dot = { cx: number; cy: number; r: number; duration: number; delay: number }

export default function GlobalBackground() {
  const [pageHeight, setPageHeight] = useState(0)

  useEffect(() => {
    const updateHeight = () => {
      setPageHeight(document.documentElement.scrollHeight)
    }
    updateHeight()
    // Update when content changes (images load, etc.)
    const observer = new ResizeObserver(updateHeight)
    observer.observe(document.body)
    return () => observer.disconnect()
  }, [])

  const dots = useMemo<Dot[]>(() => {
    if (pageHeight === 0) return []
    
    const dotSpacing = 100 // One dot per 100px grid square
    const cols = Math.ceil(window.innerWidth / dotSpacing) + 2 // Extra for edges
    const rows = Math.ceil(pageHeight / dotSpacing) + 2 // Cover full page height
    const arr: Dot[] = []
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x
        const cx = x * dotSpacing + dotSpacing / 2 // Center of grid square
        const cy = y * dotSpacing + dotSpacing / 2 // Center of grid square
        const r = 2.5 + ((i * 31) % 3) // tiny dots for subtlety
        const duration = 3 + ((i * 17) % 30) / 10 // 3..6s
        const delay = ((i * 13) % 20) / 10 // 0..2s
        arr.push({ cx, cy, r, duration, delay })
      }
    }
    return arr
  }, [pageHeight])

  // Calculate mask fade points based on actual page height
  const fadeTopPx = pageHeight * 0.08 // 8% from top
  const fadeBottomPx = pageHeight * 0.92 // 92% from top

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none text-[var(--fg)]"
      style={{
        // feather edges so it blends with page bg as you scroll
        WebkitMaskImage:
          `linear-gradient(to bottom, transparent 0px, black ${fadeTopPx}px, black ${fadeBottomPx}px, transparent ${pageHeight}px)`,
        maskImage:
          `linear-gradient(to bottom, transparent 0px, black ${fadeTopPx}px, black ${fadeBottomPx}px, transparent ${pageHeight}px)`
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

      {/* subtle grid pattern - fixed size, no scaling */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in oklab, var(--fg), transparent 93%) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklab, var(--fg), transparent 93%) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          backgroundPosition: 'center center'
        }}
      />
      
      {/* floating dots - positioned at fixed pixels matching grid */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {dots.map((d, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${d.cx}px`,
              top: `${d.cy}px`,
              width: `${d.r * 2}px`,
              height: `${d.r * 2}px`,
              background: 'color-mix(in oklab, var(--fg), transparent 72%)',
              transform: 'translate(-50%, -50%)', // Center the dot on the position
            }}
            initial={{ opacity: 0.5, y: 0 }}
            animate={{ opacity: [0.5, 0.9, 0.5], y: [0, -6, 0] }}
            transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

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
