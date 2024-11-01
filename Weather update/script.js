const weatherForm = document.querySelector(".city-form");
const cityName = document.querySelector(".cityname");
const apiKey = "6632acc276e8c8facca0f8d63e40b0f0"; // Replace with your actual API key(This API key doesn't work because it is deactivated).
const container = document.querySelector(".container");

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityName.value;
    if(city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch(error) {
            console.error(error);
            displayError("Could not fetch weather data.");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(cityname) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}`;
    const response = await fetch(api);
    if(!response.ok) {
        throw new Error("Could not fetch data");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    container.textContent = "";
    const cityDisplay = document.createElement("p");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descriptionDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descriptionDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("city");
    tempDisplay.classList.add("temperature");
    humidityDisplay.classList.add("humidity");
    descriptionDisplay.classList.add("sky");
    weatherEmoji.classList.add("sun");

    container.appendChild(cityDisplay);
    container.appendChild(tempDisplay);
    container.appendChild(humidityDisplay);
    container.appendChild(descriptionDisplay);
    container.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
    switch(true) {
        case (weatherId >= 200 && weatherId < 300):
            return "🌩️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌁";
        case (weatherId === 800):
            return "🌞";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";//for any unknown changes in weather
    }
}

function displayError(errorMessage) {
    container.textContent = "";
    const errorDisplayMsg = document.createElement("p");
    errorDisplayMsg.textContent = errorMessage;
    errorDisplayMsg.classList.add("error");
    container.appendChild(errorDisplayMsg);
}