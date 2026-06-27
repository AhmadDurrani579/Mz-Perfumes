import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./AnnouncementBar.jsx', import.meta.url), 'utf8')

test('renders the summer sale promotion banner with the perfume image', () => {
  assert.match(source, /image\.png/)
  assert.match(source, /SUMMER/)
  assert.match(source, /SALE/)
  assert.match(source, /50% OFF/)
  assert.match(source, /SHOP NOW/)
})

test('loads active banner content from the backend API', () => {
  assert.match(source, /getBanners/)
  assert.match(source, /setBanner/)
  assert.match(source, /image_url/)
  assert.match(source, /getActivePromotionBanner/)
  assert.match(source, /redirect_url/)
})

test('hides the announcement banner when the offer has expired', () => {
  assert.match(source, /getActivePromotionBanner/)
  assert.match(source, /setBanner\(activeBanner \?\? null\)/)
  assert.match(source, /if \(!banner\) return null/)
})
