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

test('opens a product detail view from selected product state', () => {
  assert.match(source, /selectedProduct/)
  assert.match(source, /setSelectedProduct/)
  assert.match(source, /ProductDetail/)
  assert.match(source, /onClose=\{\(\) => setSelectedProduct\(null\)\}/)
})
