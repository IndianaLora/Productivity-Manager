let longitude;
let latitude;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");
const kelvin = 273;

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const apiKey = "95da92b8c449789a452b9fc1b261949";

            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&` +
                `lon=${longitude}&appid=6d055e39ee237af35ca066f35474e9df`;

            fetch(url).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                temperature.textContent = "Temperature: " +
                    Math.floor(data.main.temp - kelvin) + "°C";
                summary.textContent = data.weather[0].description;
                loc.textContent = "Country: "+ data.sys.country;
            })
        })
    }

})