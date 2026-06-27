import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./api.js', import.meta.url), 'utf8')

test('exposes the backend banners endpoint', () => {
  assert.match(source, /getBanners/)
  assert.match(source, /\/api\/banners\//)
})
