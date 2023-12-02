//Weatherbit API
//const baseURL = "https://api.weatherbit.io/v2.0/current";
//const APIkey = "fc55ff5809de4bc391b16393b19977b4";

//Openweathermap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const APIkey = "659acbb5211e8883c5003a82f58326ef";

const btnSubmit = document.getElementById('btn-submit');
const inputSearch = document.getElementById("city-search");
const switchTemp = document.getElementById("converter");
let isCelsius = false;
let currentTemp = 0;
let currentFeel = 0;


//Conversion Temperature Units
const kelvinToCelsius = (kelvin) => {
  return `${Math.round(kelvin - 273.15)}°`;
};

const kelvinToFahrenheit = (kelvin) => {
  return `${Math.round((kelvin - 273.15) * (9 / 5) + 32)}°`;
};

//Event Listener to switch Celsius/Fahrenheit
switchTemp.addEventListener("click", () => {
    isCelsius = !isCelsius;
    updateTempUnits();
})

//Convert temperatures
const updateTempUnits = () => {
    const tempElements = document.querySelectorAll('.temperature');
    tempElements.forEach((element) => {
        if (isCelsius){
            element.textContent = kelvinToCelsius(currentTemp);
        } else {
            element.textContent = kelvinToFahrenheit(currentTemp);
        }
    })
}


//Event Listener to search Weather
btnSubmit.addEventListener("click", () => {
    getWeatherData(inputSearch.value)
});

//Fecth data from API weathermap
async function getWeatherData(data) {
    const searchValue = data;
    try {
        const response = await fetch(`${baseURL}?q=${data}&limit=5&appid=${APIkey}`, { mode: "cors"});
        
        if (!response.ok) {
            throw new Error(`Invalid search, Status: ${response.status}`);
        }
        
        const dataResponse = await response.json();
        
        if (dataResponse.length < 1) {
             throw new Error(`Empty data`);
        }
        updateInfo(dataResponse);
        
    } catch (error) {
         console.error("Error: ", error.message)
    }
    
    
}

//render the api data in UI
function updateInfo(data) {
    const city = document.getElementById('city');
    const country = document.getElementById('country');
    const temp = document.getElementById('temp');
    const icon = document.querySelector('img');
    const weather = document.getElementById('weather');
    const precip = document.getElementById('prep');
    const feels = document.getElementById('feels');
    const weatherData = data.weather[0];
    currentTemp = data.main.temp;
    currentFeel = data.main.feels_like;
    
    //const iconURL = `https://www.weatherbit.io/static/img/icons/${weatherData.icon}.png`
    
    const iconURL = `https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`
    //console.log(data)
    icon.style.display = "block";
     city.textContent = data.name;
    //+ ', ' + data[0].state_code;
     temp.textContent = currentTemp;
    // country.texContent =  data[0].country_code;
     weather.textContent = weatherData.description;
    // precip.textContent = data[0].precip;
     feels.textContent = currentFeel;
    icon.src = iconURL;
    updateTempUnits();
}

 document.addEventListener("DOMContentLoaded", () => {
    getWeatherData("Springville")
        .then(() => {
            updateTempUnits();
    });  
    refreshTime();
    document.getElementById('currentYear').textContent = new Date().getFullYear();
 });

//Show clock
const clock = document.getElementById("clock");

function refreshTime() {
    let today = new Date()
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    
    m = checkTime(m);
    s = checkTime(s);
    clock.textContent = h + ":" + m + ":" + s + " " + ampm;
    //console.log(clock.innerHTML);
    let t = setTimeout(refreshTime, 1000);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i};
    return i;
}

