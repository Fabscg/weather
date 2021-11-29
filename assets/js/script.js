var API_KEY = '76334fb565ccac56bd005e0842cc18b5'
var searchedCity = document.querySelector('#search-bar')
var searchBtn = document.querySelector('#search-button')





searchBtn.addEventListener('click', getCity)

function getCity(e) {
    e.preventDefault()
    var currentCity = searchedCity.value
    getCurrent(currentCity)
}

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

            var iconImage = document.querySelector('#img')
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

            

                var fiveDayWind = document.createElement('p')
                fiveDayWind.textContent = 'Wind: ' + data.daily[i].wind_speed + 'MPH'
                card.append(fiveDayWind)

                var fiveDayHumidity = document.createElement('p')
                fiveDayHumidity.textContent = 'Humidity:' + data.daily[i].humidity + '%'
                card.append(fiveDayHumidity)



            }
        })

        function getIcon(){
            fetch( "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + "@2x.png")
            .then(function (response) {
                return response.json()
            })
            .then(function(data){
                console.log(getIcon);
            })
            
            // var iconImage =
            //     var icon = document.querySelector('img').setAttribute("src", iconImage)
            //     card.append(icon)
        }
}