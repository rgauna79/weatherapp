const baseURL = "https://api.weatherbit.io/v2.0/current";
const APIkey = "fc55ff5809de4bc391b16393b19977b4";

const city = document.getElementById('city');
const country = document.getElementById('country');
const temp = document.getElementById('temp');
const icon = document.querySelector('img');
const feels = document.getElementById('feels');
const weather = document.getElementById('weather');
const btnSubmit = document.getElementById('btn-submit');
const inputSearch = document.getElementById("city-search");




//Event Listener to search Weather
btnSubmit.addEventListener("click", () => {
    getWeatherData(inputSearch.value)
});

//Fetch data from API
async function getWeatherData(data) {
    const searchValue = data;
    try {
        const response = await fetch(`${baseURL}?city=${data}&key=${APIkey}`, { mode: "cors"});

        if (!response.ok){
            throw new Error(`Invalid search, Status: ${response.status}`);
            }
 
        const dataResponse = await response.json();
        
        if (dataResponse.length < 1) {
            throw new Error(`Empty data`);
        }
        updateInfo(dataResponse.data);
        
    } catch (error) {
        console.error("Error: ", error.message)
    }
}

//render the api data in UI
function updateInfo(data) {
    const weatherData = data[0].weather;
    const iconURL = `https://www.weatherbit.io/static/img/icons/${weatherData.icon}.png`
    console.log(data[0]);
    city.textContent = data[0].city_name + ', ' + data[0].state_code;
    temp.textContent = data[0].temp + ' °C';
    feels.textContent = data[0].app_temp;
    country.texContent =  data[0].country_code;
    weather.textContent = weatherData.description;
    icon.src = iconURL;
}

 document.addEventListener("DOMContentLoaded", () => {
//   getWeatherData("Springville");  
    document.getElementById('currentYear').textContent = new Date().getFullYear();
 });