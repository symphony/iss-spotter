const request = require('./node_modules/request');

// Error handling - returns error as string, or null if none
const checkErrors = (error, response, data, task) =>  {
  const msg = `Problem fetching ${task}: ${error}\nStatus Code: ${response && response.statusCode}${data ? '\nMessage: ' + data : ''}`;
  if (error || response.statusCode !== 200) {
    console.log(msg);
    throw TypeError("Error");
  }
  if (!data.includes("}")) {
    console.log(msg);
    throw TypeError("Return value not JSON");
  }
};

// Async functions
const fetchMyIP = (callback) => {
  request('https://api.IPify.org?format=json', (error, status, data) => {
    checkErrors(error, status, data, "IP");
    callback(error, status, JSON.parse(data).ip);
  });
};

const fetchCoordsByIP = (IP, callback) => {
  request(`https://freegeoip.app/json/${IP}`, (error, status, data) => {
    checkErrors(error, status, data, "geo");
    const {latitude, longitude} = JSON.parse(data);
    callback(error, status, {latitude, longitude});
  });
};

const fetchIssFlyoverTimes = (geo, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${geo.latitude}&lon=${geo.longitude}`, (error, status, data) => {
    checkErrors(error, status, data, "schedule");
    const {response} = JSON.parse(data);
    callback(error, status, response);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchIssFlyoverTimes };