const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/List_helpers')

describe('total likes', () => {
  // Test 1: Empty list
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  // Test 2: One blog
  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
    ]
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
  })

  // Test 3: Multiple blogs
  test('of a bigger list is calculated right', () => {
    const blogs = [
      { title: 'Blog 1', likes: 10 },
      { title: 'Blog 2', likes: 5 },
      { title: 'Blog 3', likes: 12 }
    ]

    assert.strictEqual(listHelper.totalLikes(blogs), 27)
  })
})