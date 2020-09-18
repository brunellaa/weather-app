const weatherForm = document.querySelector("#weather-form");
const search = document.querySelector("#search-box");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch("/weather?address=" + location).then((response) => {
    response.json().then(({ location, forecast, error }) => {
      error
        ? (messageOne.textContent = error)
        : (messageOne.textContent = location),
        (messageTwo.textContent =
          forecast.summary +
          " " +
          forecast.temp +
          "°c" +
          " Cloud count:" +
          forecast.clouds);
    });
  });
});
