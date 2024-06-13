// Select HTML elements and store them in separate variables
const searchBar = document.querySelector('.search-bar');
const currentLocationButton = document.querySelector('.current-location-button');
const notification = document.querySelector('.notification');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const locationElement = document.querySelector('.location');

// Define constants for app data, unit, and the API key
const apiKey = '6531d758e982092b479eb97ce073026b';
const unit = 'metric';

// Check if the browser supports geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notification.style.display = 'block';
    notification.innerHTML = "<p>Geolocation is not supported by this browser.</p>";
}

// Set the user's position
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

// Show error when there is an issue with geolocation service
function showError(error) {
    notification.style.display = 'block';
    notification.innerHTML = `<p>${error.message}</p>`;
}

// Fetch weather conditions in the searched location
function searchWeather() {
    let city = searchBar.value;
    getWeatherByCity(city);
    searchBar.value = ''; // Clear the search bar after searching
}

// Fetch weather conditions from the API depending on the user's current location
function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
    fetchWeather(api);
}

// Fetch weather conditions by city name
function getWeatherByCity(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    fetchWeather(api);
}

// Fetch weather data from API
function fetchWeather(api) {
    fetch(api)
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
            console.error('There was a problem with your fetch operation:', error);
            notification.style.display = 'block';
            notification.innerHTML = `<p>Failed to fetch weather data. Please try again later.</p>`;
        });
}

// Display weather data to UI
function displayWeather(data) {
    // Display weather data
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    locationElement.textContent = `${data.name}, ${data.sys.country}`;
}

// Event listeners
searchBar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

currentLocationButton.addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
});
