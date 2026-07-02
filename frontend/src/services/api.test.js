import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./api.js', import.meta.url), 'utf8')

test('exposes the backend banners endpoint', () => {
  assert.match(source, /getBanners/)
  assert.match(source, /\/api\/banners\//)
})

test('exposes the existing backend order creation endpoint', () => {
  assert.match(source, /createOrder/)
  assert.match(source, /\/api\/orders\//)
  assert.match(source, /method: 'POST'/)
  assert.match(source, /JSON\.stringify\(order\)/)
})
