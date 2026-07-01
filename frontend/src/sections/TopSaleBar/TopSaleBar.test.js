import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const appSource = readFileSync(new URL('../../App.jsx', import.meta.url), 'utf8')
const source = readFileSync(new URL('./TopSaleBar.jsx', import.meta.url), 'utf8')

test('renders the compact summer sale offer for the sticky header', () => {
  assert.match(source, /SUMMER SALE!/)
  assert.match(source, /50% OFF/)
  assert.match(source, /Offer Ends In:/)
  assert.match(source, /DAYS/)
  assert.match(source, /HRS/)
  assert.match(source, /MINS/)
  assert.match(source, /SECS/)
  assert.match(source, /SHOP NOW/)

  assert.doesNotMatch(appSource, /<TopSaleBar \/>[\s\S]*<Header \/>/)
})

test('loads top bar title, subtitle, and end date from backend banners', () => {
  assert.match(source, /getBanners/)
  assert.match(source, /setBanner/)
  assert.match(source, /banner\.title/)
  assert.match(source, /banner\.subtitle/)
  assert.match(source, /banner\.end_date/)
  assert.match(source, /getCountdownItems/)
})

test('hides the top bar when the offer has expired', () => {
  assert.match(source, /getActivePromotionBanner/)
  assert.match(source, /setBanner\(activeBanner \?\? null\)/)
  assert.match(source, /const isVisible = Boolean\(banner\) && !\(currentTime && isBannerExpired\(banner, currentTime\)\)/)
  assert.match(source, /onVisibilityChange\?\.\(isVisible\)/)
  assert.match(source, /if \(!isVisible\) return null/)
})
