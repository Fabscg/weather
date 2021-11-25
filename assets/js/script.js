var API_KEY = '76334fb565ccac56bd005e0842cc18b5';


var tempEl = document.querySelector('temp');
var windEl = document.querySelector('wind');
var humidityEl = document.querySelector('humidity');
var uvEl = document.querySelector('uv');

var iconEl = document.querySelector('icon');
var imageURL = 'http://openweathermap.org/img/wn/10d@2x.png';
console.log();

var searchBtn = document.getElementById('search-button')

function getCity(e) {
    e.preventDefault()
    var city = document.getElementById('search-bar').value
    getCurrentWeather(city)

}


function setPosition() {
    var latitude = position.coords.latitude;
    var longitude = position.coord.longitude;
    getCurrentWeather(latitude, longitude)
}


searchBtn.addEventListener('click', getCity)



function getCurrentWeather(weather) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + weather + '&appid=' + API_KEY + '&units=metric')
        .then((response) => response.json())
        .then(function (data) {


            var cityName = document.querySelector("#city-name");
            cityName.textContent = (data);
            console.log(data);

            weather.humidity = data.main[0].humidity;
            uvEl.innerHTML = weather.coord[0].lon + lat;
            weather.wind = data.wind[0].speed;

            weather.icon = data.weather[0].icon;
            imageURL = 'http://openweathermap.org/img/wn/' + iconEl + '@2x.png';
            console.log(imageURL);
        })

}


function displayWeather() {
    iconEl.innerHTML = '<img scr= "icons/weather.icon.png"/>'
    tempEl = document.querySelector('temp');
    windEl = document.querySelector('wind');
    humidityEl = document.querySelector('humidity');
    uvEl = document.querySelector('uv');

 console.log(city);
}

