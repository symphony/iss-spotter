const request = require('./node_modules/request');
const ipify = 'https://api.IPify.org?format=json';
let myIP = "";

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const saveIP = IP => myIP = IP;

const fetchMyIP = (callback) => {
  request(ipify, (error, status, data) => {
    if (!error) callback(error, JSON.parse(data).ip);
    callback(error, JSON.parse(data).ip);
  });
};

module.exports = { fetchMyIP };