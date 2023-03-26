async function loadWeather(location) {
  try {
    const base_url = 'http://api.weatherapi.com/v1/';
    const key = '8945a8b497d64cf682e122830232603';
    const days = '8';
    const mode = 'forecast';
    const req = `${base_url}${mode}.json?key=${key}&q=${location}&days=${days}`;
    const response = await fetch(req, {mode: 'cors'});
    const data = await response.json();
    return data;
  } catch(err) {
    return 'No data found';
  }
};

async function updateWeather(location) {
  const data = await loadWeather(location);
  document.getElementById('location').innerHTML = data.location.name;
  document.getElementById('today-icon').src = data.current.condition.icon;
  document.getElementById('today-descr').innerHTML = data.current.condition.text;
  document.getElementById('today-temp').innerHTML = `${data.current.temp_c} °C`;
  document.getElementById('today-precip').innerHTML = `${data.current.precip_mm} mm`;

  const forecast_container = document.getElementById('forecast-container');
  while (forecast_container.firstChild) {
    forecast_container.removeChild(forecast_container.firstChild);
  }
  for (day of data.forecast.forecastday) {
    const day_container = document.createElement('div');
    day_container.classList.add('day-container');
    const data_container = document.createElement('div');
    data_container.classList.add('data-container');

    const img = document.createElement('img');
    img.src = day.day.condition.icon;

    const date = document.createElement('span');
    date.innerHTML = day.date;
    date.classList.add('day');
    const descr = document.createElement('span');
    descr.innerHTML = day.day.condition.text;
    const temp = document.createElement('span');
    temp.innerHTML = `${day.day.avgtemp_c} °C`;
    const precip = document.createElement('span');
    precip.innerHTML = `${day.day.totalprecip_mm} mm`;

    data_container.appendChild(date);
    data_container.appendChild(descr);
    data_container.appendChild(temp);
    data_container.appendChild(precip);


    day_container.appendChild(img);
    day_container.appendChild(data_container);

    forecast_container.appendChild(day_container);
  }
  // dev:
  console.log(data);
}

updateWeather('berlin');

const locationDOM = document.getElementById('input-location');
locationDOM.addEventListener('change', () => {
  updateWeather(locationDOM.value);
});