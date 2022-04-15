const { fetchMyIP } = require('../iss');
const { assert } = require('chai');

describe('fetchMyIP()', () => {
  it('fetches your public ip and saves it to a variable', (done) => {
    fetchMyIP((err, data) => {
      const dataType = "string";
      assert.equal(err, null);
      assert.equal(dataType, typeof(data));

      done();
    });
  }),
  it('passes error to callback if error', (done) => {
    fetchMyIP((err, desc) => {
      const expectedErr = "Error";
      // compare returned description
      assert.equal(expectedErr, err);

      // desc should be null
      assert.equal(desc, null);

      done();
    });
  });
});