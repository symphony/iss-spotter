const { fetchMyIP, fetchCoordsByIP } = require('../iss');

fetchMyIP((error, response) => {
  if (error) return console.log("It didn't work!" , error, '\nStatus Code:', response && response.statusCode);
  console.log('It worked! Fetching geo location..');
  fetchCoordsByIP(response, (error, response) => {
    if (error) return console.log("It didn't work!" , error, '\nStatus Code:', response && response.statusCode);
    console.log('It worked! Your location:', response);
  });
});