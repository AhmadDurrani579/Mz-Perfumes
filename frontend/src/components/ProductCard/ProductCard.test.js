import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./ProductCard.jsx', import.meta.url), 'utf8')

test('only shows discount badge and crossed price when product has a discount', () => {
  assert.match(source, /hasDiscount/)
  assert.match(source, /hasDiscount &&/)
  assert.match(source, /<del>/)
})

test('supports opening a product detail view from the card', () => {
  assert.match(source, /onViewDetails/)
  assert.match(source, /product-card__media-button/)
  assert.match(source, /product-card__title-button/)
  assert.doesNotMatch(source, /product-card__details-trigger/)
  assert.doesNotMatch(source, /product-card__details-text/)
})
