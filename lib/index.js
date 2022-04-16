const { fetchMyIP, fetchCoordsByIP, fetchIssFlyoverTimes } = require('../iss');

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((IP) => {
    fetchCoordsByIP(IP, (geo) => {
      fetchIssFlyoverTimes(geo, (schedule) => {
        callback(schedule);
      });
    });
  });
};

nextISSTimesForMyLocation((schedule) => schedule.forEach(({risetime, duration}) => {
  console.log(`Next pass at ${Date(risetime)} for ${duration} seconds.`);
}));