const { test } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/List_helpers')

test('dummy returns one', () => {
  const blogs = [] // created an empty list to pass in

  const result = listHelper.dummy(blogs)


  assert.strictEqual(result, 1)
})