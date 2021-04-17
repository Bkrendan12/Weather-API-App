# Weather-API-App

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

/// PROJECT TITLE ///

Current-Weather-Application

/// MOTIVATION //

Tasked with creating a weather application where you can see the current weather as well as a five day forecast for that city. This is something anyone is able to use and is neccessary for anyone looking to make plans for the week depending on weather conditions.

/// SCREENSHOTS ///

/// WEBSITE START ///
![image](https://user-images.githubusercontent.com/59030105/115127007-520bfb00-9fa1-11eb-819c-6f6f547aa718.png)

/// FIRST SEARCH ///
![image](https://user-images.githubusercontent.com/59030105/115126998-4587a280-9fa1-11eb-904a-2391add3f333.png)

/// BUTTONS FROM SEARCH HISTORY LIMITING TO LAST 8 SAVED SEARCHES ///
![image](https://user-images.githubusercontent.com/59030105/115127010-5df7bd00-9fa1-11eb-893d-d0bcf40ed05e.png)

Tech/framework used

This webpage was created using basic html, css, Javascript, moment(), jQuery and OpenWeatherMap API/Fetch.

Built with

--index.html --style.css --script.js --jQuery

How to use?

This is a simple current/weekly weath application for anyone.

When you open the application, you'll see a single input box where you will type in the city you want the current weather for as well as a five-day forecast for the next five days.

When you press enter or use the search button, the current weather will generate to the weather results container.

Underneath the current weather, you will see a five-day forecast for the city you searched.

Every time you make a search, the city will populate underneath the search input as a button.

You can click on each button generated to get the current weather and five-day forecast for the cities you have already searched instead of having to type it out again in the search input.

The application will only allow a user to save up to eight search histroy buttons, so if you enter a nineth city, it will replace the last on your history list.

If you close the browser for any reason, your last eight searched cities will still be in the search history window.

Link to webpage:

[Current-Weather-Application](https://bkrendan12.github.io/Weather-API-App/)

Desired additions: I'd like to add a more visually pleasing style to the page, but for a basic day-to-day planner, it's extremely clean and useful.

Credits include:

All work created and edited by Brendan Kurylo.

UNH Bootcamp © Brendan Kurylo
