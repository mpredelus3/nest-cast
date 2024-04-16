const API_KEY = 'U0SqW35wEiSrMcVOGMHfmtu2p4WMQaJgZZU6rAG1';
// Fetch park details using park code
const urlParams = new URLSearchParams(window.location.search);
// Extract park code from URL parameters
const parkCode = urlParams.get('parkCode');
const weatherApiKey = '58d09628a194f1e8f1ecf12b1d580c14'

// Fetch park details using park code
fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        const park = data.data[0]; // Assuming only one park is returned
        // Populate the page with park details
        const parkDetailsDiv = document.getElementById("parkDetails");
        const parkDetailsBlock = document.createElement("div");
        parkDetailsBlock.innerHTML = `
                    <h1 class="title">${park.fullName}</h1>
                    <p><strong>Directions Info:</strong> ${park.directionsInfo}</p>
                    <p><strong>Address:</strong> ${park.addresses[0].line1}, ${park.addresses[0].city}, ${park.addresses[0].stateCode} ${park.addresses[0].postalCode}</p>

                    <p><strong>Latitude:</strong> ${park.latitude}, <strong>Longitude:</strong> ${park.longitude}</p>
                    <p><strong>Weather Info:</strong> ${park.weatherInfo}</p>
                    <!-- Add more details as needed -->
                `;
        parkDetailsDiv.appendChild(parkDetailsBlock);

        fetchParkImages(park.parkCode);
        fetchWeatherForecast(park.latitude, park.longitude);
    })
    .catch(error => {
        console.error('Error fetching park data:', error);
    });

function fetchParkImages(parkCode) {
    fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&fields=images&api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {

            const images = data.data[0].images;
            displayParkImages(images);
        })

        .catch(error => {
            console.error('Error fetching park images:', error);

        });

}

function displayParkImages(images) {
    const imageContainer = document.getElementById("parkImages");
    images.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.onload = function() {

            imgElement.alt = image.altText;
        };
        imgElement.onerror = function() {
            imgElement.alt = "";
        };
        imgElement.src = image.url;

        imgElement.style.width = "50%";
        imgElement.style.height = "auto";

        imageContainer.appendChild(imgElement);
    })
}

function fetchWeatherForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`)
        .then(response => response.json())
        .then(forecast => {
            displayWeatherForecast(forecast);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error)
        });
}

function displayWeatherForecast(forecast) {
    const weatherForecastDiv = document.getElementById("weatherForecast");
    weatherForecastDiv.innerHTML = "";

    for (let i = 0; i < forecast.list.length; i += 8) {
        const forecastData = forecast.list[i];

        const forecastDate = new Date(forecastData.dt * 1000);

        const forecastDetailsBlock = document.createElement("div");
        forecastDetailsBlock.innerHTML = `
        <h4 class="title">Forecast for ${forecastDate.toDateString()}:</h4>
        <p><strong>Temperature:</strong> ${forecastData.main.temp} °F</p>
        <p><strong>Weather:</strong> ${forecastData.weather[0].main} (${forecastData.weather[0].description})</p>
    `;
    weatherForecastDiv.appendChild(forecastDetailsBlock);
    }   
}
