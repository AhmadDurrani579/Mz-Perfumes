import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./Collection.css', import.meta.url), 'utf8')

test('hides the product detail modal scrollbar while preserving overflow scrolling', () => {
  assert.match(source, /\.product-detail__panel[\s\S]*overflow: auto/)
  assert.match(source, /\.product-detail__panel[\s\S]*scrollbar-width: none/)
  assert.match(source, /\.product-detail__panel::-webkit-scrollbar/)
  assert.match(source, /display: none/)
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
