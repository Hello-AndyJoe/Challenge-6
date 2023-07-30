var searchedCity;
var searchedCities = [];

var userLat;
var userLon;

// Get the user input for city search and push it to array
function getCityInput() {
  searchedCity = document.getElementById("city-search").value;

  if (searchedCity === null || searchedCity === undefined || searchedCity.length <= 0) {
    return; // Prevents from pushing empty input
  } else {
    if (searchedCities.length > 5) {
      searchedCities.shift();// limits the search history buttons to six buttons
    }
    searchedCities.push(searchedCity);
    document.getElementById('search-history').innerHTML = "";
    saveCityHistory();
    loadCityHistory();
    loadCity();
  }
}

// Load the value of the user input and use to fetch City location via longitude and latitude
function loadCity() {
  document.getElementById("city-results").innerHTML = "";
  document.getElementById("weather-results").innerHTML = "";

  console.log(searchedCity);
  console.log(searchedCities);

  var locationData = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + "&limit=5&appid=0d26533ff6995761db8d5944c14153d7";
  console.log(locationData);

  fetch(locationData)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      userLat = data[0].lat;
      userLon = data[0].lon;

      console.log("cities", data);
      console.log(data[0].name + ", " + data[0].state);
      console.log(userLat);
      console.log(userLon);
// Render the name of the first result of the searched city input
      var cityResults = document.getElementById("city-results");
      var cityResultsDiv = document.createElement("div");
      cityResultsDiv.setAttribute("id", "current-day");
      var cityResultsName = document.createElement("h2");
      cityResults.append(cityResultsDiv);
      cityResultsName.textContent = data[0].name + ", " + data[0].state;
      cityResultsDiv.append(cityResultsName);
      
      getCurrentWeather();
      getForecastWeather();
    })
};

// Use the longitude and latitude data found from loadCity function to get current weather conditions of selected city
function getCurrentWeather() {
  var currentWeatherData = "https://api.openweathermap.org/data/2.5/weather?lat=" + userLat + "&lon=" + userLon + "&appid=ab9dfa77307a71dc3740fa52ba330885";

  fetch(currentWeatherData)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var tempK = data.main.temp;
      var tempF = (((tempK - 273.15) * (9 / 5) + 32));
      var tempFRounded = Math.round(tempF * 100) / 100;// Turn Kelvin tempature into Fahrenheit.
      var weatherCond = data.weather[0].main;
      if (weatherCond === "Clear") {// Match weather conditions with icons to display.
        weatherCond = "Clear \u{2600}";
      } else if (weatherCond === "Clouds") {
        weatherCond = "Clouds \u{2601}";
      } else if (weatherCond === "Rain" || weatherCond === "Drizzle") {
        weatherCond = "Rain \u{1F327}";
      } else if (weatherCond === "Thunderstorm") {
        weatherCond = "Thunderstorm \u{1F329}";
      } else if (weatherCond === "Snow") {
        weatherCond = "Snow \u{2603}";
      } else {
        weatherCond = weatherCond + " \u{1F32B}";
      }
// Display current weather conditions
      console.log("test", data);
      var currentDayWeather = document.getElementById('current-day');
      var currentDayWeatherTemp = document.createElement("p");
      var currentDayWeatherWind = document.createElement("p");
      var currentDayWeatherHumi = document.createElement("p");
      var currentDayWeatherCond = document.createElement("p");
      currentDayWeatherWind.textContent = "Wind: " + data.wind.speed + " MPH";
      currentDayWeatherHumi.textContent = "Humidity: " + data.main.humidity + "%";
      currentDayWeatherCond.textContent = weatherCond;
      currentDayWeatherTemp.textContent = tempFRounded + " F";
      currentDayWeather.append(currentDayWeatherWind, currentDayWeatherHumi, currentDayWeatherCond, currentDayWeatherTemp);
    })
};

//  Use the longitude and latitude data found from loadCity function to get forecasted weather conditions of selected city
function getForecastWeather() {      
  var weatherData = "https://api.openweathermap.org/data/2.5/forecast?lat=" + userLat + "&lon=" + userLon + "&appid=ab9dfa77307a71dc3740fa52ba330885";

  fetch(weatherData)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        for (i=7; i < 47; i+=8) {
          var tempK = data.list[i].main.temp;
          var tempF = (((tempK - 273.15) * (9 / 5) + 32));
          var tempFRounded = Math.round(tempF * 100) / 100;
          var weatherCond = data.list[i].weather[0].main;
          //https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
          if (weatherCond === "Clear") {
            weatherCond = "Clear \u{2600}";
          } else if (weatherCond === "Clouds") {
            weatherCond = "Clouds \u{2601}";
          } else if (weatherCond === "Rain" || weatherCond === "Drizzle") {
            weatherCond = "Rain \u{1F327}";
          } else if (weatherCond === "Thunderstorm") {
            weatherCond = "Thunderstorm \u{1F329}";
          } else if (weatherCond === "Snow") {
            weatherCond = "Snow \u{2603}";
          } else {
            weatherCond = weatherCond + " \u{1F32B}";
          }

          console.log(data);
          console.log(data.city.name);
          console.log(data.list[i].dt_txt);
          console.log(data.list[i].wind.speed + " MPH");
          console.log(data.list[i].main.humidity + "%");
          console.log(data.list[i].weather[0].main);
          console.log(tempK + " K");
          console.log(tempF);
// Display forecasted weather conditions
          var weatherResults = document.getElementById("weather-results");
          var weatherResultsDiv = document.createElement("div");
          var weatherResultsDate = document.createElement("h2");
          var weatherResultsTemp = document.createElement("p");
          var weatherResultsWind = document.createElement("p");
          var weatherResultsHumi = document.createElement("p");
          var weatherResultsCond = document.createElement("p");
          weatherResultsDate.textContent = data.list[i].dt_txt;
          weatherResultsWind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
          weatherResultsHumi.textContent = "Humidity: " + data.list[i].main.humidity + "%";
          weatherResultsCond.textContent = weatherCond;
          weatherResultsTemp.textContent = tempFRounded + " F";
          weatherResults.append(weatherResultsDiv);
          weatherResultsDiv.append(weatherResultsDate, weatherResultsWind, weatherResultsHumi, weatherResultsCond, weatherResultsTemp);
        }
    })
};

// Save array that had the city value pushed to it to localstorage
function saveCityHistory() {
  localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
};

// Load the array as it's updated
function loadCityHistory() {
  var saveSearchedCities = JSON.parse(localStorage.getItem("searchedCities"));

  if (saveSearchedCities === null || saveSearchedCities === undefined || saveSearchedCities.length <= 0) {
    searchedCities = [];
  } else {
    searchedCities = saveSearchedCities;
// Creates the search history buttons and pushes their value to the search input when click and finds the weather information again
    for(var i = 0; i < searchedCities.length; i++ ) {
      var cityButton = document.createElement('button');
      cityButton.textContent =  searchedCities[i];
      cityButton.setAttribute("value", searchedCities[i]);
      cityButton.addEventListener("click", function(event) {
        cityValue = event.target.value;
        console.log(cityValue);
        searchedCity = cityValue;
        loadCity();
    });
      document.getElementById('search-history').append(cityButton);
    }
}
};
// Load search history buttons when page loads
loadCityHistory();