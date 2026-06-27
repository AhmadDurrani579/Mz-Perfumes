import assert from 'node:assert/strict'
import { test } from 'node:test'

import { getActivePromotionBanner, isBannerExpired } from './bannerPromotion.js'

const now = new Date('2026-06-27T12:00:00Z').getTime()

test('treats banners with past end dates as expired', () => {
  assert.equal(isBannerExpired({ end_date: '2026-06-27T11:59:59Z' }, now), true)
  assert.equal(isBannerExpired({ end_date: '2026-06-27T12:01:00Z' }, now), false)
})

test('selects the first active banner that has not expired', () => {
  const banner = getActivePromotionBanner([
    { id: 'expired', is_active: true, end_date: '2026-06-27T11:59:59Z' },
    { id: 'inactive', is_active: false, end_date: '2026-06-27T12:10:00Z' },
    { id: 'live', is_active: true, end_date: '2026-06-27T12:10:00Z' },
  ], now)

  assert.equal(banner.id, 'live')
})
