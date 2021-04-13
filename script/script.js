var searchBtn = $(".btn");
var savedCityBtn = $(".btnCity");
var resultsPage = $("#results-container");
var cityText = $("#inputCity");

function getApi() {
  return new Promise(function (resolve, reject) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityText.val()}&appid=045656fed699b763d7b54a4eb7137c4e&units=imperial`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (forecastData) {
        var lat = forecastData.city.coord.lat;
        var lon = forecastData.city.coord.lon;

        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=045656fed699b763d7b54a4eb7137c4e&units=imperial`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (oneCallData) {
            resolve({
              forecastData: forecastData,
              oneCallData: oneCallData,
            });
          });
      });
  });
}

searchBtn.on("click", function (event) {
  event.preventDefault();

  getApi().then(function (data) {
    console.log(data);
    // current city weather data
    $("#city").text(
      `City: ${data.forecastData.city.name} (${moment().format("M/D/YYYY")})`
    );
    $("#temp").text(`Temp: ${data.oneCallData.current.temp} ºF`);
    $("#wind").text(`Wind: ${data.oneCallData.current.wind_speed} mph`);
    $("#humidity").text(`Humidity: ${data.oneCallData.current.humidity} %`);
    $("#UV-index").text(`UV Index: ${data.oneCallData.current.uvi}`);
    // 5-day forecast data
    for (i = 0; i < data.forecastData.list.length; i++) {
      // ------------
      $(".fiveDay").text(
        `Date: ${moment().format("M/D/YYYY")}
         Icon: ${data.forecastData.list[i].weather[i].icon}
         Temp: ${data.forecastData.list[i].main.temp} ºF 
         Wind: ${data.forecastData.list[i].wind.speed}
         Mph Humidity: ${data.forecastData.list[i].main.humidity}%`
      );
    }
  });
});

savedCityBtn.on("click", function () {
  alert("city button working");
});
