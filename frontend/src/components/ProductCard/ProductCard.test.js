import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./ProductCard.jsx', import.meta.url), 'utf8')
const collectionStyles = readFileSync(new URL('../../sections/Collection/Collection.css', import.meta.url), 'utf8')

test('renders a simplified grid card without purchase details', () => {
  assert.doesNotMatch(source, /useCart/)
  assert.doesNotMatch(source, /createWhatsAppUrl/)
  assert.doesNotMatch(source, /product-card__house/)
  assert.doesNotMatch(source, /product-card__description/)
  assert.doesNotMatch(source, /product-card__pricing/)
  assert.doesNotMatch(source, /Add to cart/)
  assert.doesNotMatch(source, /Enquire on WhatsApp/)
})

test('shows a discount badge for promoted products', () => {
  assert.match(source, /hasDiscount/)
  assert.match(source, /discountBadgeLabel/)
  assert.match(source, /product-card__discount/)
  assert.match(source, /promotionApplied/)
  assert.match(source, /discountLabel/)
})

test('supports opening a product detail view from the card', () => {
  assert.match(source, /onViewDetails/)
  assert.match(source, /product-card__media-button/)
  assert.match(source, /product-card__title-button/)
  assert.doesNotMatch(source, /product-card__details-trigger/)
  assert.doesNotMatch(source, /product-card__details-text/)
})

test('uses four product cards per desktop row', () => {
  assert.match(collectionStyles, /grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\)/)
})
