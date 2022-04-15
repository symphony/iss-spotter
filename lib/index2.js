const { fetchMyIP, fetchCoordsByIP, fetchIssFlyoverTimes } = require('../iss-promised');

// const checkErrors = (error, status, data, callback) =>  {
//   if (error) throw callback(error, status);
//   if (status.statusCode !== 200) throw callback("Bad request", status, data);
//   if (!data.includes("}")) throw callback("Return value not JSON", status, data);
// };

const nextISSTimesForMyLocation = () => {
  fetchMyIP()
    .then(data =>
      fetchCoordsByIP(JSON.parse(data).ip))
    .then(data => {
      const {latitude, longitude} = JSON.parse(data);
      return fetchIssFlyoverTimes({latitude, longitude});
    })
    .then(data => {
      const {response} = JSON.parse(data);
      response.forEach(({risetime, duration}) =>
        console.log(`Next pass at ${Date(risetime)} for ${duration} seconds.`));
    })
    .catch(error =>
      console.log("Problem fetching data:", error.error));
};

nextISSTimesForMyLocation();