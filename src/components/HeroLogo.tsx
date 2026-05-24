import Link from 'next/link'

interface Props {
  className?: string
}

export default function HeroLogo({ className }: Props) {
  return (
    <Link href="/" className={className} aria-label="mientrasloscreditospasan — inicio">
      <svg
        viewBox="0 277 1366 214"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        <rect
          x="20.5" y="287.25" width="1325" height="193.5"
          style={{ fill: 'var(--logo-bg, var(--hero-logo-bg, #F8F4F0))' }}
        />
        <text
          fontSize={95.8}
          fontFamily="var(--font-crimson), 'Crimson Text', Georgia, serif"
          transform="translate(200.75 409.4)"
          style={{ fill: 'var(--logo-text, var(--hero-logo-color, #1A1B20))' }}
        >
          <tspan x="0" y="0">mientras</tspan>
          <tspan fontWeight="600" x="330.36" y="0">loscreditos</tspan>
          <tspan x="753.15" y="0">pasan</tspan>
        </text>
      </svg>
    </Link>
  )
}
