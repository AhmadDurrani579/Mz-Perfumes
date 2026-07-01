import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./App.jsx', import.meta.url), 'utf8')

test('renders product details as a separate page instead of a popup', () => {
  assert.match(source, /useState/)
  assert.match(source, /selectedProduct/)
  assert.match(source, /setSelectedProduct/)
  assert.match(source, /handleCollectionNavigation/)
  assert.match(source, /<Header onCollectionClick={handleCollectionNavigation} \/>/)
  assert.match(source, /<Collection onViewProduct={setSelectedProduct} \/>/)
  assert.match(source, /<ProductDetail product={selectedProduct} \/>/)
  assert.doesNotMatch(source, /onBack/)
})
