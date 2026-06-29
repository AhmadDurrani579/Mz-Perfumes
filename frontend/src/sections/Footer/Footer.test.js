import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./Footer.jsx', import.meta.url), 'utf8')

test('footer includes WhatsApp, Instagram, and TikTok social links', () => {
  assert.match(source, /https:\/\/wa\.me\/923715669424/)
  assert.match(source, /https:\/\/www\.instagram\.com\/mzess_ence7/)
  assert.match(source, /https:\/\/www\.tiktok\.com\/@mzessence7/)
})
