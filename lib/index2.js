const { fetchMyIP, fetchCoordsByIP, fetchIssFlyoverTimes } = require('../iss-promised');

const nextISSTimesForMyLocation = () => {
  fetchMyIP()
    .then(data => {
      return fetchCoordsByIP(JSON.parse(data).ip);
    })
    .then(data => {
      const {latitude, longitude} = JSON.parse(data);
      return fetchIssFlyoverTimes({latitude, longitude});
    })
    .then(data => {
      const {response} = JSON.parse(data);
      response.forEach(({risetime, duration}) => {
        console.log(`Next pass at ${Date(risetime)} for ${duration} seconds.`);
      });
    })
    .catch(error => {
      console.log("Problem fetching data:", error);
    });
};

nextISSTimesForMyLocation();