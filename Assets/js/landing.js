const API_KEY = 'U0SqW35wEiSrMcVOGMHfmtu2p4WMQaJgZZU6rAG1';
// Fetch park details using park code
const urlParams = new URLSearchParams(window.location.search);
// Extract park code from URL parameters
const parkCode = urlParams.get('parkCode');
const weatherApi = 'https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial'

// Fetch park details using park code
fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        const park = data.data[0]; // Assuming only one park is returned
        // Populate the page with park details
        const parkDetailsDiv = document.getElementById("parkDetails");
        const parkDetailsBlock = document.createElement("div");
        parkDetailsBlock.innerHTML = `
                    <h2>${park.fullName}</h2>
                    <p><strong>Directions Info:</strong> ${park.directionsInfo}</p>
                    <p><strong>Address:</strong> ${park.addresses[0].line1}, ${park.addresses[0].city}, ${park.addresses[0].stateCode} ${park.addresses[0].postalCode}</p>

                    <p><strong>Latitude:</strong> ${park.latitude}, <strong>Longitude:</strong> ${park.longitude}</p>
                    <p><strong>Weather Info:</strong> ${park.weatherInfo}</p>
                    <!-- Add more details as needed -->
                `;
        parkDetailsDiv.appendChild(parkDetailsBlock);

        fetchWeather(park.latitude, park.longitude);
    })
    .catch(error => {
        console.error('Error fetching park data:', error);
    });

    function fetchWeather(lat,lon) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApi}&units=imperial`)
        .then(response => response.json())
        .then(weather => {
            displayWeatherDetails(weather);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error)
        });
    }

    function displayWeatherDetails(weather) {
        const weatherDetailsDiv = document.getElementById("weatherDetails");
        const weatherDetailsBlock = document.createElement("div");
        if (weather.main && weather.weather && weather.weather.length > 0) {
            weatherDetailsBlock.innerHTML = `
                <h4>Current Weather:</h4>
                <p>Temperature: ${weather.main.temp} °F</p>
                <p>Weather: ${weather.weather[0].main} (${weather.weather[0].description})</p>
            `;
        } else {
            weatherDetailsBlock.textContent = "Weather data not available.";
        }
    
    weatherDetailsDiv.appendChild(weatherDetailsBlock);
    }