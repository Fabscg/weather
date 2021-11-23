var API_KEY = '76334fb565ccac56bd005e0842cc18b5'


var searchBtn = document.getElementById('search-button')



searchBtn.addEventListener('click', getCity)

function getCity(e) {
    e.preventDefault()
    var city = document.getElementById('search-bar').value
    console.log(city)
    getCurrentWeather(city)
}

function getCurrentWeather(weather) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + weather + '&appid=' + API_KEY + '&units=imperial')
    .then((response) => response.json())
    .then(function(data) {
        console.log(data);
    })
}