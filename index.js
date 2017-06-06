'use strict'

/*
 * anchorify
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

var URL_REGEX = /(?:(?:(?:[a-z]+:)?\/\/)|www\.)?(?:\S+(?::\S*)?@)?(?:localhost|(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#][^\s"]*)?/ig

/**
 * Set target and rel tag when target is
 * defined
 *
 * @method setTarget
 *
 * @param  {String}  [target]
 *
 * @return {String}
 */
function setTarget (target) {
  return target ? 'rel="noreferrer noopener" target="' + target + '"' : ''
}

/**
 * Tells whether there are any protocols in the
 * URL or not
 *
 * @method hasProtocol
 *
 * @param  {String}    url
 *
 * @return {Boolean}
 */
function hasProtocol (url) {
  var protocols = ['http://', 'https://', 'ftp://', '//']
  for (var i = 0; i < protocols.length; i++) {
    if (url.indexOf(protocols[i]) === 0) {
      return true
    }
  }
  return false
}

/**
 * Normalizes a URL by adding `http://` protocol to
 * it when missing
 *
 * @method normalizeUrl
 *
 * @param  {String}     url
 *
 * @return {String}
 */
function normalizeUrl (url) {
  return hasProtocol(url) ? url : 'http://' + url
}

/**
 * Find if url is a valid email address
 *
 * @method isEmail
 *
 * @param  {String}  url
 *
 * @return {Boolean}
 */
function isEmail (url) {
  if (url.indexOf('@') <= -1) {
    return false
  }
  return !hasProtocol(url)
}

/**
 * Normalize the anchor tag body text fetched
 * from url
 *
 * @method normalizText
 *
 * @param  {String}     url
 *
 * @return {String}
 */
function normalizeText (url) {
  return url.replace(/^\/\//, '')
}

module.exports = function (str, options) {
  options = options || {}
  var anchors = []
  var index = -1

  /**
   * Here we replace the existing anchor tags, so that
   * they are presevered
   */
  var afterAnchorTags = str.replace(/<a.[\s\S*]*\/a>/, function (match) {
    anchors.push(match)
    index++
    return '[ac=' + index + ']'
  })

  return afterAnchorTags.replace(URL_REGEX, function (match) {
    if (isEmail(match)) {
      return '<a href="mailto:' + match + '"> ' + match + ' </a>'
    }

    var url = normalizeUrl(match)
    var text = normalizeText(match)
    return '<a href="' + url + '"' + setTarget(options.target) + '> ' + text + ' </a>'
  }).replace(/\[ac=(\d)\]/, function (match, group) {
    return anchors[group]
  })
}
