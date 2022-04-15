const { fetchMyIP, fetchCoordsByIP, fetchIssFlyoverTimes } = require('../iss');

fetchMyIP((error, response, IP) => {
  if (error) return console.log("Problem fetching IP:" , error, '\nStatus Code:', response && response.statusCode, "Message:", IP);
  console.log('Here\'s your ip:', IP),
  console.log(" --\n");
  fetchCoordsByIP(IP, (error, response, geo) => {
    if (error) return console.log("Problem fetching location:", error, '\nStatus Code:', response && response.statusCode);
    console.log('Your location:', geo),
    console.log(" --\n");
    fetchIssFlyoverTimes(geo, (error, response, schedule) => {
      if (error) return console.log("Problem fetching ISS schedule:", error, '\nStatus Code:', response && response.statusCode, "\nMessage:", schedule);
      console.log('It worked! Here are the flyover times:', schedule);
      console.log("");
    });
  });
});