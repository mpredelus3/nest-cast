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
        fetchWeather(park.latitude, park.longitude);
    })
    // error message if the api doesn't connect
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

// displays images of the park
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

// pulls the weather info from the openweather api
function fetchWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`)
        .then(response => response.json())
        .then(weather => {
            displayWeatherDetails(weather);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error)
        });
}

// appends the weather info to the page
function displayWeatherDetails(weather) {
    const weatherDetailsDiv = document.getElementById("weatherDetails");
    const weatherDetailsBlock = document.createElement("div");
    if (weather.main && weather.weather && weather.weather.length > 0) {
        weatherDetailsBlock.innerHTML = `
                <h4 class="title">Current Weather:</h4>
                <p><strong>Temperature:</strong> ${weather.main.temp} °F</p>
                <p><strong>Weather:</strong> ${weather.weather[0].main} (${weather.weather[0].description})</p>
            `;
    } else {
        weatherDetailsBlock.textContent = "Weather data not available.";
    }

    weatherDetailsDiv.appendChild(weatherDetailsBlock);
}