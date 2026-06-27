import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./globals.css', import.meta.url), 'utf8')
const announcementImageBlock = source.match(/\.announcement-media img\s*{[^}]+}/)?.[0] ?? ''

test('announcement banner image covers the banner with softened opacity', () => {
  assert.match(announcementImageBlock, /object-fit:\s*cover/)
  assert.match(announcementImageBlock, /object-position:\s*right center/)
  assert.match(announcementImageBlock, /opacity:\s*\.\d+/)
})
