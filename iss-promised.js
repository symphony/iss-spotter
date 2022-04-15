const request = require('request-promise-native');

const fetchMyIP = () => request('https://api.IPify.org?format=json');
const fetchCoordsByIP = IP => request(`https://freegeoip.app/json/${IP}`);
const fetchIssFlyoverTimes = geo => request(`https://iss-pass.herokuapp.com/json/?lat=${geo.latitude}&lon=${geo.longitude}`);

module.exports = { fetchMyIP, fetchCoordsByIP, fetchIssFlyoverTimes };