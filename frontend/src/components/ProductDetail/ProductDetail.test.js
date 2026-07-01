import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./ProductDetail.jsx', import.meta.url), 'utf8')

test('shows customer-facing product fields in the product detail view', () => {
  assert.match(source, /product\.description/)
  assert.match(source, /Mz Essence/)
  assert.match(source, /product\.productType/)
  assert.match(source, /product\.stockQuantity/)
  assert.match(source, /product\.size/)
  assert.match(source, /product\.gender/)
  assert.match(source, /DESCRIPTION/)
  assert.match(source, /SIZE/)
  assert.match(source, /STOCK/)
  assert.match(source, /GENDER/)
  assert.doesNotMatch(source, /Category ID/)
  assert.doesNotMatch(source, /Product ID/)
  assert.doesNotMatch(source, /Slug/)
})

test('keeps purchase actions available in product details', () => {
  assert.match(source, /addItem\(product\)/)
  assert.match(source, /createWhatsAppUrl\(product\.name\)/)
  assert.match(source, /onBack/)
})

test('renders as a product detail page instead of a modal dialog', () => {
  assert.match(source, /product-detail-page/)
  assert.match(source, /Back to collection/)
  assert.doesNotMatch(source, /role="dialog"/)
  assert.doesNotMatch(source, /aria-modal/)
  assert.doesNotMatch(source, /product-detail__backdrop/)
  assert.doesNotMatch(source, /product-detail__close/)
})
