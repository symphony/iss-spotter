const request = require('./node_modules/request');

const checkErrors = (error, response, body) => {
  if (error || response.statusCode !== 200) {
    const data = body ? '\nBody: ' + body.slice(0, 100) : ''; // include retrieved data if any. truncate to 100 chars max.
    console.log(`Problem fetching: ${error}\nStatus Code: ${response && response.statusCode}${data}`);
    throw TypeError("Error");
  }
};

const fetchRequest = (url, callback) => {
  request(url, (error, response, body) => {
    checkErrors(error, response, body);
    callback(JSON.parse(body));
  });
};

// async functions
const fetchMyIP = (callback) => {
  fetchRequest('https://api.IPify.org?format=json', callback);
};

const fetchCoordsByIP = (ip, callback) => {
  fetchRequest(`https://freegeoip.app/json/${ip}`, callback);
};

const fetchIssFlyoverTimes = (lat, lon, callback) => {
  fetchRequest(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${lon}`, callback);
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchIssFlyoverTimes };

