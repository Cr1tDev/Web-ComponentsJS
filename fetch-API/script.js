"use strict";

const countriesContainer = document.querySelector(".countries");
const btn = document.querySelector(".btn-country");

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // Get Location
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getLanguage = function (data) {
  const language = data.languages;
  const key = Object.keys(language);
  return language[key.at(-1)];
};

const getCurrency = function (data) {
  const currency = data.currencies;
  const key = Object.keys(currency);
  return currency[key].name;
};

const renderCountry = function (country, className = "") {
  const data = country;
  console.log(data);

  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.official}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${Number(
              data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${getLanguage(data)}</p>
            <p class="country__row"><span>💰</span>${getCurrency(data)}</p>
          </div>
        </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
};

// display error
const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML("beforeend", msg);
};

// fetch position & country name
const wherAmI = function () {
  getPosition()
    .then((position) => {
      const { latitude: lat, longtitude: lng } = position.coords;

      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
      );
    })
    .then((response) => {
      if (!response)
        throw new Error(`Problem with geocoding(${response.status})`);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return fetch(`https://restcountries.com/v3.1/alpha/${data.countryCode}`);
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Problem with country! ${response.status}`);
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
    })
    .catch((err) => {
      console.error(err);
      renderError(`Something went wrong! ${err.message}. Try again.`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", wherAmI);

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];

//       if (!neighbour) throw new Error('No neighbour found!');

//       // Country 2
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.log(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥 ${err.message}. Try again.`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
