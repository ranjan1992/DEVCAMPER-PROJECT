const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey: 'xAHpO2604B5W6p9W9RMyQnLdfIU29URO',
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
