const { fetchMyIP } = require('../iss');

fetchMyIP((error, response) => {
  if (error) return console.log("It didn't work!" , error, '\nStatus Code:', response && response.statusCode);
  console.log('It worked! Returned IP:' , response);
});