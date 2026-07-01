import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./Collection.jsx', import.meta.url), 'utf8')

test('loads brand filters from the backend API', () => {
  assert.match(source, /getBrands/)
  assert.match(source, /setBrands/)
  assert.match(source, /brand\.name/)
})

test('loads products from the backend API', () => {
  assert.match(source, /getProducts/)
  assert.match(source, /setProducts/)
  assert.match(source, /mapBackendProduct/)
})

test('filters products by selected brand', () => {
  assert.match(source, /mapBackendProduct/)
  assert.match(source, /visibleProducts/)
  assert.match(source, /product\.brandId === activeBrandId/)
})

test('sends selected products to the parent page controller', () => {
  assert.match(source, /onViewProduct/)
  assert.match(source, /onViewDetails={onViewProduct}/)
  assert.doesNotMatch(source, /selectedProduct/)
  assert.doesNotMatch(source, /setSelectedProduct/)
  assert.doesNotMatch(source, /<ProductDetail/)
})
