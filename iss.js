const request = require('./node_modules/request');

const fetchMyIP = (callback) => {
  request('https://api.IPify.org?format=json', (error, status, data) => {
    if (error) return callback(error, status);
    if (status?.statusCode !== 200) return callback(`Invalid Status Code`, status);
    if (!data.includes("}")) return callback("Return value not JSON", status);
    callback(error, JSON.parse(data).ip);
  });
};

module.exports = { fetchMyIP };