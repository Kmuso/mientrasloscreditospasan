'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useProjectionStore } from '@/store/projectionStore'
import type { NewsItem } from '@/types'

gsap.registerPlugin(ScrollTrigger)

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase()
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

export default function NewsCompactGrid({ items }: { items: NewsItem[] }) {
  const gridRef = useRef<HTMLDivElement>(null)
  const staticMode = useProjectionStore((s) => s.staticMode)

  useGSAP(() => {
    if (staticMode || !gridRef.current) return
    gsap.from(gridRef.current.querySelectorAll('.news-compact-card'), {
      opacity: 0,
      y: 24,
      duration: 0.5,
      stagger: { amount: 0.6, from: 'start' },
      ease: 'power2.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 82%',
        once: true,
      },
    })
  }, { scope: gridRef, dependencies: [staticMode] })

  if (!items.length) return null

  const [first, ...rest] = items

  return (
    <div className="news-compact-grid" ref={gridRef}>
      <Link
        href={`/noticias/${first.slug}`}
        className="news-compact-card horizontal"
      >
        <div className="news-compact-image">
          <Image
            src={first.coverImage}
            alt={first.title}
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover"
            priority
          />
          <div className="news-compact-date">{formatDate(first.publishedAt)}</div>
        </div>
        <div className="news-compact-content">
          {first.category && (
            <p className="news-compact-category">{first.category}</p>
          )}
          <h3 className="news-compact-title">{first.title}</h3>
          <p className="news-compact-hook">{first.excerpt}</p>
        </div>
      </Link>

      {rest.map((item, index) => (
        <Link
          key={item._id}
          href={`/noticias/${item.slug}`}
          className="news-compact-card"
        >
          <div className="news-compact-image">
            <Image
              src={item.coverImage}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover"
              loading={index < 3 ? 'eager' : 'lazy'}
            />
            <div className="news-compact-date">{formatDate(item.publishedAt)}</div>
          </div>
          <div className="news-compact-content">
            {item.category && (
              <p className="news-compact-category">{item.category}</p>
            )}
            <h3 className="news-compact-title">{item.title}</h3>
            <p className="news-compact-hook">{item.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
