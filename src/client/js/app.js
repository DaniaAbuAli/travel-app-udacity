// variables
const results = {};
const coordinates = {};
//methods
function encodeCity(country) {
  return encodeURIComponent(country);
}
function tripCountdown(travelDate) {
  const currentDate = new Date();
  const travel = new Date(travelDate);
  return (travel - currentDate) / (1000 * 60 * 60 * 24);
}
async function getCountryInfo(country) {
  try {
    const response = await fetch(
      `http://api.geonames.org/searchJSON?q=${country}&maxRows=1&username=dania_abuali`
    );
    const result = await response.json();
    const lat = result.geonames[0].lat;
    const lng = result.geonames[0].lng;
    coordinates.lat = lat;
    coordinates.lng = lng;
  } catch (error) {
    console.log(error);
  }
}
async function getWeatherForecast(lat, lng) {
  const key = "b58ff6089c1b4ac28e4d5c2960de8ee7";
  if (results.countdown <= 7) {
    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${key}&include=minutely`
      );
      const result = await response.json();
      const currentTemp = result.data[0].app_temp;
      results.temp = currentTemp;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${key}`
      );
      const result = await response.json();
      console.log(result);
      results.temp = result.data[0].app_max_temp;
    } catch (error) {
      console.log(error);
    }
  }
}
async function getImage(country) {
  const key = "48568822-3d0eb5935c0592a549fc92d12";
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${key}&q=${country}&image_type=photo&min_width=800&min_height=800`
    );
    const result = await response.json();
    results.image = result.hits[0].previewURL;
  } catch (error) {
    console.log(error);
  }
}
function tripLength(travelDate, returnDate) {
  const date1 = new Date(travelDate);
  const date2 = new Date(returnDate);
  results.length = (date2 - date1) / (1000 * 60 * 60 * 24);
}
function showData() {
  const image = document.querySelector(".outputs img");
  const length = document.querySelector(".outputs .length");
  const countdown = document.querySelector(".outputs .countdown");
  const weather = document.querySelector(".outputs .weather");
  image.src = results.image;
  length.innerHTML = `Trip Length : ${results.length} days`;
  countdown.innerHTML = `Trip Countdown : ${results.countdown} days`;
  weather.innerHTML = `Weather forecast : ${results.temp}  °C`;
}
// export { encodeCity };
export { encodeCity, tripCountdown, tripLength, getCountryInfo, getWeatherForecast, getImage, showData,results,coordinates };