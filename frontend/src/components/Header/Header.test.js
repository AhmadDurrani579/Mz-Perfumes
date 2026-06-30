import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./Header.jsx', import.meta.url), 'utf8')

test('renders the sale offer inside the sticky site header', () => {
  assert.match(source, /TopSaleBar/)
  assert.match(source, /<TopSaleBar \/>/)
  assert.match(source, /site-header__nav/)
  assert.match(source, /site-header__offer/)
})
