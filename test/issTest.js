const { fetchMyIP, fetchCoordsByIP, fetchIssFlyoverTimes } = require('../iss');
const { assert } = require('chai');

describe('fetchMyIP()', () => {
  it('returns your IP as a string', done => {
    fetchMyIP((err, status, data) => {
      const dataType = "string";
      assert.equal(err, null);
      assert.equal(dataType, typeof(data));
      done();
    });
  });
});

describe('fetchCoordsByIP()', () => {
  it('returns your coordinates in an object', done => {
    fetchCoordsByIP("192.0.0.1", (err, status, data) => {
      assert.equal(err, null);
      assert.notDeepEqual(data.latitude, undefined);
      assert.notDeepEqual(data.longitude, undefined);
      done();
    });
  });
});

describe('fetchIssFlyoverTimes()', () => {
  it('returns flyover times as an array', done => {
    fetchIssFlyoverTimes({ latitude: 50, longitude: -100 }, (err, status, data) => {
      assert.equal(err, null);
      assert.notDeepEqual(data.length === 0);
      assert.notDeepEqual(data[0].risetime, undefined);
      assert.notDeepEqual(data[0].duration, undefined);
      done();
    });
  }),

  it('throws an error when bad request', done => {
    assert.Throw(() => {
      fetchIssFlyoverTimes({}, (err, status, data) => {
        assert.deepEqual("invalid coordinates", data);
        assert.notDeepEqual(200, status.statusCode);
        done();
      })
    });
  });
});