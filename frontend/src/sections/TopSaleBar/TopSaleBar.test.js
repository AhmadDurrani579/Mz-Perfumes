import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const appSource = readFileSync(new URL('../../App.jsx', import.meta.url), 'utf8')
const source = readFileSync(new URL('./TopSaleBar.jsx', import.meta.url), 'utf8')

test('renders the compact summer sale top bar above the header', () => {
  assert.match(source, /SUMMER SALE!/)
  assert.match(source, /50% OFF/)
  assert.match(source, /Offer Ends In:/)
  assert.match(source, /DAYS/)
  assert.match(source, /HRS/)
  assert.match(source, /MINS/)
  assert.match(source, /SECS/)
  assert.match(source, /SHOP NOW/)

  assert.match(appSource, /<TopSaleBar \/>[\s\S]*<Header \/>/)
})
