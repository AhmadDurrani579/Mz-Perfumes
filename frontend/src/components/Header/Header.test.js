import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./Header.jsx', import.meta.url), 'utf8')
const styles = readFileSync(new URL('../../styles/globals.css', import.meta.url), 'utf8')

test('renders the sale offer inside the sticky site header', () => {
  assert.match(source, /TopSaleBar/)
  assert.match(source, /<TopSaleBar onVisibilityChange={setHasSaleOffer} \/>/)
  assert.match(source, /site-header__nav/)
  assert.match(source, /site-header__offer/)
})

test('only uses the expanded header layout while the sale offer is visible', () => {
  assert.match(source, /const \[hasSaleOffer, setHasSaleOffer\] = useState\(false\)/)
  assert.match(source, /site-header--has-offer/)
  assert.match(styles, /\.site-header\s*{[^}]*grid-template-columns:\s*auto 1fr auto/)
  assert.match(styles, /\.site-header--has-offer\s*{[^}]*grid-template-columns:\s*auto auto minmax\(460px, 1fr\) auto/)
  assert.doesNotMatch(styles, /:has\(\.top-sale-bar\)/)
})
