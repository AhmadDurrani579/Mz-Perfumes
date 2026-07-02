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
  assert.match(source, /\.product-detail\s*{[\s\S]*background:\s*#ffffff/)
  assert.match(source, /\.product-detail__panel\s*{[\s\S]*overflow:\s*visible/)
  assert.match(source, /\.product-detail__panel\s*{[\s\S]*border:\s*0/)
  assert.match(source, /\.product-detail__panel\s*{[\s\S]*box-shadow:\s*none/)
  assert.doesNotMatch(source, /product-detail__back-button/)
})

test('uses light collection surfaces with gold accents', () => {
  assert.match(source, /\.collection-section\s*{[\s\S]*background:\s*#fbfaf7/)
  assert.match(source, /\.collection-filter\[aria-pressed='true'\]\s*{[\s\S]*background:\s*#ead8bd/)
  assert.match(source, /\.product-detail__panel\s*{[\s\S]*background:\s*transparent/)
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

test('styles the product detail description jump link and lower section', () => {
  assert.match(source, /\.product-detail__description-link\s*{[\s\S]*margin:\s*18px 0 20px/)
  assert.match(source, /\.product-detail__description-link\s*{[\s\S]*border-bottom:\s*1px solid #e3dbd0/)
  assert.match(source, /\.product-detail__description-link\s*{[\s\S]*text-decoration-line:\s*underline/)
  assert.match(source, /\.product-detail__description-link\s*{[\s\S]*text-decoration-thickness:\s*3px/)
  assert.doesNotMatch(source, /\.product-detail__description-link::after/)
  assert.match(source, /\.product-detail__description-section\s*{[\s\S]*grid-column:\s*1 \/ -1/)
  assert.match(source, /\.product-detail__description-section\s*{[\s\S]*scroll-margin-top:\s*120px/)
  assert.match(source, /\.product-detail__description-section\s*{[\s\S]*text-align:\s*center/)
  assert.match(source, /\.product-detail__description\s*{[\s\S]*margin:\s*0 auto/)
})

test('styles product detail image thumbnails as a compact gallery', () => {
  assert.match(source, /\.product-detail__thumbnails\s*{[\s\S]*display:\s*grid/)
  assert.match(source, /\.product-detail__thumbnail-button\s*{[\s\S]*aspect-ratio:\s*1 \/ 1/)
  assert.match(source, /\.product-detail__thumbnail-button\[aria-pressed='true'\]\s*{[\s\S]*border-color:\s*#171412/)
})

test('styles product detail slider and quantity controls', () => {
  assert.match(source, /\.product-detail__image-stage\s*{[\s\S]*position:\s*relative/)
  assert.match(source, /\.product-detail__slider-button\s*{[\s\S]*position:\s*absolute/)
  assert.match(source, /\.product-detail__slider-button--previous\s*{[\s\S]*left:\s*0/)
  assert.match(source, /\.product-detail__slider-button--next\s*{[\s\S]*right:\s*0/)
  assert.match(source, /\.product-detail__purchase\s*{[\s\S]*grid-template-columns:\s*156px minmax\(240px,\s*374px\)/)
  assert.match(source, /\.product-detail__quantity\s*{[\s\S]*grid-template-columns:\s*44px 1fr 44px/)
  assert.match(source, /\.product-detail__quantity-button\s*{[\s\S]*background:\s*#ffffff/)
})

test('uses the brand color combo for the product detail add to cart button', () => {
  assert.match(source, /\.product-detail__cart-button\s*{[\s\S]*background:\s*linear-gradient\(180deg,\s*#c99a45 0%,\s*#b98431 100%\)/)
  assert.match(source, /\.product-detail__cart-button\s*{[\s\S]*border-color:\s*#b98431/)
  assert.doesNotMatch(source, /\.product-detail__cart-button\s*{[\s\S]*background:\s*#000000/)
})

test('keeps product detail proportions close to the compact reference layout', () => {
  assert.match(source, /\.product-detail\s*{[\s\S]*padding:\s*clamp\(24px,\s*3vw,\s*34px\) 24px clamp\(42px,\s*5vw,\s*64px\)/)
  assert.match(source, /\.product-detail__panel\s*{[\s\S]*width:\s*min\(1060px,\s*100%\)/)
  assert.match(source, /\.product-detail__panel\s*{[\s\S]*grid-template-columns:\s*minmax\(320px,\s*674px\) minmax\(320px,\s*550px\)/)
  assert.match(source, /\.product-detail__media\s*{[\s\S]*max-width:\s*674px/)
  assert.match(source, /\.product-detail__image-stage\s*{[\s\S]*max-height:\s*674px/)
  assert.match(source, /\.product-detail h2\s*{[\s\S]*font-size:\s*clamp\(32px,\s*3\.1vw,\s*46px\)/)
  assert.match(source, /\.product-detail__description-link\s*{[\s\S]*margin:\s*18px 0 20px/)
  assert.match(source, /\.product-detail__price strong\s*{[\s\S]*font-size:\s*30px/)
  assert.match(source, /\.product-detail__variants\s*{[\s\S]*gap:\s*24px/)
  assert.match(source, /\.product-detail__variant-button\s*{[\s\S]*width:\s*84px/)
  assert.match(source, /\.product-detail__purchase\s*{[\s\S]*grid-template-columns:\s*156px minmax\(240px,\s*374px\)/)
})
