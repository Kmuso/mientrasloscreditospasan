import Link from 'next/link'

export default function NotFound() {
  return (
    <>
    <style>{`
      @media (hover: hover) and (pointer: fine) {
        .nf-link:hover { color: var(--text) !important; border-color: var(--text) !important; }
      }
      .nf-link {
        transition: color 180ms cubic-bezier(0.23,1,0.32,1),
                    border-color 180ms cubic-bezier(0.23,1,0.32,1);
      }
      .nf-link:active { opacity: 0.6; transition-duration: 80ms; }
    `}</style>
    <main style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 48px',
      gap: 32,
    }}>
      <p style={{
        fontFamily: 'Courier New, monospace',
        fontSize: '9px',
        letterSpacing: '0.22em',
        color: 'var(--text-muted)',
      }}>
        FOTOGRAMA · 000
      </p>

      <h1 style={{
        fontFamily: "var(--font-crimson), Georgia, serif",
        fontSize: 'clamp(5rem, 18vw, 14rem)',
        fontWeight: 200,
        lineHeight: 1,
        letterSpacing: '-0.04em',
        color: 'var(--text-heading)',
        opacity: 0.15,
      }}>
        404
      </h1>

      <p style={{
        fontFamily: "var(--font-crimson), Georgia, serif",
        fontSize: '1.4rem',
        fontStyle: 'italic',
        color: 'var(--text-muted)',
        textAlign: 'center',
        maxWidth: '34ch',
        lineHeight: 1.5,
      }}>
        Esta reseña no existe, o existió y ya no está.
      </p>

      <Link
        href="/"
        className="nf-link"
        style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '9px',
          letterSpacing: '0.18em',
          color: 'var(--text-muted)',
          textDecoration: 'none',
          border: '0.5px solid var(--border)',
          padding: '10px 20px',
          marginTop: 8,
        }}
      >
        ← VOLVER AL ARCHIVO
      </Link>
    </main>
    </>
  )
}
