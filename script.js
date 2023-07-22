var locationData = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=0d26533ff6995761db8d5944c14153d7";

fetch(locationData)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (i=0; i < data.length; i++) {
    console.log(data[i].name + ", " + data[i].state);
    console.log(data[i].lat);
    console.log(data[i].lon);
  }
  })

var weatherData = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=0d26533ff6995761db8d5944c14153d7";
// var weatherData = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";

fetch(weatherData)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (i=0; i < 40; i+=8) {
      console.log(data);
  }
  })