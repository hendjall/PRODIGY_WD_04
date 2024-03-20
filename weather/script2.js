document.getElementById('search-button').addEventListener('click', searchWeather);
document.getElementById('geolocation-button').addEventListener('click', useGeolocation);

function searchWeather() {
    const locationInput = document.getElementById('location-input').value;
    fetchWeather(locationInput);
}

function useGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchWeather(`${latitude},${longitude}`);
        }, error => {
            console.error('Error getting geolocation:', error);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function fetchWeather(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    weatherDisplay.innerHTML = '';

    const locationElement = document.createElement('div');
    locationElement.classList.add('location');
    locationElement.textContent = `${data.name}, ${data.sys.country}`;

    const conditionsElement = document.createElement('div');
    conditionsElement.classList.add('conditions');
    conditionsElement.textContent = data.weather[0].description;

    const temperatureElement = document.createElement('div');
    temperatureElement.classList.add('temperature');
    temperatureElement.textContent = `${data.main.temp}°C`;

    const otherInfoElement = document.createElement('div');
    otherInfoElement.classList.add('other-info');
    otherInfoElement.textContent = `Humidity: ${data.main.humidity}%, Wind Speed: ${data.wind.speed} m/s`;

    weatherDisplay.appendChild(locationElement);
    weatherDisplay.appendChild(conditionsElement);
    weatherDisplay.appendChild(temperatureElement);
    weatherDisplay.appendChild(otherInfoElement);
}
