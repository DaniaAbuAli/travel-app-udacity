import "./styles/style.scss";
import './js/app';
import { encodeCity, tripCountdown, tripLength, getCountryInfo, getWeatherForecast, getImage, showData } from './js/app';
import {results} from './js/app'
import { coordinates } from "./js/app";
//get data from the form
window.onload = function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let country = document.getElementById("country").value;
    const travelDate = document.getElementById("travel-date").value;
    const returnDate = document.getElementById("return-date").value;
    country = encodeCity(country);
    const countdown = Math.ceil(tripCountdown(travelDate));
    results.countdown = countdown;
    tripLength(travelDate, returnDate);
    await getCountryInfo(country);
    await getWeatherForecast(coordinates.lat, coordinates.lng);
    await getImage(country);
    showData();
  });
};

