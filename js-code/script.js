const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherData = document.getElementById('weatherData');

searchBtn.addEventListener('click', searchWeather);

function searchWeather() {
    const city = cityInput.value;
    const apiKey = 'b9a8702820d1632ce97ca8a0c21f4760';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const { name, main, weather } = data;
            const temperature = main.temp;
            const description = weather[0].description;
            const humidity = main.humidity;
            const windSpeed = data.wind.speed;

            const weatherInfo = `
                <h3>${name}</h3>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            `;

            weatherData.innerHTML = weatherInfo;
        })
        .catch(error => {
            weatherData.innerHTML = `<p>${error.message}</p>`;
        });
}
