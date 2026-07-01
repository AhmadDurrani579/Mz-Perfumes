import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./Collection.css', import.meta.url), 'utf8')

function rule(selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = source.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`))
  assert.ok(match, `Expected ${selector} rule to exist`)
  return match[1]
}

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

test('renders product items as bordered catalog cards with full-width cover images', () => {
  assert.match(source, /\.collection-section \.product-card\s*{[\s\S]*background:\s*#fffdf9/)
  assert.match(source, /\.collection-section \.product-card\s*{[\s\S]*border:\s*1px solid #ded6cc/)
  assert.match(source, /\.collection-section \.product-card:hover\s*{[\s\S]*border-color:\s*rgba\(201,\s*154,\s*69,\s*\.62\)/)
  assert.match(rule('.product-card__media-button'), /padding:\s*0/)
  assert.match(rule('.product-card__image'), /object-fit:\s*cover/)
  assert.match(source, /\.product-card__title-button\s*{[\s\S]*text-align:\s*center/)
  assert.match(source, /\.product-card__house\s*{[\s\S]*letter-spacing:\s*\.22em/)
  assert.match(source, /\.collection-section \.product-card h3\s*{[\s\S]*font-size:\s*clamp\(16px,\s*1\.08vw,\s*19px\)/)
  assert.match(source, /\.collection-section \.product-card h3\s*{[\s\S]*font-weight:\s*700/)
  assert.match(source, /\.product-card__title-button\s*{[\s\S]*text-transform:\s*none/)
  assert.match(source, /\.product-card__description\s*{[\s\S]*-webkit-line-clamp:\s*1/)
  assert.match(source, /\.product-card__pricing\s*{[\s\S]*font-size:\s*18px/)
  assert.match(source, /\.product-card__pricing\s*{[\s\S]*font-weight:\s*700/)
  assert.match(source, /\.product-card__details-trigger\s*{[\s\S]*color:\s*#fffdf9/)
  assert.match(source, /\.product-card__details-trigger\s*{[\s\S]*min-height:\s*46px/)
  assert.match(source, /\.product-card__details-trigger\s*{[\s\S]*padding:\s*10px 18px/)
  assert.match(source, /\.product-card__details-trigger\s*{[\s\S]*background:\s*linear-gradient\(180deg,\s*#c99a45 0%,\s*#b98431 100%\)/)
  assert.match(source, /\.product-card__details-trigger\s*{[\s\S]*border-top:\s*1px solid rgba\(23,\s*20,\s*18,\s*\.1\)/)
  assert.match(source, /\.product-card__details-trigger\s*{[\s\S]*font-weight:\s*500/)
  assert.match(source, /\.product-card__details-trigger:hover\s*{[^}]*color:\s*#b98431/)
  assert.match(source, /\.product-card__details-trigger:hover\s*{[^}]*background:\s*#fffdf9/)
})

test('positions the promotion badge over the product image', () => {
  assert.match(source, /\.product-card__discount\s*{[\s\S]*position:\s*absolute/)
  assert.match(source, /\.product-card__discount\s*{[\s\S]*top:\s*18px/)
  assert.match(source, /\.product-card__discount\s*{[\s\S]*left:\s*18px/)
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
