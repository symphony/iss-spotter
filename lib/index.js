const { fetchMyIP, fetchCoordsByIP, fetchIssFlyoverTimes } = require('../iss');

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP(({ip}) => {
    fetchCoordsByIP(ip, ({latitude, longitude}) => {
      fetchIssFlyoverTimes(latitude, longitude, ({response}) => {
        callback(response);
      });
    });
  });
};

nextISSTimesForMyLocation((schedule) => schedule.forEach(({risetime, duration}) => {
  console.log(`Next pass at ${Date(risetime)} for ${duration} seconds.`);
}));