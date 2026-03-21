"use strict";

// variables for data taken from DOM and for rendering to DOM
const inputForm = document.getElementById("inputForm");
const cityInput = document.getElementById("cityInput");
// const dateInput = document.getElementById("dateInput");
const outputDiv = document.getElementById("output");
const btnF = document.getElementById("btnF");
const btnC = document.getElementById("btnC");
const baseURL = "https://api.weatherapi.com/v1";

console.log("Loading app.js");

//fetch function, awaits data from API so must be async, async must have trycatch

async function getKey() {
  try {
    //need to define it as a POST request, create options object
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    };
    const res = await fetch(
      "https://proxy-key-0udy.onrender.com/get-key3",
      options,
    );
    if (!res.ok) {
      throw new Error("Bad key fetch.");
    }

    const { key } = await res.json();
    // console.log("WeatherAPI.com API key: " + key);
    return key;
  } catch (error) {
    console.log("Unable to get key.");
  }
}

async function getWeather(locationInput) {
  try {
    const apiKey = await getKey();
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = baseURL + "/current.json?key=" + apiKey + "&q=" + locationInput;
    const res = await fetch(url, options);
    console.log(res);
    if (!res.ok) {
      renderError();
      throw new Error("Didn't get data");
    }
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

function renderLoading() {
  outputDiv.innerHTML = "";
  const p = document.createElement("p");
  p.textContent = "Loading...";
  outputDiv.appendChild(p);
}

function renderF(weatherData) {
  outputDiv.innerHTML = "";
  const city = document.createElement("p");
  const country = document.createElement("p");
  const tempF = document.createElement("p");
  const condition = document.createElement("p");
  const img = document.createElement("img");

  city.textContent = "City: " + weatherData.location.name;
  country.textContent = "Country: " + weatherData.location.country;
  tempF.textContent = "Current Temp: " + weatherData.current.temp_f + "°F";
  condition.textContent =
    "Current Conditions: " + weatherData.current.condition.text;
  img.src = weatherData.current.condition.icon;
  img.alt = weatherData.current.condition.text;

  outputDiv.appendChild(city);
  outputDiv.appendChild(country);
  outputDiv.appendChild(tempF);
  outputDiv.appendChild(condition);
  outputDiv.appendChild(img);
}

function renderC(weatherData) {
  outputDiv.innerHTML = "";
  const city = document.createElement("p");
  const country = document.createElement("p");
  const tempF = document.createElement("p");
  const condition = document.createElement("p");
  const img = document.createElement("img");

  city.textContent = "City: " + weatherData.location.name;
  country.textContent = "Country: " + weatherData.location.country;
  tempF.textContent = "Current Temp: " + weatherData.current.temp_c + "°F";
  condition.textContent =
    "Current Conditions: " + weatherData.current.condition.text;
  img.src = weatherData.current.condition.icon;
  img.alt = weatherData.current.condition.text;

  outputDiv.appendChild(city);
  outputDiv.appendChild(country);
  outputDiv.appendChild(tempF);
  outputDiv.appendChild(condition);
  outputDiv.appendChild(img);
}

function renderError() {
  outputDiv.innerHTML = "";
  const p = document.createElement("p");
  p.textContent = "Enter a valid City Name or US/UK/Canadian Postal Code.";
  outputDiv.appendChild(p);
}

function clearField() {
  cityInput.value = "";
}

//  getWeather()
// main function, calls other function in orderly readable logic block, awaits so much be async, async must have trycatch

async function main() {
  try {
    // event listener to render loading please wait message, get weather data, and render results from form input submit

    btnF.addEventListener("click", async (e) => {
      //prevents refreshing page
      e.preventDefault();
      if (cityInput.value) {
        renderLoading();
        const weatherData = await getWeather(cityInput.value);
        renderF(weatherData);
        clearField();
      } else {
        renderError();
      }
    });
    btnC.addEventListener("click", async (e) => {
      //prevents refreshing page
      e.preventDefault();
      if (cityInput.value) {
        renderLoading();
        const weatherData = await getWeather(cityInput.value);
        renderC(weatherData);
        clearField();
      } else {
        renderError();
      }
    });
  } catch (error) {
    console.log(error);
  }
}

main();
