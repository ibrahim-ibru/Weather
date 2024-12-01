
function getWeather() {

    document.getElementById("inp").addEventListener("change", (e) => {
        console.log(e.target.value);
        const place = e.target.value;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=53f355b87d8de75e257515a6667aabe7`).then(res => res.json()).then((data) => {
            console.log(data);
            icon = data.weather[0].main
            console.log(icon);
            
            str = `
        <div class="current-weather">
        
        <h1>${data.name}</h1>
        <h2>${data.weather[0].main}</h2>
        <p class="temp">${tempConv(data.main.temp)}°C</p>
        <p>Feels like : ${tempConv(data.main.feels_like)}°C</p>
        </div>
        <div class="extra-details">
        <p>Pressure : ${data.main.pressure} mb</p>
        <p>Humidity : ${data.main.humidity}%</p>
        <p>Wind : ${((data.wind.speed) * 3.6).toFixed(2)} km/h</p>
        <p>Visibility : ${((data.visibility) / 1000).toFixed(2)} km</p>
        
        <p>Sunrise : ${sunTime(data.sys.sunrise)} am</p>
        <p>Sunset : ${sunTime(data.sys.sunset)} pm</p>
        </div>
        </div>
        `
            document.getElementById("weather-display").innerHTML = str
            document.getElementById("weather-display").style.backgroundImage = `url("/images/${icon}.jpg")`
            document.getElementById("inp").value = ""
        })

    })
}
getWeather()

function tempConv(temp) {
    temp = temp - 273.15
    return temp.toFixed(1);
}

function sunTime(timestamp) {

    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert to milliseconds
    return date.toLocaleString().substring(10, 15)
}

