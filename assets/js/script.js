var API_KEY = '76334fb565ccac56bd005e0842cc18b5'
var searchedCity = document.querySelector('#search-bar')
var searchBtn = document.querySelector('#search-button')
var searchHistoryContainer = document.querySelector('#search-history')

searchBtn.addEventListener('click', getCity)

function getCity(event) {
    event.preventDefault()
    var currentCity = searchedCity.value
    getCurrent(currentCity)
    saveToStorage(currentCity)
}

function saveToStorage(city) {
    var storage = JSON.parse(localStorage.getItem('weatherHistory'))
    if (storage === null) {
        storage = []
    }
    storage.push(city)
    localStorage.setItem('weatherHistory', JSON.stringify(storage))
    getCurrentHistory()
}

function getCurrentHistory() {
    var currentStorage = JSON.parse(localStorage.getItem('weatherHistory'))
    if (currentStorage === null) {
        searchHistoryContainer.textContent = 'No Current History'
    } else {
        searchHistoryContainer.textContent = ''
        for (var i = 0; i < currentStorage.length; i++) {
            var historyBtn = document.createElement('button')
            historyBtn.setAttribute('id', currentStorage[i])
            historyBtn.textContent = currentStorage[i]
            searchHistoryContainer.append(historyBtn)
            $(historyBtn).addClass('button-history')

            historyBtn.addEventListener('click', function (event) {
                getCurrent(event.target.id)
                
            })

            
        
        }
    }
}

getCurrentHistory()

function getCurrent(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + API_KEY + '&units=metric')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {

            var lat = data.coord.lat
            var lon = data.coord.lon
            fiveDayForecast(lat, lon)

            console.log('current', data);

            document.querySelector('#city-name').textContent = data.name
            document.querySelector('#temp').textContent = 'Temp: ' + data.main.temp + ' °C'
            document.querySelector('#wind').textContent = 'Wind Speed: ' + data.wind.speed + ' MPH'
            document.querySelector('#humidity').textContent = 'Humidity: ' + data.main.humidity
        })
}

function fiveDayForecast(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + API_KEY + '&units=metric')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log('5 day', data)

            document.querySelector('#uv').textContent = 'UV: ' + data.current.uvi

            if (data.current.uvi <= 3) {
                style = "background-color:'green'"
            } else {
                console.log('Happy day');
            }

            document.querySelector('.five-days-forecast').textContent = ''
            for (var i = 0; i < 5; i++) {

                var card = document.createElement('div')
                card.setAttribute('class', 'card-body col-lg-2')
                document.querySelector('.five-days-forecast').append(card)

                var date = document.createElement('h3')
                date.textContent = moment().add(i + 1, 'days').format('MMM Do YY')
                card.prepend(date)

                var fiveDayTemp = document.createElement('p')
                fiveDayTemp.textContent = 'Temp: ' + data.daily[i].temp.day
                card.append(fiveDayTemp)

                var iconImage = document.createElement('img')
                var icon = data.daily[i].weather[0].icon
                iconImage.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
                card.append(iconImage)

                card.append(iconImage)

                var fiveDayWind = document.createElement('p')
                fiveDayWind.textContent = 'Wind: ' + data.daily[i].wind_speed + 'MPH'
                card.append(fiveDayWind)

                var fiveDayHumidity = document.createElement('p')
                fiveDayHumidity.textContent = 'Humidity:' + data.daily[i].humidity + '%'
                card.append(fiveDayHumidity)
            }
        })
}