const { fetchMyIP, fetchCoordsByIP, fetchIssFlyoverTimes } = require('../iss');

const nextISSTimesForMyLocation = callback => {
  fetchMyIP((error, response, IP) => {
    fetchCoordsByIP(IP, (error, response, geo) => {
      fetchIssFlyoverTimes(geo, (error, response, schedule) => {
        callback(schedule);
      });
    });
  });
};

nextISSTimesForMyLocation(schedule => schedule.forEach(({risetime, duration}) =>
  console.log(`Next pass at ${Date(risetime)} for ${duration} seconds.`))
);