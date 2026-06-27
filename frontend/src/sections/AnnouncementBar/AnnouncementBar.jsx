import { useEffect, useState } from 'react'
import promotionImage from '../../assets/images/image.png'
import { getBanners } from '../../services/api.js'
import { getActivePromotionBanner, isBannerExpired } from '../../utils/bannerPromotion.js'

const fallbackBanner = {
  title: 'SUMMER SALE',
  subtitle: 'UP TO 50% OFF ON SELECTED LUXURY PERFUMES',
  image_url: promotionImage,
  redirect_url: '#collection',
}

function getBannerTitleParts(title) {
  const [firstWord, ...rest] = title.split(' ')

  return {
    primary: firstWord || 'SUMMER',
    accent: rest.join(' ') || 'SALE',
  }
}

function getBannerOffer(subtitle) {
  const offerMatch = subtitle.match(/(UP TO\s+)?\d+%\s+OFF/i)
  const offer = offerMatch?.[0] ?? 'UP TO 50% OFF'
  const discountMatch = offer.match(/(\d+%\s+OFF)/i)

  return {
    prefix: offer.replace(discountMatch?.[0] ?? '', ''),
    discount: discountMatch?.[0] ?? '50% OFF',
    copy: subtitle.replace(offer, '').trim() || 'ON SELECTED LUXURY PERFUMES',
  }
}

export default function AnnouncementBar() {
  const [banner, setBanner] = useState(null)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    let isMounted = true

    getBanners()
      .then((banners) => {
        const activeBanner = getActivePromotionBanner(banners, Date.now())
        if (isMounted) setBanner(activeBanner ?? null)
      })
      .catch(() => {
        if (isMounted) setBanner(fallbackBanner)
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!banner?.end_date) return undefined

    const firstTick = window.setTimeout(() => setCurrentTime(Date.now()), 0)
    const timer = window.setInterval(() => setCurrentTime(Date.now()), 1000)

    return () => {
      window.clearTimeout(firstTick)
      window.clearInterval(timer)
    }
  }, [banner?.end_date])

  if (!banner) return null
  if (currentTime && isBannerExpired(banner, currentTime)) return null

  const titleParts = getBannerTitleParts(banner.title)
  const bannerOffer = getBannerOffer(banner.subtitle ?? fallbackBanner.subtitle)
  const imageUrl = banner.image_url || promotionImage
  const buttonUrl = banner.redirect_url || '#collection'

  return (
    <div className="announcement" role="note" aria-label="Summer sale promotion">
      <div className="announcement-content">
        <p className="announcement-eyebrow">MZ ESSENCE</p>
        <p className="announcement-title">{titleParts.primary} <span>{titleParts.accent}</span></p>
        <p className="announcement-offer">{bannerOffer.prefix}<strong>{bannerOffer.discount}</strong></p>
        <p className="announcement-copy">{bannerOffer.copy}</p>
        <div className="announcement-rule" aria-hidden="true"><span /></div>
        <div className="announcement-perks" aria-label="Promotion benefits">
          <span><i className="perk-icon-quality" aria-hidden="true" />Premium<br />quality</span>
          <span><i className="perk-icon-shipping" aria-hidden="true" />Free<br />shipping</span>
          <span><i className="perk-icon-authentic" aria-hidden="true" />100%<br />authentic</span>
          <span><i className="perk-icon-returns" aria-hidden="true" />Easy<br />returns</span>
        </div>
        <a className="announcement-button" href={buttonUrl}>SHOP NOW <span aria-hidden="true">&rarr;</span></a>
      </div>
      <div className="announcement-media" aria-hidden="true">
        <img src={imageUrl} alt="" />
      </div>
    </div>
  )
}
