// ********* VARIABLES *********
const preloader = document.querySelector('.preloader');
const cities = document.querySelectorAll('.cities__city');
const input = document.querySelector('.panel__search');
const searchBtn = document.querySelector('.panel__submit');
const wrapper = document.querySelector('.wrapper');

const temp = document.querySelector('.weather-app__temp'),
	location = document.querySelector('.weather-app__name'),
	condition = document.querySelector('.weather__condition'),
	time = document.querySelector('.weather-app__time'),
	date = document.querySelector('.weather-app__date'),
	icon = document.querySelector('.weather__icon');

const cloudy = document.querySelector('.details__cloud'),
	humidity = document.querySelector('.details__humidity'),
	wind = document.querySelector('.details__wind');


// Editable value
let cityInput = `Kiev`;

// ********* FUNCTIONS *********
// It loads app
const loadApp = async () => {
	try {
		const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0625d3d688f646f5841162138221105&q=${cityInput}&days=1&aqi=no&alerts=no`);
		const data = await response.json();
		forecast(data);
	} catch (error) {
		alert(`Can't find appropriate city, try again!`)
		wrapper.style.opacity = 1;
	}
}

// Search city
const searchCity = () => {
	cities.forEach((city) => {
		city.addEventListener('click', (item) => {
			cityInput = item.currentTarget.innerHTML;
			loadApp();
			wrapper.style.opacity = 0;
		})
	})
}

// Preloader func
const loadPreloader = () => {
	preloader.classList.add('hide-preloader');
}

// Back to default
const setBackToDefault = () => {
	input.value = "";
}

// Search func
const getCurrentCity = (e) => {
	e.preventDefault();
	const element = e.currentTarget.previousElementSibling;
	const desiredCity = element.value;
	cityInput = desiredCity;
	loadApp();
	setBackToDefault();
}

// Day of the week
const dayOfTheWeek = (month, day, year) => {
	const weekday = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];

	return weekday[new Date(`${month}/${day}/${year}`).getDay()];
}

// Show forecast
const forecast = (data) => {
	// weather forecast
	temp.innerHTML = `${data.current.temp_c}&#176`;
	location.innerHTML = data.location.name;
	condition.innerHTML = data.current.condition.text;

	// panel
	cloudy.innerHTML = `${data.current.cloud}%`;
	humidity.innerHTML = `${data.current.humidity}%`;
	wind.innerHTML = `${data.current.wind_kph} km/h`;

	// date
	const currentDate = data.location.localtime,
		y = parseInt(currentDate.substr(0, 4)),
		m = parseInt(currentDate.substr(5, 2)),
		d = parseInt(currentDate.substr(8, 2)),
		currentTime = currentDate.substr(11);

	date.innerHTML = `${dayOfTheWeek(m, d, y)} ${d}, ${m} ${y}`;
	time.innerHTML = currentTime;

	// icons
	const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
	icon.src = `img/icons/${iconId}`;

	// background
	const code = data.current.condition.code;

	let timeOfDay = 'day';

	if (!data.current.is_day) {
		timeOfDay = 'night';
	}

	// Clear weather
	if (code === 1000) {
		wrapper.style.backgroundImage = `url(./img/${timeOfDay}/clear.jpg)`;

		searchBtn.style.background = "#e5ba92";
		if (timeOfDay === 'night') {
			searchBtn.style.background = "#1E2950";
		}
	}

	// Cloudy weather
	else if (
		code === 1003 ||
		code === 1006 ||
		code === 1009 ||
		code === 1030 ||
		code === 1069 ||
		code === 1087 ||
		code === 1135 ||
		code === 1273 ||
		code === 1276 ||
		code === 1279 ||
		code === 1282
	) {
		wrapper.style.backgroundImage = `url(./img/${timeOfDay}/cloudy.jpg)`;
		searchBtn.style.background = "#fa6d1b";
		if (timeOfDay === 'night') {
			searchBtn.style.background = "#181e27";
		}
	}

	// Rainy weather
	else if (
		code === 1063 ||
		code === 1069 ||
		code === 1072 ||
		code === 1150 ||
		code === 1153 ||
		code === 1180 ||
		code === 1183 ||
		code === 1186 ||
		code === 1189 ||
		code === 1192 ||
		code === 1195 ||
		code === 1204 ||
		code === 1207 ||
		code === 1240 ||
		code === 1243 ||
		code === 1246 ||
		code === 1249 ||
		code === 1252
	) {
		wrapper.style.backgroundImage = `url(./img/${timeOfDay}/rainy.jpg)`;
		searchBtn.style.background = "#647d75";
		if (timeOfDay === 'night') {
			searchBtn.style.background = "#325c80";
		}
	}

	// Snow
	else {
		wrapper.style.backgroundImage = `url(./img/${timeOfDay}/snowy.jpg)`;
		searchBtn.style.background = "#4d72aa";
		if (timeOfDay === 'night') {
			searchBtn.style.background = "#1b1b1b";
		}
	}

	wrapper.style.opacity = 1;
}

searchCity();
loadApp();

// ********* EVENT LISTENERS *********
window.addEventListener('load', loadPreloader);
searchBtn.addEventListener('click', getCurrentCity);