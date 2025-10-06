import React from 'react'

export default function CardImage({
  src,
  alt,
  className = 'h-40',
  rounded = 'rounded-lg'
}: { src: string; alt: string; className?: string; rounded?: string }) {
  const [ok, setOk] = React.useState(true)
  return (
    <div className={`${className} w-full ${rounded} overflow-hidden bg-[var(--surface-2)]`}>
      {ok ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setOk(false)}
        />
      ) : (
        <div
          className="h-full w-full"
          style={{
            background:
              'repeating-linear-gradient(45deg, color-mix(in oklab, var(--fg), transparent 90%) 0 8px, transparent 8px 16px)'
          }}
          aria-hidden
        />
      )}
    </div>
  )
}
