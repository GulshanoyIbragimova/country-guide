const searchBtn = document.getElementById("search_btn");
const searchInput = document.getElementById("search_input");
const countryHtml = document.querySelector("#country");

searchBtn.addEventListener("click", () => {
  const countryName = searchInput.value;
  const api = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  getCountries(api)
    .then((data) => {
      updateUI(data[0]);
    })
    .catch(() => {
      if (countryName.length === 0) {
        country.innerHTML = `<h3>The input field cannot be empty</h3>`;
      } else {
        country.innerHTML = `<h3>Please enter a valid country name.</h3>`;
      }
    });
});

//promise
function getCountries(resource) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status == 200) {
        const data = JSON.parse(request.responseText);
        resolve(data);
      } else if (request.readyState === 4) {
        reject();
      }
    });
    request.open("GET", resource);
    request.send();
  });
}

const updateUI = (country) => {
  countryHtml.innerHTML = `<img src="${country.flags.svg}" class="flag-img">
    <h2>${country.name.common}</h2>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Capital:</h4>
            <span>${country.capital[0]}</span>
        </div>
    </div>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Continent:</h4>
            <span>${country.continents[0]}</span>
        </div>
    </div>
     <div class="wrapper">
        <div class="data-wrapper">
            <h4>Population:</h4>
            <span>${country.population}</span>
        </div>
    </div>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Currency:</h4>
            <span>${
              country.currencies[Object.keys(country.currencies)].name
            } - ${Object.keys(country.currencies)[0]}</span>
        </div>
    </div>
     <div class="wrapper">
        <div class="data-wrapper">
            <h4>Common Languages:</h4>
            <span>${Object.values(country.languages)
              .toString()
              .split(",")
              .join(", ")}</span>
              </div>`;
};
