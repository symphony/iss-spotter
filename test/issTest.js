const { fetchMyIP, fetchCoordsByIP, fetchIssFlyoverTimes } = require('../iss');
const { assert } = require('chai');

describe('fetchMyIP()', () => {
  it('returns your IP as a string', done => {
    fetchMyIP(({ip}) => {
      const dataType = "string";
      assert.equal(dataType, typeof(ip));
      done();
    });
  });
});

describe('fetchCoordsByIP()', () => {
  it('returns your coordinates in an object', done => {
    fetchCoordsByIP("192.0.0.1", ({latitude, longitude}) => {
      assert.notDeepEqual(latitude, undefined);
      assert.notDeepEqual(longitude, undefined);
      done();
    });
  });
});

describe('fetchIssFlyoverTimes()', () => {
  it('returns flyover times as an array', done => {
    fetchIssFlyoverTimes(50, -100, ({response}) => {
      assert.notDeepEqual(response.length === 0);
      assert.notDeepEqual(response[0].risetime, undefined);
      assert.notDeepEqual(response[0].duration, undefined);
      done();
    });
  });
});
