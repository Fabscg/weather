
//API from Openweather.org to get the weather information
var API_KEY = '76334fb565ccac56bd005e0842cc18b5'

//Global variables
var searchedCity = document.querySelector('#search-bar')
var searchBtn = document.querySelector('#search-button')
var searchHistoryContainer = document.querySelector('#search-history')

//Added eventListener to Search Button

searchBtn.addEventListener('click', getCity)

function getCity(event) {
    event.preventDefault()
    var currentCity = searchedCity.value
    getCurrent(currentCity)
    saveToStorage(currentCity)
}

//Funtion to to storage the history of the user (A city that was searched before will appeard in the screen, without the user having to type again)

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

            //Added eventListener for the history butto

            historyBtn.addEventListener('click', function (event) {
                getCurrent(event.target.id)
                
            })

            
        
        }
    }
}
//calling the function for the search history
getCurrentHistory()

//function that fetch the API from the weather site

function getCurrent(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + API_KEY + '&units=metric')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {

            //varibales that define the longitude and latitude to be able to search for the daily data

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

//five day forecast function 

function fiveDayForecast(lat, lon) {

    //fetch the API  for daily weather using lat and lon
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + API_KEY + '&units=metric')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log('5 day', data)


            document.querySelector('#uv').textContent = 'UV: ' + data.current.uvi
            $("#uv").addClass('uvIndex')
            var uviIndex = document.querySelector('uvIndex')

            //created a for-loop to get the weathr information from each day counting only 5 days

            document.querySelector('.five-days-forecast').textContent = ''
            for (var i = 0; i < 5; i++) {

                // created a card to put the weather information througth the Script folder and not throught html
                // then seeting an attribute with class name for each card and last one, append  all this to the div 'card'

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
}s