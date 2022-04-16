const request = require('./node_modules/request');

const fetchRequest = (url, callback) => {
  request(url, (error, response, data) => {
    if (error || response.statusCode !== 200) {
      console.log(`Problem fetching: ${error}\nStatus Code: ${response && response.statusCode}${data ? '\nMessage: ' + data : ''}`);
      throw TypeError("Error");
    }
    callback(JSON.parse(data));
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