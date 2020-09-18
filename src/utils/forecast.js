const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=metric&appid=4837bf710e884d0890d7140f145f99b8";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to WEATHER service");
    } else if (body.message) {
      callback("Error code: " + body.cod + " message: " + body.message);
    } else {
      const temp = body.main.temp;
      const clouds = body.clouds.all;
      const summary = body.weather[0].description;
      const data = {
        temp,
        clouds,
        summary,
      };
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
