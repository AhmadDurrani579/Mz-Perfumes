export function isBannerExpired(banner, currentTime) {
  if (!banner?.end_date) return false

  return new Date(banner.end_date).getTime() <= currentTime
}

export function getActivePromotionBanner(banners, currentTime) {
  return banners.find((banner) => banner.is_active !== false && !isBannerExpired(banner, currentTime))
}
