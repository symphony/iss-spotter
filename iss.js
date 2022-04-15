const request = require('./node_modules/request');

const checkErrors = (error, status, data, callback) =>  {
  if (error) throw callback(error, status);
  if (status?.statusCode !== 200) throw callback(`Bad request`, status);
  if (!data.includes("}")) throw callback("Return value not JSON", status);
};

const fetchMyIP = (callback) => {
  request('https://api.IPify.org?format=json', (error, status, data) => {
    checkErrors(error, status, data, callback);
    callback(error, JSON.parse(data).ip);
  });
};

const fetchCoordsByIP = (IP, callback) => {
  request(`https://freegeoip.app/json/${IP}`, (error, status, data) => {
    checkErrors(error, status, data, callback)
    const {latitude, longitude} = JSON.parse(data);
    callback(error, {latitude, longitude});
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };