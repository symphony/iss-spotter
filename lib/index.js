const { fetchMyIP, fetchCoordsByIP, fetchIssFlyoverTimes } = require('../iss');


const nextISSTimesForMyLocation = callback => {
  fetchMyIP((error, response, IP) => {
    if (error) return console.log("Problem fetching IP:" , error, '\nStatus Code:', response && response.statusCode, "Message:", IP);
    fetchCoordsByIP(IP, (error, response, geo) => {
      if (error) return console.log("Problem fetching location:", error, '\nStatus Code:', response && response.statusCode);
      fetchIssFlyoverTimes(geo, (error, response, schedule) => {
        if (error) return console.log("Problem fetching ISS schedule:", error, '\nStatus Code:', response && response.statusCode, "\nMessage:", schedule);
        callback(schedule);
      });
    });
  });
};

nextISSTimesForMyLocation(schedule => schedule.forEach(({risetime, duration})=>
  console.log(`Next pass at ${Date(risetime)} for ${duration} seconds.`))
);