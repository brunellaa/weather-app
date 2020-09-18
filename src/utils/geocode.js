const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    //encodeURIComponent processes special characters into compatible url format ej ? becomes %3f
    encodeURIComponent(address) +
    ".json?limit=1&access_token=pk.eyJ1IjoiYWJydW5lbGxhIiwiYSI6ImNrZWZwODljcDBkbmkyeHJ6ZXpwZWFqdWoifQ.Q9s6QBKsVcfTalG82RsRtg";
  request({ url, json: true }, (error, { body: { message, features } }) => {
    //  ERROR HANDLING
    if (error) {
      callback("Unable to connect to location servies", undefined);
    } else if (message) {
      callback(message.toString());
    } else if (features.length === 0) {
      callback("Location error, try another search parameter");
    } else {
      //undefined to pass first value(error)
      const coordinates = features[0].center;
      const location = features[0].place_name;
      callback(undefined, {
        latitude: coordinates[1],
        longitude: coordinates[0],
        location,
        // url,
      });
    }
  });
};

module.exports = geocode;
