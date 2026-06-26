import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./Collection.jsx', import.meta.url), 'utf8')

test('loads category filters from the backend API', () => {
  assert.match(source, /getCategories/)
  assert.match(source, /setCategories/)
  assert.match(source, /category\.name/)
})
