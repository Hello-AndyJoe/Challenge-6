var searchedCity;
var userLat;
var userLon;

function getCity() {
  searchedCity = document.getElementById("city-search").value;

console.log(searchedCity);

//var locationData = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=0d26533ff6995761db8d5944c14153d7";
var locationData = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + "&limit=5&appid=0d26533ff6995761db8d5944c14153d7";

console.log(locationData);

fetch(locationData)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (i=0; i < data.length; i++) {
    console.log(data[i].name + ", " + data[i].state);
    userLat = data[i].lat;
    console.log(userLat);
    userLon = data[i].lon;
    console.log(userLon);
    
  // var weatherData = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=0d26533ff6995761db8d5944c14153d7";
var weatherData = "http://api.openweathermap.org/data/2.5/forecast?lat=" + userLat + "&lon=" + userLon + "&appid=ab9dfa77307a71dc3740fa52ba330885";

fetch(weatherData)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
      var tempK = data.list[0].main.temp;
      var tempF = (((tempK - 273.15) * (9 / 5) + 32));

      console.log(data);
      console.log(data.city.name);
      console.log(data.list[0].dt_txt);
      console.log(data.list[0].wind.speed + " Wind");
      console.log(data.list[0].main.humidity + "%");
      console.log(data.list[0].weather[0].main);
      console.log(tempK + " K");
      console.log(tempF + " F");
  })

fetch(weatherData)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (i=5; i < 45; i+=8) {
      var tempK = data.list[i].main.temp;
      var tempF = (((tempK - 273.15) * (9 / 5) + 32));

      console.log(data);
      console.log(data.city.name);
      console.log(data.list[i].dt_txt);
      console.log(data.list[i].wind.speed + " Wind");
      console.log(data.list[i].main.humidity + "%");
      console.log(data.list[i].weather[0].main);
      console.log(tempK + " K");
      console.log(tempF + " F");
  }
  })
  }
})
}