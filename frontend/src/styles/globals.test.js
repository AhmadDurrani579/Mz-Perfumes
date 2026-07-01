import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./globals.css', import.meta.url), 'utf8')
const variables = readFileSync(new URL('./variables.css', import.meta.url), 'utf8')
const announcementImageBlock = source.match(/\.announcement-media img\s*{[^}]+}/)?.[0] ?? ''

test('announcement banner image covers the banner with softened opacity', () => {
  assert.match(announcementImageBlock, /object-fit:\s*cover/)
  assert.match(announcementImageBlock, /object-position:\s*right center/)
  assert.match(announcementImageBlock, /opacity:\s*\.\d+/)
})

test('uses the light ivory and gold brand palette globally', () => {
  assert.match(variables, /--color-background:\s*#fbfaf7/)
  assert.match(variables, /--color-surface:\s*#ffffff/)
  assert.match(variables, /--color-text:\s*#171412/)
  assert.match(variables, /--color-accent:\s*#c99a45/)
  assert.match(source, /\.site-header\s*{[\s\S]*background:\s*rgba\(255, 255, 255, \.94\)/)
  assert.match(source, /\.announcement\s*{[\s\S]*background:\s*#f5f1ea/)
})
