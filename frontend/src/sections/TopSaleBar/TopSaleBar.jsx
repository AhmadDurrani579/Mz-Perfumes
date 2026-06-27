import { useEffect, useState } from 'react'
import { getBanners } from '../../services/api.js'

const fallbackBanner = {
  title: 'SUMMER SALE!',
  subtitle: 'Up to 50% OFF on Selected Perfumes',
  end_date: null,
  redirect_url: '#collection',
}

const fallbackCountdown = [
  { value: '02', label: 'DAYS' },
  { value: '14', label: 'HRS' },
  { value: '35', label: 'MINS' },
  { value: '20', label: 'SECS' },
]

function getActiveBanner(banners) {
  return banners.find((banner) => banner.is_active !== false)
}

function getCountdownItems(endDate, currentTime) {
  if (!endDate) return fallbackCountdown
  if (!currentTime) return fallbackCountdown

  const difference = new Date(endDate).getTime() - currentTime
  const remainingSeconds = Math.max(0, Math.floor(difference / 1000))
  const days = Math.floor(remainingSeconds / 86400)
  const hours = Math.floor((remainingSeconds % 86400) / 3600)
  const minutes = Math.floor((remainingSeconds % 3600) / 60)
  const seconds = remainingSeconds % 60

  return [
    { value: String(days).padStart(2, '0'), label: 'DAYS' },
    { value: String(hours).padStart(2, '0'), label: 'HRS' },
    { value: String(minutes).padStart(2, '0'), label: 'MINS' },
    { value: String(seconds).padStart(2, '0'), label: 'SECS' },
  ]
}

function getCountdownLabel(countdown) {
  const [days, hours, minutes, seconds] = countdown

  return `Offer ends in ${days.value} days, ${hours.value} hours, ${minutes.value} minutes, and ${seconds.value} seconds`
}

function getSubtitleParts(subtitle) {
  const discount = subtitle.match(/\d+%\s+OFF/i)?.[0]

  if (!discount) return { before: subtitle, discount: '', after: '' }

  const [before, after] = subtitle.split(discount)
  return { before, discount, after }
}

export default function TopSaleBar() {
  const [banner, setBanner] = useState(fallbackBanner)
  const [currentTime, setCurrentTime] = useState(0)
  const countdown = getCountdownItems(banner.end_date, currentTime)
  const subtitleParts = getSubtitleParts(banner.subtitle ?? fallbackBanner.subtitle)
  const buttonUrl = banner.redirect_url || '#collection'

  useEffect(() => {
    let isMounted = true

    getBanners()
      .then((banners) => {
        const activeBanner = getActiveBanner(banners)
        if (isMounted && activeBanner) setBanner(activeBanner)
      })
      .catch(() => {
        if (isMounted) setBanner(fallbackBanner)
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!banner.end_date) return undefined

    const firstTick = window.setTimeout(() => setCurrentTime(Date.now()), 0)
    const timer = window.setInterval(() => setCurrentTime(Date.now()), 1000)

    return () => {
      window.clearTimeout(firstTick)
      window.clearInterval(timer)
    }
  }, [banner.end_date])

  return (
    <aside className="top-sale-bar" aria-label="Summer sale announcement">
      <div className="top-sale-content">
        <div className="top-sale-message">
          <span className="top-sale-flame" aria-hidden="true">&#128293;</span>
          <strong>{banner.title}</strong>
          <span>
            {subtitleParts.before}
            {subtitleParts.discount && <mark>{subtitleParts.discount}</mark>}
            {subtitleParts.after}
          </span>
        </div>

        <div className="top-sale-countdown" aria-label={getCountdownLabel(countdown)}>
          <span className="top-sale-clock" aria-hidden="true" />
          <strong>Offer Ends In:</strong>
          <div className="top-sale-timer" aria-hidden="true">
            {countdown.map((item) => (
              <span className="top-sale-time" key={item.label}>
                <span>{item.value}</span>
                <small>{item.label}</small>
              </span>
            ))}
          </div>
        </div>

        <a className="top-sale-button" href={buttonUrl}>
          SHOP NOW <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </aside>
  )
}
