import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./AnnouncementBar.jsx', import.meta.url), 'utf8')

test('renders the summer sale promotion banner with the perfume image', () => {
  assert.match(source, /image\.png/)
  assert.match(source, /SUMMER/)
  assert.match(source, /SALE/)
  assert.match(source, /50% OFF/)
  assert.match(source, /SHOP NOW/)
})
