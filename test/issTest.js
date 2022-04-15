const { fetchMyIP, fetchCoordsByIP, fetchIssFlyoverTimes } = require('../iss');
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

describe('fetchIssFlyoverTimes()', () => {
  it('returns flyover times as an array', (done) => {
    fetchIssFlyoverTimes({ latitude: 50, longitude: -100 }, (err, data) => {
      assert.equal(err, null);
      assert.notDeepEqual(data.length === 0);
      assert.notDeepEqual(data[0].risetime, undefined);
      assert.notDeepEqual(data[0].duration, undefined);
      done();
    }),
    it('returns an error when bad request', (done) => {
      fetchIssFlyoverTimes({}, (err, data) => {
        // assert.equal(err, null);
        assert.notDeepEqual(data.statusCode, 200);
        done();
      });
    });
  });
});