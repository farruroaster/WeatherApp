document.getElementById('getWeatherButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    getWeatherByCity(city);
    getForecast(city);
});

function getWeatherByCity(city) {
    const apiKey = 'a81872aa67d64257b43172845251003'; // Your API key
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error.message);
            }
            document.getElementById('weatherDisplay').innerHTML = `
                <h2>Weather in ${data.location.name}</h2>
                <p>Temperature: ${data.current.temp_c} °C</p>
                <p>Condition: ${data.current.condition.text}</p>
                <p>Humidity: ${data.current.humidity}%</p>
                <p>Wind Speed: ${data.current.wind_kph} kph</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            document.getElementById('weatherDisplay').innerHTML = '<p>Error fetching weather data.</p>';
        });
}

// New function to get weather by current location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const apiKey = 'a81872aa67d64257b43172845251003'; // Your API key
            const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        throw new Error(data.error.message);
                    }
                    document.getElementById('weatherDisplay').innerHTML = `
                        <h2>Weather at Your Location</h2>
                        <p>Temperature: ${data.current.temp_c} °C</p>
                        <p>Condition: ${data.current.condition.text}</p>
                        <p>Humidity: ${data.current.humidity}%</p>
                        <p>Wind Speed: ${data.current.wind_kph} kph</p>
                    `;
                })
                .catch(error => {
                    console.error('Error fetching weather:', error);
                    document.getElementById('weatherDisplay').innerHTML = '<p>Error fetching weather data.</p>';
                });
        }, () => {
            alert('Unable to retrieve your location. Please check your browser settings.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Modify the existing function to include a button for current location
function setupCurrentLocationButton() {
    const currentLocationButton = document.createElement('button');
    currentLocationButton.innerHTML = '<i class="bi bi-geo-alt"></i> Current Location Weather';
    currentLocationButton.className = 'btn btn-secondary';
    currentLocationButton.addEventListener('click', getWeatherByLocation);
    document.querySelector('.input-group').appendChild(currentLocationButton);
}

// Call the setup function to add the button
setupCurrentLocationButton();

function getForecast(city) {
    const apiKey = 'a81872aa67d64257b43172845251003'; // Your API key
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`; // Update to use the correct endpoint
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the data to check the structure
            displayForecast(data);
        })
        .catch(error => console.error('Failed to fetch forecast:', error));
}

function displayForecast(data) {
    const forecast = data.forecast.forecastday;
    let content = '';
    forecast.forEach(day => {
        content += `
            <div class="forecast-day">
                <h4>${new Date(day.date).toLocaleDateString()}</h4>
                <p>Max Temp: ${day.day.maxtemp_c}°C, Min Temp: ${day.day.mintemp_c}°C</p>
                <img src="${day.day.condition.icon}" alt="Weather icon" />
                <p>${day.day.condition.text}</p>
            </div>
        `;
    });
    document.getElementById('forecastDisplay').innerHTML = content;
}
