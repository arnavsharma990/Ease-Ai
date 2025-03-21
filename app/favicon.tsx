import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 32,
  height: 32
}

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* @ts-ignore */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sukoonAI%20logo-HcziUhbd1eIKlUo474fj9tI9blzLeT.png"
          alt="Sukoon Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </div>
    ),
    {
      ...size
    }
  )
} 