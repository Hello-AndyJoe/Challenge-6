var locationData = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=0d26533ff6995761db8d5944c14153d7";

var userLat;
var userLon;

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
  }
  })

var weatherData = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=0d26533ff6995761db8d5944c14153d7";
// weatherData = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=0d26533ff6995761db8d5944c14153d7";
weatherData = "http://api.openweathermap.org/data/2.5/forecast?lat=51.51&lon=-0.13&appid=ab9dfa77307a71dc3740fa52ba330885";

fetch(weatherData)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (i=0; i < 40; i+=8) {
      var tempK = data.list[i].main.temp;
      var tempF = (((tempK - 273.15) * (9 / 5) + 32));

      console.log(data);
      console.log(data.city.name);
      console.log(data.list[i].dt_txt);
      console.log(data.list[i].wind.speed + " Wind");
      console.log(data.list[i].main.humidity + "%");
      console.log(tempK + " K");
      console.log(tempF + " F");
  }
  })