/* globals describe, it */

var assert = require('chai').assert

var geoTz = require('../index.js')

process.chdir('/tmp')

describe('find tests', function () {
  it('should find the timezone name for a valid coordinate', function () {
    var tz = geoTz.tz(47.650499, -122.350070)
    assert.isString(tz)
    assert.equal(tz, 'America/Los_Angeles')
  })

  it('should find the timezone name for a valid coordinate via subfile examination', function () {
    var tz = geoTz.tz(1.44, 104.04)
    assert.isString(tz)
    assert.equal(tz, 'Asia/Singapore')
  })

  it('should return null timezone name for coordinate in ocean', function () {
    var tz = geoTz.tz(0, 0)
    assert.isNull(tz)
  })

  it('should return a moment-timezone', function () {
    var tzMoment = geoTz.tzMoment(47.650499, -122.350070)
    assert.isObject(tzMoment)
    assert.deepPropertyVal(tzMoment, '_z.name', 'America/Los_Angeles')
  })

  it('should return null timezone moment for coordinate in ocean', function () {
    var tz = geoTz.tzMoment(0, 0)
    assert.isNull(tz)
  })

  it('should parse time correctly', function () {
    var tzMoment = geoTz.tzMoment(47.650499, -122.350070, '2016-03-30T01:23:45Z')
    assert.equal(tzMoment.format('LLLL'), 'Tuesday, March 29, 2016 6:23 PM')
  })
})
