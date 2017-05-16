'use strict'

/*
 * anchorify
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/
const test = require('japa')
const anchorify = require('..')

test.group('Anchorify', () => {
  test('convert just urls', (assert) => {
    assert.equal(anchorify('google.com'), '<a href="http://google.com"> google.com </a>')
  })

  test('convert urls within a string', (assert) => {
    assert.equal(anchorify('Visit google.com'), 'Visit <a href="http://google.com"> google.com </a>')
  })

  test('convert urls with protocol', (assert) => {
    assert.equal(anchorify('Visit https://google.com'), 'Visit <a href="https://google.com"> https://google.com </a>')
  })

  test('convert urls with open protocol', (assert) => {
    assert.equal(anchorify('Visit //google.com'), 'Visit <a href="//google.com"> google.com </a>')
  })

  test('do not touch existing anchor tags', (assert) => {
    assert.equal(anchorify('Visit <a href="http://google.com"> Google </a>'), 'Visit <a href="http://google.com"> Google </a>')
  })

  test('convert multiple urls', (assert) => {
    assert.equal(anchorify('Visit www.google.com or twitter.com'), 'Visit <a href="http://www.google.com"> www.google.com </a> or <a href="http://twitter.com"> twitter.com </a>')
  })

  test('convert multiple urls with anchor tags', (assert) => {
    assert.equal(anchorify('Visit <a href="http://google.com"> Google </a> or twitter.com'), 'Visit <a href="http://google.com"> Google </a> or <a href="http://twitter.com"> twitter.com </a>')
  })

  test('detect and convert emails', (assert) => {
    assert.equal(anchorify('Send me a copy at foo@bar.com'), 'Send me a copy at <a href="mailto:foo@bar.com"> foo@bar.com </a>')
  })

  test('do not convert invalid emails', (assert) => {
    assert.equal(anchorify('Send me a copy at http://foo@bar.com'), 'Send me a copy at <a href="http://foo@bar.com"> http://foo@bar.com </a>')
  })
})
