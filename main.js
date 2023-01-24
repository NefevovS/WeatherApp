const apiKey = "7660607a005c4aaa9d2112804232401";

const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");
const header = document.querySelector(".header");

form.onsubmit = (e) => {
  let city;
  e.preventDefault();
  city = input.value.trim();
  const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  fetch(query)
    .then((responce) => {
      return responce.json();
    })
    .then((data) => {
      console.log(data);

      if (data.error) {
        const html = `<div class="card">${data.error.message}</div>`;
        header.insertAdjacentHTML("afterend", html);
      } else {
        const prevCard = document.querySelector(".card");
        if (prevCard) prevCard.remove();

        const html = `<div class="card">
      <div class="card-city">
        ${data.location.name} <span>${data.location.country}</span>
      </div>
      <div class="card-weather">
        <div class="card-value">${data.current.temp_c}</div>
        <div class="card-img">
          <img src=${data.current.condition.icon} alt="img" />
        </div>
      </div>
      <div class="card-weather-text">${data.current.condition.text}</div>
    </div>`;
        header.insertAdjacentHTML("afterend", html);
      }
    });
};
