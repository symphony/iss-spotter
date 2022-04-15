const request = require('./node_modules/request');

const checkErrors = (error, status, data, callback) =>  {
  if (error) throw callback(error, status);
  if (status.statusCode !== 200) throw callback("Bad request", status, data);
  if (!data.includes("}")) throw callback("Return value not JSON", status, data);
};

const fetchMyIP = (callback) => {
  request('https://api.IPify.org?format=json', (error, status, data) => {
    checkErrors(error, status, data, callback);
    callback(error, status, JSON.parse(data).ip);
  });
};

const fetchCoordsByIP = (IP, callback) => {
  request(`https://freegeoip.app/json/${IP}`, (error, status, data) => {
    checkErrors(error, status, data, callback);
    const {latitude, longitude} = JSON.parse(data);
    callback(error, status, {latitude, longitude});
  });
};

const fetchIssFlyoverTimes = (geo, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${geo.latitude}&lon=${geo.longitude}`, (error, status, data) => {
    checkErrors(error, status, data, callback);
    const {response} = JSON.parse(data);
    callback(error, status, response);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchIssFlyoverTimes };