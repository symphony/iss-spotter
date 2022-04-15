const { fetchMyIP, fetchCoordsByIP } = require('../iss');
const { assert } = require('chai');

describe('fetchMyIP()', () => {
  it('returns your IP as a string', (done) => {
    fetchMyIP((err, data) => {
      const dataType = "string";
      assert.equal(err, null);
      assert.equal(dataType, typeof(data));
      done();
    });
  });
});

describe('fetchCoordsByIP()', () => {
  it('returns your coordinates in an object', (done) => {
    fetchCoordsByIP("192.0.0.1", (err, data) => {
      assert.equal(err, null);
      assert.notDeepEqual(data.latitude, undefined);
      assert.notDeepEqual(data.longitude, undefined);
      done();
    });
  });
});