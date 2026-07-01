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
  assert.match(source, /\.collection-section \.product-card\s*{[\s\S]*background:\s*#ffffff/)
  assert.match(source, /\.product-detail__panel\s*{[\s\S]*background:\s*#fffdf9/)
})
