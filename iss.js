const request = require('./node_modules/request');

const checkErrors = (error, response, data, task) =>  {
  if (error || response.statusCode !== 200) {
    console.log(`Problem fetching ${task}: ${error}\nStatus Code: ${response && response.statusCode}${data ? '\nMessage: ' + data : ''}`);
    throw TypeError("Error");
  }
};

// Async functions
const fetchMyIP = (callback) => {
  request('https://api.IPify.org?format=json', (error, status, data) => {
    checkErrors(error, status, data, "IP");
    callback(JSON.parse(data).ip);
  });
};

const fetchCoordsByIP = (IP, callback) => {
  request(`https://freegeoip.app/json/${IP}`, (error, status, data) => {
    checkErrors(error, status, data, "geo");
    const {latitude, longitude} = JSON.parse(data);
    callback({latitude, longitude});
  });
};

const fetchIssFlyoverTimes = (geo, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${geo.latitude}&lon=${geo.longitude}`, (error, status, data) => {
    checkErrors(error, status, data, "schedule");
    const {response} = JSON.parse(data);
    callback(response);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchIssFlyoverTimes };