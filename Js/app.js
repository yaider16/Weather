
const API_KEY = '7a17c632d68edec938220bc3fda64011';

let log = function (position) {
	const {latitude, longitude} = position.coords
	fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
		.then(response => response.json())
		.then(data => setWeatherData(data))
};

const setWeatherData = data => {
	console.log(data);
	const weatherData = {
		location: data.name,
		description: data.weather[0].main,
		humidity: data.main.humidity,
		pressure: data.main.pressure,
		temperature: data.main.temp,
		date: date(),
	}

	Object.keys(weatherData).forEach(key => {
		if (document.getElementById(key).textContent == 'Cº') {
			document.getElementById(key).textContent = weatherData[key],'Cº';	
		}else{
			document.getElementById(key).textContent = weatherData[key];	
		}
	});

	limpiar()
};

const limpiar = () =>{
	const modal = document.getElementById('modal');
	const loader = document.getElementById('loader');
	loader.style.display = 'none';
	modal.style.display = 'inherit'

}

const date = () =>{
	let date = new Date();
	return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

const onLoad = function(){
	navigator.geolocation.getCurrentPosition(log);
};