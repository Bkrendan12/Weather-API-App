var searchBtn = $(".btn");
var savedCityBtn = $(".btnCity");
var cityText = $("#inputCity");
var fiveDay = $(".fiveDay");
var icons = $(".weather-icon");

var searchedCities = [];
var historyUl = $("#historyUl");

var localGet = localStorage.getItem("City Name");

if (localGet !== null) {
  searchedCities = JSON.parse(localGet);
  console.log(searchedCities);
}
showButtons();

function getApi(cityName) {
  return new Promise(function (resolve, reject) {
    fetch(
      //forecastData API for everything excluding uv index
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=045656fed699b763d7b54a4eb7137c4e&units=imperial`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (forecastData) {
        var lat = forecastData.city.coord.lat;
        var lon = forecastData.city.coord.lon;

        fetch(
          //onecalldata api for uv index and 5-day Forecast
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
  getWeatherData(cityText.val());
  // check for repeat
  searchedCities.push(cityText.val());
  count = 0;
  // if array is too long, cut it down if higher than specifized number, splice method
  localStorage.setItem("City Name", JSON.stringify(searchedCities));
});

function getWeatherData(cityName) {
  getApi(cityName).then(function (data) {
    console.log(data);

    // current city weather data
    $("#city").text(
      `City: ${data.forecastData.city.name} (${moment().format("M/D/YYYY")})`
    );
    $("#temp").text(`Temp: ${data.oneCallData.current.temp} ºF`);
    $("#wind").text(`Wind: ${data.oneCallData.current.wind_speed} mph`);
    $("#humidity").text(`Humidity: ${data.oneCallData.current.humidity} %`);
    //
    var uvEl = $("#UV-index");
    var uv = data.oneCallData.current.uvi;
    uvEl.text(`UV Index: ${uv}`);
    uvEl = uvEl.next();
    if (uv < 6) {
      uvEl.addClass("favorable");
      uvEl.removeClass("severe");
      uvEl.removeClass("moderate");
    } else if (uv > 7) {
      uvEl.addClass("severe");
      uvEl.removeClass("favorable");
      uvEl.removeClass("moderate");
    } else {
      uvEl.addClass("moderate");
      uvEl.removeClass("favorable");
      uvEl.removeClass("severe");
    }

    showButtons();

    // 5-day forecast data
    fiveDay.each((index, element) => {
      element = $(element);
      index = index;

      element.empty(); // empty() removes all of the present content inside of the fiveDay div from the palceholder-html

      var dateDiv = $("<div>");
      dateDiv.text(`Date: ${moment().add(index, "days").format("M/D/YYYY")}`);
      element.append(dateDiv);

      var tempDiv = $("<div>");
      tempDiv.text(`Temp: ${data.forecastData.list[index].main.temp} ºF`);
      element.append(tempDiv);

      var windDiv = $("<div>");
      windDiv.text(`Wind: ${data.forecastData.list[index].wind.speed} Mph`);
      element.append(windDiv);

      var humidityDiv = $("<div>");
      humidityDiv.text(
        `Humidity: ${data.forecastData.list[index].main.humidity}%`
      );
      element.append(humidityDiv);

      var imgEl = document.createElement("img");

      imgEl.setAttribute(
        "src",
        `http://openweathermap.org/img/w/${data.forecastData.list[index].weather[0].icon}.png`
      );

      element.append(imgEl);

      var descriptionDiv = $("<div>");
      descriptionDiv.text(
        `${data.forecastData.list[index].weather[0].description}`
      );
      element.append(descriptionDiv);
    });
  });
}

function showButtons() {
  historyUl.empty();
  for (var i = 0; i < searchedCities.length; i++) {
    var liBtn = $(`
    <li>
    <button type="button" data-city="los-angeles" class="btnCity" padding: 5px;>
      ${searchedCities[i]}
    </button>
  </li>`);
    historyUl.append(liBtn);

    if (searchedCities.length > 8) {
      searchedCities.splice(i, 1);
    }
  }
}

historyUl.on("click", "button", function () {
  console.log($(this).text());
  var cityName = $(this).text();
  getWeatherData(cityName);
});
