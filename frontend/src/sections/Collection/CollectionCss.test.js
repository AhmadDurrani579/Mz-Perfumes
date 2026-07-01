import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./Collection.css', import.meta.url), 'utf8')

test('renders product details as a normal page layout', () => {
  assert.match(source, /\.product-detail\s*{[\s\S]*min-height:\s*calc\(100svh - 104px\)/)
  assert.match(source, /\.product-detail\s*{[\s\S]*background:\s*#fbfaf7/)
  assert.match(source, /\.product-detail__panel\s*{[\s\S]*overflow:\s*visible/)
  assert.match(source, /\.product-detail__back-button\s*{[\s\S]*position:\s*absolute/)
})

test('uses light collection surfaces with gold accents', () => {
  assert.match(source, /\.collection-section\s*{[\s\S]*background:\s*#fbfaf7/)
  assert.match(source, /\.collection-filter\[aria-pressed='true'\]\s*{[\s\S]*background:\s*#ead8bd/)
  assert.match(source, /\.product-detail__panel\s*{[\s\S]*background:\s*#fffdf9/)
})

test('renders product items without card borders or framed image crops', () => {
  assert.match(source, /\.collection-section \.product-card\s*{[\s\S]*background:\s*transparent/)
  assert.match(source, /\.collection-section \.product-card\s*{[\s\S]*border:\s*0/)
  assert.match(source, /\.collection-section \.product-card:hover\s*{[\s\S]*box-shadow:\s*none/)
  assert.match(source, /\.product-card__image\s*{[\s\S]*object-fit:\s*contain/)
  assert.match(source, /\.product-card__title-button\s*{[\s\S]*text-align:\s*center/)
  assert.match(source, /\.product-card__title-button\s*{[\s\S]*text-transform:\s*uppercase/)
  assert.match(source, /\.product-card__title-button\s*{[\s\S]*letter-spacing:\s*\.2em/)
})

test('positions the promotion badge over the product image', () => {
  assert.match(source, /\.product-card__discount\s*{[\s\S]*position:\s*absolute/)
  assert.match(source, /\.product-card__discount\s*{[\s\S]*top:\s*0/)
  assert.match(source, /\.product-card__discount\s*{[\s\S]*left:\s*0/)
  assert.match(source, /\.product-card__discount\s*{[\s\S]*background:\s*#7c1d3f/)
})

test('separates product description from price with space and a divider', () => {
  assert.match(source, /\.product-detail__description-block\s*{[\s\S]*margin:\s*28px 0 26px/)
  assert.match(source, /\.product-detail__description-block\s*{[\s\S]*padding:\s*26px 0 24px/)
  assert.match(source, /\.product-detail__description-block\s*{[\s\S]*border-bottom:\s*1px solid #e3dbd0/)
})

test('styles product detail image thumbnails as a compact gallery', () => {
  assert.match(source, /\.product-detail__thumbnails\s*{[\s\S]*display:\s*grid/)
  assert.match(source, /\.product-detail__thumbnail-button\s*{[\s\S]*aspect-ratio:\s*1 \/ 1/)
  assert.match(source, /\.product-detail__thumbnail-button\[aria-pressed='true'\]\s*{[\s\S]*border-color:\s*#171412/)
})
