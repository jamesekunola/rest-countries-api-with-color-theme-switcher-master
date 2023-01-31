//
const detailCard = document.querySelector(".details-card");
// event listners
window.addEventListener("DOMContentLoaded", () => {
  toggleFliterBox();
  setCountriesData();
});

// function
function toggleFliterBox() {
  const box = document.querySelector(".box");
  const showFliterBtn = document.querySelector(".filter-title");

  showFliterBtn.addEventListener("click", () => {
    box.classList.toggle("active");
  });
}

function setCountriesData() {
  fetch("https://restcountries.com/v2/all")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("error");
      }
    })
    .then((data) => {
      // display country details by selected region
      displaySelectedContinents(data);

      // display all country details
      displayAllCountriesDetails(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayAllCountriesDetails(data) {
  const countriesDetails = data
    .map((det) => {
      return setCountryDetails(det);
    })
    .join("");
  detailCard.innerHTML = countriesDetails;
}

function displaySelectedContinents(data) {
  const btns = document.querySelectorAll(".box button");

  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const selectedRegion = e.currentTarget.dataset.id;

      // if btn selected equals all, display all countries details
      if (selectedRegion === "All") {
        displayAllCountriesDetails(data);
        return;
      }

      const fliterRegion = data.filter((reg) => {
        if (reg.region === selectedRegion) {
          return reg;
        }
      });

      console.log(fliterRegion);

      const mapItems = fliterRegion
        .map((card) => {
          return setCountryDetails(card);
        })
        .join("");

      detailCard.innerHTML = mapItems;
    });
  });
}

function setCountryDetails(details) {
  return `  <div class="country-box">
  <div class="country-flag">
      <img src=${details.flags.svg} alt="country flag">
  </div>
  <div class="info">
      <h3 class="country-name">${details.name}</h3>
      <p>Population: <span class="pop-number">${details.population}</span></p>
      <p>Region: <span class="region">${details.region}</span></p>
      <p>Capital: <span class="region">${details.capital}</span></p>
  </div>
</div>`;
}
